import type { APIRoute } from 'astro';
import { CATEGORIES, SITE_NAME, SITE_TAGLINE } from '../site';
import { calcUrl, liveCalculators, liveGuides } from '../lib';

// llms.txt index (https://llmstxt.org/), rebuilt from content collections on every build.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const calcs = await liveCalculators();
  const guides = await liveGuides();
  const lines = [`# ${SITE_NAME}`, '', `> ${SITE_TAGLINE} Every calculator shows its formula, a worked example and cited sources.`, ''];
  for (const cat of CATEGORIES) {
    const items = calcs.filter((c) => c.data.category === cat.slug);
    if (!items.length) continue;
    lines.push(`## ${cat.name}`, '', `- [${cat.title}](${abs(`/${cat.slug}/`)}): ${cat.description}`);
    for (const c of items) lines.push(`- [${c.data.h1}](${abs(calcUrl(c))}): ${c.data.directAnswer}`);
    lines.push('');
  }
  if (guides.length) {
    lines.push('## Guides', '');
    for (const g of guides) lines.push(`- [${g.data.title}](${abs(`/guides/${g.data.slug}/`)}): ${g.data.metaDescription}`);
    lines.push('');
  }
  lines.push('## Optional', '', `- [About](${abs('/about/')}): Who maintains the site and how AI is used`, `- [Editorial policy](${abs('/editorial-policy/')}): Sources, fact-checking and corrections`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
