import type { APIRoute } from 'astro';
import { INDUSTRIES, PRODUCT_TYPES, SITE_NAME, SITE_TAGLINE } from '../site';
import { allCases, caseUrl } from '../lib';

// llms.txt index (https://llmstxt.org/), rebuilt from content collections on every build.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const lines = [`# ${SITE_NAME}`, '', `> ${SITE_TAGLINE} Every number links to a dated source.`, ''];
  const cases = await allCases();
  lines.push('## AI startup case library', '', `- [Case library](${abs('/')}): ${cases.length} real AI startup cases; every number is sourced, dated and labelled founder-reported, verified or media-reported, or marked "Not disclosed"`);
  for (const ind of INDUSTRIES) {
    const list = cases.filter((c) => c.data.industry === ind.slug);
    if (!list.length) continue;
    lines.push(`- [${ind.name}](${abs(`/industries/${ind.slug}/`)}): ${ind.description}`);
    for (const c of list) lines.push(`  - [${c.data.title}](${abs(caseUrl(c))}) (${c.data.productType}): ${c.data.summary}`);
  }
  lines.push('', '## Product types', '', `- [All product types](${abs('/types/')})`);
  for (const t of PRODUCT_TYPES) lines.push(`- [${t.name}](${abs(`/types/${t.slug}/`)}): ${t.description}`);
  lines.push('');
  lines.push('## Optional', '', `- [RSS feed](${abs('/rss.xml')}): New and updated cases`, `- [About](${abs('/about/')}): Who maintains the site and how AI is used`, `- [Editorial policy](${abs('/editorial-policy/')}): Sources, fact-checking and corrections`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
