import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

// Builds the site twice (ads off / on) into throwaway dirs; dist/ is never touched.
function build(outDir: string, env: Record<string, string>) {
  rmSync(outDir, { recursive: true, force: true });
  execFileSync('npx', ['astro', 'build', '--outDir', outDir], {
    stdio: 'pipe',
    env: { ...process.env, NODE_ENV: 'production', PUBLIC_ADS_ENABLED: 'false', PUBLIC_ADSENSE_CLIENT: '', ...env },
  });
}
function files(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => join(e.parentPath, e.name));
}
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;
const slots = (html: string) => count(html, /<aside class="ad-slot/g);
const script = (html: string) => count(html, /pagead\/js\/adsbygoogle\.js/g);

const OFF = 'dist-test-off';
const ON = 'dist-test-on';

beforeAll(() => {
  build(OFF, {});
  build(ON, { PUBLIC_ADS_ENABLED: 'true', PUBLIC_ADSENSE_CLIENT: 'ca-pub-0000000000000000' });
}, 600_000);

describe('ads build', () => {
  it('OFF: no ad code anywhere', () => {
    const hits = files(OFF).filter((f) => /adsbygoogle|pagead2/.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  it('ON: script once per page with slots, at most 4 slots per page', () => {
    const pages = files(ON).filter((f) => f.endsWith('.html'));
    expect(pages.length).toBeGreaterThan(0);
    for (const f of pages) {
      const html = readFileSync(f, 'utf8');
      expect(slots(html), f).toBeLessThanOrEqual(4);
      if (slots(html) > 0) expect(script(html), f).toBe(1);
    }
  });

  it('ON: slot counts per page type', () => {
    const read = (p: string) => readFileSync(join(ON, p, 'index.html'), 'utf8');
    expect(slots(read('.'))).toBe(1);
  });
});

describe('site build (ads off)', () => {
  const read = (p: string) => readFileSync(join(OFF, p), 'utf8');
  const caseUrls = () => readdirSync(join(OFF, 'cases'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).map((s) => `/cases/${s}/`);

  it('uses the AI Founder Atlas name and URL in meta, structured data, RSS and llms.txt', () => {
    const home = read('index.html');
    expect(home).toContain('<link rel="canonical" href="https://ai-founder-atlas.pages.dev/"');
    expect(home).toMatch(/"@type":"WebSite","name":"AI Founder Atlas"/);
    expect(home).toMatch(/"@type":"Organization","name":"AI Founder Atlas"/);
    expect(read('rss.xml')).toContain('<title>AI Founder Atlas: AI startup case library</title>');
    expect(read('llms.txt').startsWith('# AI Founder Atlas')).toBe(true);
    expect(read('sitemap-0.xml')).toContain('<loc>https://ai-founder-atlas.pages.dev/</loc>');
    for (const f of files(OFF).filter((f) => /\.(html|xml|txt|json)$/.test(f))) expect(readFileSync(f, 'utf8'), f).not.toMatch(/ProofedPrompts|handy-calc|PLACEHOLDER/);
  });

  it('case pages have TL;DR, byline, FAQ and Article + FAQPage JSON-LD', () => {
    for (const u of caseUrls()) {
      const html = read(join(u, 'index.html'));
      expect(html, u).toContain('class="tldr"');
      expect(html, u).toContain('rel="author"');
      expect(html, u).toContain('id="faq"');
      expect(html, u).toContain('"@type":"Article"');
      expect(html, u).toContain('"@type":"FAQPage"');
      expect(html, u).toContain('id="data-summary"');
    }
  });

  it('case pages carry the primary keyword, article OG tags, a 1200x630 OG image and dated Article JSON-LD', () => {
    const DIR = join(__dirname, 'content', 'cases');
    for (const u of caseUrls()) {
      const slug = u.split('/')[2];
      const kw = readFileSync(join(DIR, `${slug}.md`), 'utf8').match(/^primaryKeyword: "(.+)"$/m)![1].toLowerCase();
      const html = read(join(u, 'index.html'));
      const tag = (re: RegExp) => (html.match(re)?.[1] ?? '').replace(/&#39;/g, "'").replace(/&amp;/g, '&').toLowerCase();
      expect(tag(/<title>([^<]*)<\/title>/), `${u} title`).toContain(kw);
      expect(tag(/<h1>([^<]*)<\/h1>/), `${u} h1`).toContain(kw);
      expect(tag(/<p class="answer">([^<]*)<\/p>/), `${u} first paragraph`).toContain(kw);
      expect(tag(/<meta name="description" content="([^"]*)"/), `${u} meta description`).toContain(kw);
      expect(tag(/<meta property="og:image:alt" content="([^"]*)"/), `${u} og:image:alt`).toContain(kw);
      expect(html, u).toContain('<meta property="og:type" content="article"');
      expect(html, u).toContain('<meta name="twitter:card" content="summary_large_image"');
      expect(html, u).toContain(`<meta property="og:image" content="https://ai-founder-atlas.pages.dev/og/${slug}.png"`);
      const png = readFileSync(join(OFF, 'og', `${slug}.png`));
      expect(png.subarray(1, 4).toString(), `${slug}.png`).toBe('PNG');
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], `${slug}.png size`).toEqual([1200, 630]);
      const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
      const article = ld.find((x) => x['@type'] === 'Article');
      expect(article.datePublished, u).toMatch(/^\d{4}-\d\d-\d\d$/);
      expect(article.dateModified, u).toMatch(/^\d{4}-\d\d-\d\d$/);
      expect(article.image.url, u).toContain(`/og/${slug}.png`);
      expect(article.author.name, u).toBe('Editorial team');
      const faq = ld.find((x) => x['@type'] === 'FAQPage');
      expect(faq.mainEntity.length, u).toBeGreaterThanOrEqual(3);
      expect(faq.mainEntity.length, u).toBeLessThanOrEqual(5);
    }
  });

  it('sitemap lastmod for each case equals its updated date', () => {
    const xml = read('sitemap-0.xml');
    const DIR = join(__dirname, 'content', 'cases');
    for (const u of caseUrls()) {
      const updated = readFileSync(join(DIR, `${u.split('/')[2]}.md`), 'utf8').match(/^updated: (.+)$/m)![1].trim();
      expect(xml, u).toContain(`<loc>https://ai-founder-atlas.pages.dev${u}</loc><lastmod>${updated}T`);
    }
  });

  it('search index lists every case', () => {
    const index: { url: string; type: string; title: string; category: string; description: string }[] = JSON.parse(read('search-index.json'));
    expect(index.map((e) => e.url).filter((u) => u.startsWith('/cases/')).sort()).toEqual(caseUrls().sort());
    for (const e of index) expect(e.title && e.type && e.category && e.description).toBeTruthy();
  });

  it('rss.xml is RSS 2.0 with every case', () => {
    const xml = read('rss.xml');
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toMatch(/<rss version="2.0"[\s\S]*<channel>[\s\S]*<\/channel>\s*<\/rss>/);
    for (const u of caseUrls()) expect(xml).toContain(`${u}</link>`);
    expect(read('index.html')).toContain('type="application/rss+xml"');
  });

  it('sitemap has lastmod for every url and no removed sections', () => {
    const xml = read('sitemap-0.xml');
    const urls = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    expect(urls.length).toBeGreaterThan(10);
    for (const u of urls) expect(u, u).toMatch(/<lastmod>\d{4}-\d\d-\d\dT/);
    expect(xml).not.toMatch(/\/(prompts|guides|calculators|idea-to-prompt|prompting|ai-[a-z]+)\//);
  });

  it('removed pages are gone and every old URL has a 301', () => {
    const rules = read('_redirects').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.trim().split(/\s+/));
    const from = new Set(rules.map((r) => r[0]));
    for (const u of ['/prompts/', '/prompts/web-design/', '/guides/how-many-words-is-a-token/', '/idea-to-prompt/', '/calculators/', '/ai-costs/', '/prompting/', '/prompt-proofs/web-design/brand-identity-starter-kit.webp']) {
      expect(from.has(u), u).toBe(true);
    }
    for (const [src, dst, code] of rules) {
      expect(code, src).toBe('301');
      expect(from.has(dst), `chain ${src} -> ${dst}`).toBe(false);
      const target = join(OFF, dst.slice(1));
      expect(dst === '/' || (/\.[a-z]+$/.test(dst) ? existsSync(target) : readdirSync(target).includes('index.html')), `${src} -> ${dst}`).toBe(true);
    }
    for (const d of ['prompts', 'guides', 'idea-to-prompt', 'calculators', 'prompt-proofs', 'ai-costs']) expect(() => readdirSync(join(OFF, d)), d).toThrow();
  });

  it('every internal link points to a built page, file or redirect', () => {
    const redirects = new Set(read('_redirects').split('\n').map((l) => l.trim().split(/\s+/)[0]).filter(Boolean));
    const exists = (path: string) => {
      const clean = decodeURI(path.split(/[?#]/)[0]);
      if (redirects.has(clean)) return true;
      const f = join(OFF, clean);
      return [f, join(f, 'index.html')].some((p) => { try { return readFileSync(p).length >= 0; } catch { return false; } });
    };
    const broken: string[] = [];
    for (const f of files(OFF).filter((f) => f.endsWith('.html'))) {
      for (const m of readFileSync(f, 'utf8').matchAll(/href="(\/[^"]*)"/g)) if (!exists(m[1])) broken.push(`${f} -> ${m[1]}`);
    }
    expect(broken).toEqual([]);
  });

  it('no internal links to removed pages', () => {
    const bad: string[] = [];
    for (const f of files(OFF).filter((f) => f.endsWith('.html') || f.endsWith('.txt') || f.endsWith('.xml') || f.endsWith('.json'))) {
      if (f.endsWith('_redirects')) continue;
      for (const m of readFileSync(f, 'utf8').matchAll(/(?:href="|https?:\/\/[^/"\s)]+)(\/(?:prompts|guides|calculators|idea-to-prompt|prompt-proofs|prompting|ai-costs|ai-business|ai-productivity|ai-tools|ai-privacy)\/[^"\s)]*)/g)) bad.push(`${f} -> ${m[1]}`);
    }
    expect(bad).toEqual([]);
  });
});
