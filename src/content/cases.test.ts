import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

// Validates every case file: required sections, and that every number is sourced or "Not disclosed".
const DIR = join(__dirname, 'cases');
const SECTIONS = [
  'Origin of the idea', 'How they started', 'Tools & tech stack', 'Marketing', 'Sales & pricing',
  'Monthly revenue', 'Total revenue', 'Founding date & timeline', 'Team size', 'Key takeaways',
];
const LABELS = ['founder-reported', 'verified', 'media-reported'];
const DATE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const ND = 'Not disclosed';

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));
const read = (f: string) => {
  const raw = readFileSync(join(DIR, f), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${f}: no frontmatter`);
  return { fm: parse(m[1]), body: m[2] };
};

interface Figure { value: unknown; display?: string; label?: string; sourceUrl?: string; sourceDate?: string }
/** A figure is either fully sourced (url + date + allowed label) or explicitly "Not disclosed". */
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
  expect(f.sourceDate, `${where}: sourceDate`).toMatch(DATE);
  return 0;
}

describe('case files', () => {
  it('has exactly 20 cases with unique slugs matching file names', () => {
    expect(files.length).toBe(20);
    const slugs = files.map((f) => read(f).fm.slug);
    expect(new Set(slugs).size).toBe(files.length);
    for (const f of files) expect(read(f).fm.slug, f).toBe(f.replace(/\.md$/, ''));
  });

  for (const f of files) {
    describe(f, () => {
      const { fm, body } = read(f);

      it('has every required section, in order', () => {
        const heads = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
        expect(heads).toEqual(SECTIONS);
        for (const s of SECTIONS) {
          const text = body.split(`## ${s}`)[1].split(/^## /m)[0].trim();
          expect(text.length, `${f}: "${s}" is empty`).toBeGreaterThan(10);
        }
      });

      it('has the required frontmatter', () => {
        for (const k of ['title', 'company', 'founders', 'industry', 'productType', 'foundedDate', 'teamSize', 'mrr', 'totalRevenue', 'revenueRange', 'metrics', 'sources', 'updated']) expect(fm[k], `${f}: ${k}`).toBeDefined();
        expect(fm.foundedYear === null || Number.isInteger(fm.foundedYear), `${f}: foundedYear`).toBe(true);
        if (fm.appSubcategory) expect(fm.productType, `${f}: appSubcategory only for apps`).toBe('App');
        if (fm.mrr.value === null) expect(fm.revenueRange).toBe('not-disclosed');
        for (const s of fm.sources) { expect(s.url).toMatch(/^https:\/\//); expect(String(s.date)).toMatch(DATE); }
      });

      it('every numeric metric is sourced (url + date + label) or "Not disclosed"', () => {
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
