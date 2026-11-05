// Pure helpers over case frontmatter (no astro:content import, so unit tests can load them).
// Everything here reuses figures already in frontmatter; nothing is estimated or converted here.
export const LABEL_NAME: Record<string, string> = {
  'founder-reported': 'Founder-reported', verified: 'Verified', 'media-reported': 'Media-reported', unverified: 'Unverified', 'third-party-estimate': 'Third-party estimate', calc: 'Calc (estimate)', 'not-disclosed': 'Not disclosed',
};

type Sourced = { display: string; label: string; labelNote?: string; sourceUrl?: string; sourceDate?: string };
export interface CaseFacts { company: string; slug: string; mrr: Sourced & { value: number | null }; pricing: Sourced }
export interface Faq { q: string; a: string }

export const labelText = (s: Pick<Sourced, 'label' | 'labelNote'>) => s.labelNote ?? LABEL_NAME[s.label];
export const asOf = (s: Pick<Sourced, 'sourceDate'>) => s.sourceDate ?? 'Not dated';

/** A figure counts as disclosed only with a number, a provenance label and a source link. */
export const hasFigure = (c: CaseFacts) => c.mrr.value !== null && c.mrr.label !== 'not-disclosed' && !!c.mrr.sourceUrl;
/** mrr.value carries no currency; we never apply an exchange rate, so non-USD figures cannot be ranked against USD ones. */
export const isUsd = (c: CaseFacts) => !/[€£¥]|R\$/.test(c.mrr.display);

const byValue = <T extends CaseFacts>(a: T, b: T) => b.mrr.value! - a.mrr.value! || a.company.localeCompare(b.company);
/** USD figures, highest monthly value first. */
export const rankedUsd = <T extends CaseFacts>(cases: T[]) => cases.filter(hasFigure).filter(isUsd).sort(byValue);
/** Disclosed figures in other currencies, listed apart from the USD order. */
export const otherCurrency = <T extends CaseFacts>(cases: T[]) => cases.filter(hasFigure).filter((c) => !isUsd(c)).sort(byValue);
export const hasPricing = (c: CaseFacts) => c.pricing.label !== 'not-disclosed' && !!c.pricing.sourceUrl;

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const cite = (c: CaseFacts) => `${c.mrr.display} (${labelText(c.mrr)}; source dated ${asOf(c.mrr)})`;

/** "3 Founder-reported, 2 Calc (estimate)": most common label first. */
export function labelBreakdown(cases: CaseFacts[]) {
  const counts = new Map<string, number>();
  for (const c of cases.filter(hasFigure)) counts.set(c.mrr.label, (counts.get(c.mrr.label) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([l, n]) => `${n} ${LABEL_NAME[l]}`).join(', ');
}

export function hubFaq(phrase: string, siteName: string, money: string, cases: CaseFacts[]): Faq[] {
  const disclosed = cases.filter(hasFigure).length;
  const top = rankedUsd(cases)[0];
  const priced = cases.filter(hasPricing);
  return [
    { q: `How many ${phrase} startups does ${siteName} cover?`, a: `${plural(cases.length, 'case study', 'case studies')}. ${disclosed} ${disclosed === 1 ? 'has' : 'have'} a disclosed monthly revenue or ARR figure with a source; the other ${cases.length - disclosed} ${cases.length - disclosed === 1 ? 'is' : 'are'} marked not disclosed.` },
    { q: `Which ${phrase} startup has the highest disclosed revenue?`, a: top ? `${top.company}: ${cite(top)}. This is the highest figure among the cases on this site, not across the whole market.` : 'Not disclosed. No case in this group has a sourced revenue figure yet.' },
    { q: `How do ${phrase} startups make money?`, a: money },
    { q: `What do ${phrase} products cost?`, a: priced.length ? `${priced.length} of ${plural(cases.length, 'case')} ${priced.length === 1 ? 'has' : 'have'} sourced pricing, for example: ${priced.slice(0, 3).map((c) => `${c.company}: ${c.pricing.display} (${labelText(c.pricing)})`).join('; ')}.` : 'Not disclosed. No case in this group has sourced pricing yet.' },
    { q: `How reliable are these ${phrase} revenue figures?`, a: disclosed ? `Each figure carries its own label. The ${plural(disclosed, 'disclosed figure')} here: ${labelBreakdown(cases)}. Calc means our arithmetic on a sourced number, not a reported figure. We do not audit any of them.` : 'Not disclosed. There are no revenue figures in this group to assess yet.' },
  ];
}

export function rankingFaq(cases: CaseFacts[]): Faq[] {
  const ranked = rankedUsd(cases);
  const top = ranked[0];
  const example = ranked.find((c) => /ARR \/ 12/.test(c.mrr.display));
  const disclosed = cases.filter(hasFigure).length;
  return [
    { q: 'Which AI startup has the highest disclosed monthly revenue?', a: `Among the cases on this site, ${top.company}: ${cite(top)}. The ranking only covers startups we have written up and that have a sourced figure.` },
    { q: 'How is ARR converted to monthly revenue?', a: `ARR is divided by 12 and the result is labelled as a calculation, not a reported number.${example ? ` For example, ${example.company}: ${example.mrr.display}.` : ''}` },
    { q: 'Why are some AI startups missing from the ranking?', a: `${cases.length - disclosed} of ${cases.length} cases have no sourced monthly revenue or ARR figure, so they are marked not disclosed and left out rather than estimated.` },
    { q: 'How reliable are the figures in this ranking?', a: `Labels across the ${disclosed} disclosed figures: ${labelBreakdown(cases)}. They are reported or derived figures that we do not audit, so treat the order as approximate.` },
  ];
}
