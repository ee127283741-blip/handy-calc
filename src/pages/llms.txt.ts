import type { APIRoute } from 'astro';
import { CATEGORIES, PROMPT_CATEGORIES, SITE_NAME, SITE_TAGLINE } from '../site';
import { IDEA_TOOL, allItems, inCategory } from '../lib';

// llms.txt index (https://llmstxt.org/), rebuilt from content collections on every build.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const items = await allItems();
  const lines = [`# ${SITE_NAME}`, '', `> ${SITE_TAGLINE} Prompts mark every variable as {{variable_name}}; tutorials link to official, dated sources.`, ''];
  lines.push('## Tool', '', `- [${IDEA_TOOL.title}](${abs(IDEA_TOOL.url)}): ${IDEA_TOOL.description}`, '');
  lines.push('## Prompt library', '', `- [AI prompt library](${abs('/prompts/')}): All prompt categories`);
  for (const cat of PROMPT_CATEGORIES) {
    lines.push(`- [${cat.name} prompts](${abs(`/prompts/${cat.slug}/`)}): ${cat.description}`);
    for (const i of items.filter((i) => i.type === 'prompt' && i.category === cat.slug)) lines.push(`  - [${i.title}](${abs(i.url)}): ${i.description}`);
  }
  lines.push('');
  for (const cat of CATEGORIES) {
    lines.push(`## ${cat.name}`, '', `- [${cat.title}](${abs(`/${cat.slug}/`)}): ${cat.description}`);
    for (const s of cat.subtopics) lines.push(`  - ${s.name} ([section](${abs(`/${cat.slug}/#s-${s.slug}`)})): ${s.description}`);
    for (const i of items.filter((i) => i.type === 'guide' && inCategory(i, cat.slug))) lines.push(`- [${i.title}](${abs(i.url)}) (tutorial): ${i.description}`);
    lines.push('');
  }
  lines.push('## Optional', '', `- [Browse all](${abs('/calculators/')}): Searchable directory of prompts and tutorials`, `- [RSS feed](${abs('/rss.xml')}): New tutorials and prompts`, `- [About](${abs('/about/')}): Who maintains the site and how AI is used`, `- [Editorial policy](${abs('/editorial-policy/')}): Sources, fact-checking and corrections`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
