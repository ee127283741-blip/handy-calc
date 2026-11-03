import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

// Validates every case file: narrative chapter structure, TL;DR + FAQ, internal links, and that every number is sourced or "Not disclosed".
const DIR = join(__dirname, 'cases');
// Chapter rules (see PUBLISHING.md 0.1): 5-7 question H2s with varied wording; a revenue chapter, a comparison
// chapter and a final takeaways chapter are required, the rest is free.
const REVENUE_H2 = /\b(revenue|money|make|makes|earn|mrr|arr)\b/i;
const COMPARE_H2 = /\b(compare|compares|comparison|vs|versus|differ|different|difference|stack up|alternatives?)\b/i;
const TAKEAWAY_H2 = /\b(learn|lessons|takeaways)\b/i;
// A normalised H2 (company name replaced) may be reused by at most this many cases, so pages do not read like one template.
const MAX_SHARED_H2 = 3;
const LABEL_TEXT: Record<string, string> = { 'founder-reported': 'founder-reported', verified: 'verified', 'media-reported': 'media-reported', unverified: 'unverified', 'third-party-estimate': 'third-party estimate', calc: 'calc' };
const words = (s: string) => s.replace(/\]\([^)]*\)/g, ']').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const LABELS = ['founder-reported', 'verified', 'media-reported', 'unverified', 'third-party-estimate', 'calc'];
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
  it('has exactly 54 cases with unique slugs matching file names', () => {
    expect(files.length).toBe(54);
    const slugs = files.map((f) => read(f).fm.slug);
    expect(new Set(slugs).size).toBe(files.length);
    for (const f of files) expect(read(f).fm.slug, f).toBe(f.replace(/\.md$/, ''));
  });

  for (const f of files) {
    describe(f, () => {
      const { fm, body } = read(f);

      const heads = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
      const chapters = body.split(/^## .+$/m);

      it('has a hook intro and 5-7 question H2 chapters, each long enough', () => {
        expect(heads.length, `${f}: H2 count`).toBeGreaterThanOrEqual(5);
        expect(heads.length, `${f}: H2 count`).toBeLessThanOrEqual(7);
        for (const h of heads) expect(h.endsWith('?'), `${f}: H2 "${h}" must be a question`).toBe(true);
        expect(words(chapters[0]), `${f}: hook intro before first H2`).toBeGreaterThanOrEqual(50);
        chapters.slice(1).forEach((c, i) => expect(words(c), `${f}: chapter "${heads[i]}" too short`).toBeGreaterThanOrEqual(40));
        expect(body, `${f}: no H1/H3+ in body`).not.toMatch(/^(#|###+) /m);
        expect(words(body), `${f}: long-form body`).toBeGreaterThanOrEqual(450);
      });

      it('has a revenue chapter, a comparison chapter with 2+ case links, and ends with a takeaways list', () => {
        expect(heads.some((h) => REVENUE_H2.test(h)), `${f}: needs a revenue H2`).toBe(true);
        const ci = heads.findIndex((h) => COMPARE_H2.test(h));
        expect(ci, `${f}: needs a comparison H2`).toBeGreaterThanOrEqual(0);
        const compareLinks = new Set([...chapters[ci + 1].matchAll(/\]\(\/cases\/([a-z0-9-]+)\/\)/g)].map((m) => m[1]));
        expect(compareLinks.size, `${f}: comparison chapter should link 2+ cases`).toBeGreaterThanOrEqual(2);
        expect(heads.at(-1), `${f}: last H2 is the takeaways`).toMatch(TAKEAWAY_H2);
        const items = chapters.at(-1)!.match(/^- \S/gm) ?? [];
        expect(items.length, `${f}: takeaways list items`).toBeGreaterThanOrEqual(3);
        expect(items.length, `${f}: takeaways list items`).toBeLessThanOrEqual(5);
      });

      it('has at least one table and one sourced founder quote', () => {
        expect(body, `${f}: needs a markdown table (timeline, pricing or stack)`).toMatch(/^\|.+\|\s*\n\|\s*:?-{3,}/m);
        const quotes = body.split('\n').filter((l) => /^> /.test(l));
        expect(quotes.length, `${f}: needs 1-2 pull quotes`).toBeGreaterThanOrEqual(1);
        expect(quotes.length, `${f}: needs 1-2 pull quotes`).toBeLessThanOrEqual(2);
        for (const q of quotes) {
          const m = q.match(/^> "([^"]+)"/);
          expect(m, `${f}: quote must start with "…": ${q.slice(0, 60)}`).not.toBeNull();
          expect(m![1].split(/\s+/).length, `${f}: quote too long`).toBeLessThanOrEqual(30);
          expect(q, `${f}: quote needs a source link`).toMatch(/\]\(https:\/\//);
        }
      });

      it('uses its primary keyword in title, H1 (title), first paragraph and meta description (summary)', () => {
        const kw = String(fm.primaryKeyword ?? '').toLowerCase();
        expect(kw.length, `${f}: primaryKeyword`).toBeGreaterThan(2);
        expect(String(fm.title).toLowerCase(), `${f}: title`).toContain(kw);
        expect(String(fm.summary).toLowerCase(), `${f}: summary`).toContain(kw);
        expect(Array.isArray(fm.secondaryKeywords) && fm.secondaryKeywords.length, `${f}: secondaryKeywords`).toBeGreaterThanOrEqual(3);
      });

      it('names the company in at least three H2s', () => {
        const name = String(fm.company).replace(/\s*\(.*\)$/, '');
        expect(heads.filter((h) => h.includes(name)).length, `${f}: H2s naming ${name}`).toBeGreaterThanOrEqual(3);
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
        const figs: Figure[] = [fm.mrr, fm.totalRevenue, fm.teamSize, fm.pricing, ...fm.metrics];
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
        for (const k of ['title', 'company', 'founders', 'industry', 'productType', 'foundedDate', 'teamSize', 'pricing', 'mrr', 'totalRevenue', 'revenueRange', 'metrics', 'sources', 'published', 'updated', 'tldr', 'faq', 'primaryKeyword']) expect(fm[k], `${f}: ${k}`).toBeDefined();
        expect(fm.foundedYear === null || Number.isInteger(fm.foundedYear), `${f}: foundedYear`).toBe(true);
        if (fm.appSubcategory) expect(fm.productType, `${f}: appSubcategory only for apps`).toBe('App');
        if (fm.mrr.value === null) expect(fm.revenueRange).toBe('not-disclosed');
        for (const s of fm.sources) { expect(s.url).toMatch(/^https:\/\//); if (s.date !== undefined) expect(String(s.date)).toMatch(DATE); }
      });

      it('every numeric metric is sourced (url + label, dated if known) or "Not disclosed"', () => {
        check(`${f} mrr`, fm.mrr);
        check(`${f} totalRevenue`, fm.totalRevenue);
        check(`${f} teamSize`, fm.teamSize);
        check(`${f} pricing`, fm.pricing);
        for (const m of fm.metrics) check(`${f} metric "${m.name}"`, m);
      });
    });
  }
});

it(`reuses no H2 wording in more than ${MAX_SHARED_H2} cases`, () => {
  const seen = new Map<string, string[]>();
  for (const f of files) {
    const { fm, body } = read(f);
    const name = String(fm.company).replace(/\s*\(.*\)$/, '');
    for (const m of body.matchAll(/^## (.+)$/gm)) {
      const key = m[1].split(name).join('X').split(fm.founders[0]).join('F').toLowerCase();
      seen.set(key, [...(seen.get(key) ?? []), f]);
    }
  }
  for (const [h, fs] of seen) expect(fs.length, `H2 "${h}" reused in ${fs.join(', ')}`).toBeLessThanOrEqual(MAX_SHARED_H2);
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
