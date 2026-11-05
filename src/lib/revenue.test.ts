import { describe, expect, it } from 'vitest';
import { hasFigure, hubFaq, otherCurrency, rankedUsd, rankingFaq, type CaseFacts } from './revenue';

const c = (company: string, value: number | null, display: string, label = 'founder-reported', sourceUrl: string | undefined = 'https://example.com/s'): CaseFacts => ({
  company, slug: company.toLowerCase(), mrr: { value, display, label, sourceUrl, sourceDate: '2026-01' }, pricing: { display: 'Not disclosed', label: 'not-disclosed' },
});
const big = c('Big', 8000000, 'About $8M a month (calc: $96M ARR / 12)', 'calc');
const small = c('Small', 5000, '$5K MRR');
const euro = c('Euro', 9000000, 'About €9M a month (calc: €108M ARR / 12)', 'calc');
const none = c('None', null, 'Not disclosed', 'not-disclosed', undefined);

describe('revenue helpers', () => {
  it('requires a number, a label and a source link', () => {
    expect([big, none, c('Unsourced', 100, '$100', 'founder-reported', '')].map(hasFigure)).toEqual([true, false, false]);
  });
  it('sorts USD by monthly value and keeps other currencies out of the order', () => {
    expect(rankedUsd([small, euro, none, big]).map((x) => x.company)).toEqual(['Big', 'Small']);
    expect(otherCurrency([small, euro, none, big]).map((x) => x.company)).toEqual(['Euro']);
  });
  it('hub FAQ quotes frontmatter display text and label', () => {
    const faq = hubFaq('AI test', 'Site', 'Subscriptions.', [small, big, none]);
    expect(faq.length).toBeGreaterThanOrEqual(3);
    expect(faq.length).toBeLessThanOrEqual(5);
    expect(faq[0].a).toContain('3 case studies. 2 have');
    expect(faq[1].a).toContain('Big: About $8M a month (calc: $96M ARR / 12) (Calc (estimate); source dated 2026-01)');
  });
  it('hub FAQ says not disclosed when a hub has no data', () => {
    const faq = hubFaq('AI test', 'Site', 'Not disclosed.', []);
    expect(faq[1].a).toMatch(/^Not disclosed/);
    expect(faq[3].a).toMatch(/^Not disclosed/);
    expect(faq[4].a).toMatch(/^Not disclosed/);
  });
  it('ranking FAQ uses the real top case, a real ARR example and the missing count', () => {
    const faq = rankingFaq([small, big, none]);
    expect(faq[0].a).toContain('Big');
    expect(faq[1].a).toContain('Big: About $8M');
    expect(faq[2].a).toMatch(/^1 of 3 cases/);
  });
});
