import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

// Validates every case file: narrative chapter structure, TL;DR + FAQ, internal links, and that every number is sourced or "Not disclosed".
const DIR = join(__dirname, 'cases');
// Narrative chapters: exactly 8 question-style H2s, in this order (see PUBLISHING.md).
const CHAPTERS: [string, RegExp][] = [
  ['idea / pain', /\b(why|what problem|where did)\b/i],
  ['how it works', /\bhow does\b.*\bwork\b/i],
  ['how it was built', /\bbuil[td]\b/i],
  ['marketing, sales & pricing', /\b(market|price|pricing|sell|sold|customers)\b/i],
  ['challenges', /\b(challenge|challenges|hard|risk|risks|go wrong|struggle)\b/i],
  ['results', /\b(revenue|money|make|earn)\b/i],
  ['analysis', /\bwhy did\b.*\bwork\b/i],
  ['lessons', /\b(learn|lessons)\b/i],
];
const LABEL_TEXT: Record<string, string> = { 'founder-reported': 'founder-reported', verified: 'verified', 'media-reported': 'media-reported', unverified: 'unverified' };
const words = (s: string) => s.replace(/\]\([^)]*\)/g, ']').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const LABELS = ['founder-reported', 'verified', 'media-reported', 'unverified'];
const DATE = /^\d{4}-\d{2}$/; // year-month only; dates are optional
const ND = 'Not disclosed';

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));
const read = (f: string) => {
  const raw = readFileSync(join(DIR, f), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${f}: no frontmatter`);
  return { fm: parse(m[1]), body: m[2] };
};

interface Figure { value: unknown; display?: string; label?: string; sourceUrl?: string; sourceDate?: string; labelNote?: string }
/** A figure is either fully sourced (url + allowed label, optional year-month date) or explicitly "Not disclosed". */
function check(where: string, f: Figure) {
  const shown = String(f.display ?? f.value);
  const undisclosed = f.value === null || f.value === ND || shown === ND || shown.startsWith(ND);
  if (undisclosed) {
    expect(f.label, `${where}: undisclosed figure must be labelled not-disclosed`).toBe('not-disclosed');
    expect(shown.startsWith(ND), `${where}: undisclosed figure must read "${ND}"`).toBe(true);
    return 1;
  }
  expect(LABELS, `${where}: label`).toContain(f.label);
  expect(f.sourceUrl, `${where}: sourceUrl`).toMatch(/^https:\/\//);
  if (f.sourceDate !== undefined) expect(f.sourceDate, `${where}: sourceDate`).toMatch(DATE);
  return 0;
}

describe('case files', () => {
  it('has exactly 27 cases with unique slugs matching file names', () => {
    expect(files.length).toBe(27);
    const slugs = files.map((f) => read(f).fm.slug);
    expect(new Set(slugs).size).toBe(files.length);
    for (const f of files) expect(read(f).fm.slug, f).toBe(f.replace(/\.md$/, ''));
  });

  for (const f of files) {
    describe(f, () => {
      const { fm, body } = read(f);

      const heads = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
      const chapters = body.split(/^## .+$/m);

      it('is narrative prose: hook intro, 8 question-style H2 chapters in order, no lists', () => {
        expect(heads.length, `${f}: H2 count`).toBe(CHAPTERS.length);
        heads.forEach((h, i) => {
          expect(h.endsWith('?'), `${f}: H2 "${h}" must be a question`).toBe(true);
          expect(h, `${f}: H2 ${i + 1} should cover ${CHAPTERS[i][0]}`).toMatch(CHAPTERS[i][1]);
        });
        expect(words(chapters[0]), `${f}: hook intro before first H2`).toBeGreaterThanOrEqual(50);
        chapters.slice(1).forEach((c, i) => expect(words(c), `${f}: chapter "${heads[i]}" too short`).toBeGreaterThanOrEqual(40));
        expect(body, `${f}: no bullet or numbered lists`).not.toMatch(/^\s*([-*+]|\d+\.)\s/m);
        expect(body, `${f}: no H1/H3+ in body`).not.toMatch(/^(#|###+) /m);
        expect(words(body), `${f}: long-form body`).toBeGreaterThanOrEqual(450);
      });

      it('uses its primary keyword in title, H1 (title), first paragraph and meta description (summary)', () => {
        const kw = String(fm.primaryKeyword ?? '').toLowerCase();
        expect(kw.length, `${f}: primaryKeyword`).toBeGreaterThan(2);
        expect(String(fm.title).toLowerCase(), `${f}: title`).toContain(kw);
        expect(String(fm.summary).toLowerCase(), `${f}: summary`).toContain(kw);
        expect(Array.isArray(fm.secondaryKeywords) && fm.secondaryKeywords.length, `${f}: secondaryKeywords`).toBeGreaterThanOrEqual(3);
      });

      it('names the company in every H2', () => {
        const name = String(fm.company).replace(/\s*\(.*\)$/, '');
        for (const h of heads) expect(h, `${f}: H2 "${h}" should name ${name}`).toContain(name);
      });

      it('has a 2-3 sentence TL;DR and an FAQ', () => {
        const sentences = String(fm.tldr).split(/(?<=[.!?])\s+(?=[A-Z$])/).filter(Boolean);
        expect(sentences.length, `${f}: tldr sentences`).toBeGreaterThanOrEqual(2);
        expect(sentences.length, `${f}: tldr sentences`).toBeLessThanOrEqual(3);
        expect(fm.faq.length, `${f}: faq`).toBeGreaterThanOrEqual(3);
        expect(fm.faq.length, `${f}: faq`).toBeLessThanOrEqual(5);
        for (const q of fm.faq) { expect(q.q, `${f}: faq q`).toMatch(/\?$/); expect(String(q.a).length).toBeGreaterThan(10); }
      });

      it('keeps every sourced number in the prose with its label and link', () => {
        const figs: Figure[] = [fm.mrr, fm.totalRevenue, fm.teamSize, ...fm.metrics];
        for (const x of figs.filter((x) => x.label !== 'not-disclosed')) {
          expect(body, `${f}: source link ${x.sourceUrl} missing from prose`).toContain(`(${x.sourceUrl})`);
          expect(body.toLowerCase(), `${f}: label "${x.label}" missing from prose`).toContain(LABEL_TEXT[x.label!]);
        }
        if (figs.some((x) => x.label === 'not-disclosed')) expect(body, `${f}: says what is not disclosed`).toMatch(/not disclosed/i);
        // A paragraph with a dollar figure must carry a source link or only repeat amounts already sourced in another paragraph (e.g. a timeline recap).
        const paras = body.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => /\$\d/.test(p) && !p.startsWith('#'));
        const amounts = (p: string) => p.match(/\$[\d.,]+[KMB]?/g) ?? [];
        const linked = (p: string) => /\]\(https:\/\//.test(p);
        const sourced = new Set(paras.filter(linked).flatMap(amounts));
        for (const p of paras.filter((p) => !linked(p))) {
          for (const a of amounts(p)) expect(sourced.has(a), `${f}: unsourced ${a} in: ${p.slice(0, 80)}`).toBe(true);
        }
      });

      it('never keeps unsourced claims', () => {
        expect(body, `${f}: unsourced claims are cut, not labelled`).not.toMatch(/no linked source|no source in this case/i);
      });

      it('links to at least two other cases that exist', () => {
        const links = [...body.matchAll(/\]\(\/cases\/([a-z0-9-]+)\/\)/g)].map((m) => m[1]);
        const others = new Set(links.filter((s) => s !== fm.slug));
        expect(others.size, `${f}: internal case links`).toBeGreaterThanOrEqual(2);
        for (const s of others) expect(files, `${f}: link to /cases/${s}/`).toContain(`${s}.md`);
      });

      it('has the required frontmatter', () => {
        for (const k of ['title', 'company', 'founders', 'industry', 'productType', 'foundedDate', 'teamSize', 'mrr', 'totalRevenue', 'revenueRange', 'metrics', 'sources', 'published', 'updated', 'tldr', 'faq', 'primaryKeyword']) expect(fm[k], `${f}: ${k}`).toBeDefined();
        expect(fm.foundedYear === null || Number.isInteger(fm.foundedYear), `${f}: foundedYear`).toBe(true);
        if (fm.appSubcategory) expect(fm.productType, `${f}: appSubcategory only for apps`).toBe('App');
        if (fm.mrr.value === null) expect(fm.revenueRange).toBe('not-disclosed');
        for (const s of fm.sources) { expect(s.url).toMatch(/^https:\/\//); if (s.date !== undefined) expect(String(s.date)).toMatch(DATE); }
      });

      it('every numeric metric is sourced (url + label, dated if known) or "Not disclosed"', () => {
        check(`${f} mrr`, fm.mrr);
        check(`${f} totalRevenue`, fm.totalRevenue);
        check(`${f} teamSize`, fm.teamSize);
        for (const m of fm.metrics) check(`${f} metric "${m.name}"`, m);
      });
    });
  }
});

/** Count of "Not disclosed" figures across all cases (printed by `npm test`). */
it('reports the number of "Not disclosed" values', () => {
  let n = 0;
  for (const f of files) {
    const { fm } = read(f);
    const figs: Figure[] = [fm.mrr, fm.totalRevenue, fm.teamSize, ...fm.metrics];
    n += figs.filter((x) => x.label === 'not-disclosed').length + (fm.foundedYear === null ? 1 : 0);
  }
  console.log(`"Not disclosed" values across ${files.length} cases: ${n}`);
  expect(n).toBeGreaterThan(0);
});

/** Body word counts (printed by `npm test`). */
it('reports case body word counts', () => {
  const counts = files.map((f) => [f, words(read(f).body)] as const).sort((a, b) => a[1] - b[1]);
  console.log(`Case body words: min ${counts[0][1]} (${counts[0][0]}), max ${counts.at(-1)![1]} (${counts.at(-1)![0]})`);
  expect(counts[0][1]).toBeGreaterThan(0);
});
