import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

// Validates every "What is X?" explainer (see PUBLISHING.md 0.3): keyword placement, question chapters,
// a table, links into the case library, and a source link next to every price or dollar figure.
const DIR = join(__dirname, 'explainers');
const CASES = new Set(readdirSync(join(__dirname, 'cases')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));
const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));
const SLUGS = new Set(files.map((f) => f.replace(/\.md$/, '')));
const words = (s: string) => s.replace(/\]\([^)]*\)/g, ']').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const read = (f: string) => {
  const m = readFileSync(join(DIR, f), 'utf8').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${f}: no frontmatter`);
  return { fm: parse(m[1]), body: m[2] };
};

describe('explainer files', () => {
  it('has at least ten explainers with slugs matching file names', () => {
    expect(files.length).toBeGreaterThanOrEqual(10);
    for (const f of files) expect(read(f).fm.slug, f).toBe(f.replace(/\.md$/, ''));
  });

  for (const f of files) {
    describe(f, () => {
      const { fm, body } = read(f);
      const heads = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());

      it('puts the primary keyword in the title and summary', () => {
        const kw = String(fm.primaryKeyword).toLowerCase();
        expect(String(fm.title).toLowerCase(), `${f}: title`).toContain(kw);
        expect(String(fm.summary).toLowerCase(), `${f}: summary`).toContain(kw);
      });

      it('answers in 4-7 question chapters with a table and enough depth', () => {
        expect(heads.length, `${f}: H2 count`).toBeGreaterThanOrEqual(4);
        expect(heads.length, `${f}: H2 count`).toBeLessThanOrEqual(7);
        for (const h of heads) expect(h.endsWith('?'), `${f}: H2 "${h}" must be a question`).toBe(true);
        expect(heads[0], `${f}: first H2 answers "what is"`).toMatch(/^what (is|are)\b/i);
        expect(body, `${f}: needs a markdown table`).toMatch(/^\|.+\|\s*\n\|\s*:?-{3,}/m);
        expect(body, `${f}: no H1/H3+ in body`).not.toMatch(/^(#|###+) /m);
        expect(words(body), `${f}: body words`).toBeGreaterThanOrEqual(280);
      });

      it('links to related cases or explainers that exist', () => {
        const caseLinks = [...body.matchAll(/\]\(\/cases\/([a-z0-9-]+)\/\)/g)].map((m) => m[1]);
        const explainerLinks = [...body.matchAll(/\]\(\/what-is\/([a-z0-9-]+)\/\)/g)].map((m) => m[1]);
        expect(caseLinks.length + explainerLinks.length, `${f}: internal links`).toBeGreaterThanOrEqual(2);
        for (const s of caseLinks) expect(CASES.has(s), `${f}: /cases/${s}/`).toBe(true);
        for (const s of explainerLinks) expect(SLUGS.has(s), `${f}: /what-is/${s}/`).toBe(true);
        for (const s of fm.relatedCases ?? []) expect(CASES.has(s), `${f}: relatedCases ${s}`).toBe(true);
      });

      it('links the pricing source in the prose and sources every dollar figure', () => {
        expect(body, `${f}: pricing source ${fm.pricing.sourceUrl}`).toContain(`(${fm.pricing.sourceUrl})`);
        const paras = body.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => /\$\d/.test(p) && !p.startsWith('#'));
        for (const p of paras) expect(p, `${f}: dollar figure without a source link: ${p.slice(0, 80)}`).toMatch(/\]\(https:\/\//);
      });

      it('has a 2-3 sentence TL;DR', () => {
        const n = String(fm.tldr).split(/(?<=[.!?])\s+(?=[A-Z$])/).filter(Boolean).length;
        expect(n, `${f}: tldr sentences`).toBeGreaterThanOrEqual(2);
        expect(n, `${f}: tldr sentences`).toBeLessThanOrEqual(3);
      });
    });
  }
});
