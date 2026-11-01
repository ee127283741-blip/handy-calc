import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync } from 'node:fs';
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
    expect(slots(read('ai-costs'))).toBe(1);
    expect(slots(read('prompts'))).toBe(1);
    expect(slots(read('prompts/web-design'))).toBe(1);
    expect(slots(read('idea-to-prompt'))).toBe(1);
  });

  it('ON: prompt pages have 1–2 slots, all after the prompt and its copy button', () => {
    const pages = files(join(ON, 'prompts')).filter((f) => f.split('/').length - ON.split('/').length === 4 && f.endsWith('index.html'));
    expect(pages.length).toBeGreaterThanOrEqual(32);
    for (const f of pages) {
      const html = readFileSync(f, 'utf8');
      expect(slots(html), f).toBeGreaterThanOrEqual(1);
      expect(slots(html), f).toBeLessThanOrEqual(2);
      const copy = html.indexOf('data-copy="prompt-text"');
      const pre = html.indexOf('</pre>');
      expect(copy, f).toBeGreaterThan(0);
      expect(html.indexOf('<aside class="ad-slot'), f).toBeGreaterThan(Math.max(copy, pre));
    }
  });

  const guides = (dir: string) => readdirSync(join(dir, 'guides')).map((s) => readFileSync(join(dir, 'guides', s, 'index.html'), 'utf8'));

  it('ON: guides have a slot right after the 2nd paragraph, at most 4 slots', () => {
    const pages = guides(ON);
    expect(pages.length).toBeGreaterThanOrEqual(1);
    for (const html of pages) {
      const body = html.slice(html.indexOf('<h1'));
      const p2 = body.indexOf('</p>', body.indexOf('</p>') + 4) + 4;
      expect(body.slice(p2).trimStart().startsWith('<aside class="ad-slot')).toBe(true);
      expect(slots(html)).toBeLessThanOrEqual(4);
    }
  });

  it('OFF: guides have no ad markup', () => {
    const pages = guides(OFF);
    expect(pages.length).toBeGreaterThanOrEqual(1);
    for (const html of pages) expect(html).not.toMatch(/class="ad-slot|adsbygoogle/);
  });
});

describe('site build (ads off)', () => {
  const read = (p: string) => readFileSync(join(OFF, p), 'utf8');
  const guideUrls = () => readdirSync(join(OFF, 'guides')).map((s) => `/guides/${s}/`);
  const urlsOf = (marker: string) => files(OFF)
    .filter((f) => f.endsWith('index.html') && read(f.slice(OFF.length + 1)).includes(marker))
    .map((f) => f.slice(OFF.length).replace(/index\.html$/, ''));
  const PROMPT_CATS = ['web-design', 'visual-effects', 'interaction', 'motion', 'video-editing', 'camera-moves', 'image-generation', 'writing', 'industry'];
  const HUBS = ['ai-costs', 'ai-business', 'ai-productivity', 'prompting', 'ai-tools', 'ai-privacy', 'prompts', ...PROMPT_CATS.map((c) => `prompts/${c}`)];

  it('search index lists the tool, every guide and every prompt', () => {
    const index: { url: string; type: string; title: string; category: string; description: string }[] = JSON.parse(read('search-index.json'));
    const tools = urlsOf('"WebApplication"');
    expect(tools).toEqual(['/idea-to-prompt/']);
    for (const u of tools) expect(index.find((e) => e.url === u)?.type, u).toBe('tool');
    const prompts = urlsOf('"CreativeWork"');
    expect(prompts.length).toBeGreaterThanOrEqual(32);
    for (const u of prompts) expect(index.find((e) => e.url === u)?.type, u).toBe('prompt');
    for (const u of guideUrls()) expect(index.find((e) => e.url === u)?.type, u).toBe('guide');
    for (const e of index) expect(e.title && e.category && e.description).toBeTruthy();
  });

  it('rss.xml is RSS 2.0 with every guide and prompt', () => {
    const xml = read('rss.xml');
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toMatch(/<rss version="2.0"[\s\S]*<channel>[\s\S]*<\/channel>\s*<\/rss>/);
    for (const u of [...guideUrls(), ...urlsOf('"CreativeWork"')]) expect(xml).toContain(`${u}</link>`);
    expect(read('index.html')).toContain('type="application/rss+xml"');
  });

  it('sitemap has lastmod for every url', () => {
    const xml = read('sitemap-0.xml');
    const urls = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    expect(urls.length).toBeGreaterThan(10);
    for (const u of urls) expect(u, u).toMatch(/<lastmod>\d{4}-\d\d-\d\dT/);
    expect(xml).toMatch(/prompts\/motion\/logo-reveal-animation\/<\/loc><lastmod>2026-10-21T/);
  });

  it('every prompt category has at least 3 prompts', () => {
    for (const c of PROMPT_CATS) expect(readdirSync(join(OFF, 'prompts', c)).filter((s) => !s.endsWith('.html')).length, c).toBeGreaterThanOrEqual(3);
  });

  it('prompt pages have CreativeWork + BreadcrumbList JSON-LD, a highlighted prompt and a variables table', () => {
    for (const u of urlsOf('"CreativeWork"')) {
      const html = read(`${u.slice(1)}index.html`);
      expect(html, u).toContain('"@type":"BreadcrumbList"');
      expect(html, u).toMatch(/<pre id="prompt-text"[^>]*>[\s\S]*<mark>\{\{[a-z0-9_]+\}\}<\/mark>/);
      expect(html, u).toContain('<th scope="col">Variable</th>');
    }
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

  it('hub pages have CollectionPage + ItemList + BreadcrumbList JSON-LD and no "Coming soon"', () => {
    for (const h of HUBS) {
      const html = read(`${h}/index.html`);
      expect(html, h).toContain('"@type":"CollectionPage"');
      expect(html, h).toContain('"@type":"ItemList"');
      expect(html, h).toContain('"@type":"BreadcrumbList"');
      expect(html, h).not.toMatch(/coming soon/i);
    }
  });
});
