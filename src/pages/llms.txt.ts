import type { APIRoute } from 'astro';
import { INDUSTRIES, PRODUCT_TYPES, SITE_NAME, SITE_TAGLINE } from '../site';
import { allCases, allExplainers, caseUrl, explainerUrl } from '../lib';

// llms.txt index (https://llmstxt.org/), rebuilt from content collections on every build.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const lines = [`# ${SITE_NAME}`, '', `> ${SITE_TAGLINE} Every number links to a dated source.`, ''];
  const cases = await allCases();
  lines.push('## AI startup case library', '', `- [Case library](${abs('/')}): ${cases.length} real AI startup cases; every number is sourced, dated and labelled founder-reported, verified, media-reported or unverified (a quoted figure we could not confirm against its original source), or marked "Not disclosed"`);
  lines.push(`- [AI startup revenue rankings](${abs('/rankings/')}): cases with a disclosed, labelled figure, sorted by monthly revenue (ARR / 12)`);
  for (const ind of INDUSTRIES) {
    const list = cases.filter((c) => c.data.industry === ind.slug);
    if (!list.length) continue;
    lines.push(`- [${ind.name}](${abs(`/industries/${ind.slug}/`)}): ${ind.description}`);
    for (const c of list) lines.push(`  - [${c.data.title}](${abs(caseUrl(c))}) (${c.data.productType}): ${c.data.summary}`);
  }
  lines.push('', '## AI tools explained', '', `- [AI tools explained](${abs('/what-is/')}): plain-English explainers of mainstream AI tools, with plans checked on official pages`);
  for (const e of await allExplainers()) lines.push(`  - [${e.data.title}](${abs(explainerUrl(e))}) (${e.data.type}, by ${e.data.maker}): ${e.data.summary}`);
  lines.push('', '## Product types', '', `- [All product types](${abs('/types/')})`);
  for (const t of PRODUCT_TYPES) lines.push(`- [${t.name}](${abs(`/types/${t.slug}/`)}): ${t.description}`);
  lines.push('');
  lines.push('## Optional', '', `- [Full text for AI engines](${abs('/llms-full.txt')}): every case's TL;DR, sourced revenue figures and FAQ in one file`, `- [RSS feed](${abs('/rss.xml')}): New and updated cases`, `- [About](${abs('/about/')}): Who maintains the site and how AI is used`, `- [Editorial policy](${abs('/editorial-policy/')}): Sources, fact-checking and corrections`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
