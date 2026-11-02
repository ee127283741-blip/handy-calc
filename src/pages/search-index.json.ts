import type { APIRoute } from 'astro';
import { INDUSTRIES } from '../site';
import { allCases, allExplainers, caseUrl, explainerUrl } from '../lib';

// Static search index of cases for CaseSearch (404 page), fetched on first use.
export const GET: APIRoute = async () => {
  const name = (slug: string) => INDUSTRIES.find((i) => i.slug === slug)?.name ?? slug;
  const index = (await allCases()).map((c) => ({ title: c.data.title, url: caseUrl(c), type: c.data.productType, category: name(c.data.industry), description: c.data.summary }));
  for (const e of await allExplainers()) index.push({ title: e.data.title, url: explainerUrl(e), type: e.data.type, category: 'AI tools explained', description: e.data.summary });
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
