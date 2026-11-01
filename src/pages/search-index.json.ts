import type { APIRoute } from 'astro';
import { allItems } from '../lib';

// Static search index (tool, tutorials, prompts) for /calculators/, fetched on first use.
export const GET: APIRoute = async () => {
  const index = (await allItems()).map(({ title, url, type, category, description }) => ({ title, url, type, category, description }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
