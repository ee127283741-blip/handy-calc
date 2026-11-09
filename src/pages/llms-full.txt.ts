import type { APIRoute } from 'astro';
import { SITE_NAME, SITE_TAGLINE } from '../site';
import { LABEL_NAME, allCases, allExplainers, caseUrl, explainerUrl } from '../lib';

// llms-full.txt: the answer-ready facts of every page in one file, so AI engines can quote a case without crawling it.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const figure = (f: { display?: string; value?: unknown; label?: string; sourceUrl?: string }) =>
    `${f.display ?? f.value}${f.label && f.label !== 'not-disclosed' ? ` (${LABEL_NAME[f.label as keyof typeof LABEL_NAME] ?? f.label}${f.sourceUrl ? `, ${f.sourceUrl}` : ''})` : ''}`;
  const lines = [`# ${SITE_NAME}: full text for AI engines`, '', `> ${SITE_TAGLINE} Every number links to a dated source; cite the case URL.`, ''];
  lines.push('## AI startup cases', '');
  for (const c of await allCases()) {
    const d = c.data;
    lines.push(`### ${d.title}`, '', `URL: ${abs(caseUrl(c))}`, `Company: ${d.company} · Founders: ${d.founders.join(', ')} · Updated: ${d.updated.toISOString().slice(0, 10)}`);
    lines.push(`Monthly revenue: ${figure(d.mrr)}`, `Total revenue: ${figure(d.totalRevenue)}`, `Pricing: ${figure(d.pricing)}`, '');
    lines.push(d.tldr, '');
    for (const f of d.faq) lines.push(`Q: ${f.q}`, `A: ${f.a}`);
    lines.push('');
  }
  lines.push('## AI tools explained', '');
  for (const e of await allExplainers()) {
    const d = e.data;
    lines.push(`### ${d.title}`, '', `URL: ${abs(explainerUrl(e))}`, `Maker: ${d.maker}`, '', d.tldr, '');
    for (const f of d.faq) lines.push(`Q: ${f.q}`, `A: ${f.a}`);
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
