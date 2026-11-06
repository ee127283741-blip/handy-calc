import type { APIRoute } from 'astro';
import { existsSync } from 'node:fs';
import type { CollectionEntry } from 'astro:content';
import { allCases } from '../../lib';
import { ogPng } from '../../lib/og';
import { INDUSTRIES, SITE_NAME } from '../../site';

export async function getStaticPaths() {
  // Cases with a static public/og/<slug>.png (Gemini image) skip the generated text card.
  return (await allCases()).filter((e) => !existsSync(`public/og/${e.data.slug}.png`)).map((entry) => ({ params: { slug: entry.data.slug }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const d = (props as { entry: CollectionEntry<'cases'> }).entry.data;
  const ind = INDUSTRIES.find((i) => i.slug === d.industry)!;
  const png = await ogPng({ eyebrow: `${ind.name} · AI startup case study`, title: d.title, footer: `${SITE_NAME} · Founder${d.founders.length > 1 ? 's' : ''}: ${d.founders.join(', ')}` });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
