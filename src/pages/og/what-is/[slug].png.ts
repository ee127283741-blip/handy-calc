import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { allExplainers } from '../../../lib';
import { ogPng } from '../../../lib/og';
import { SITE_NAME } from '../../../site';

export async function getStaticPaths() {
  return (await allExplainers()).map((entry) => ({ params: { slug: entry.data.slug }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const d = (props as { entry: CollectionEntry<'explainers'> }).entry.data;
  const png = await ogPng({ eyebrow: `AI tools explained · ${d.type}`, title: d.title, footer: `${SITE_NAME} · Made by ${d.maker}` });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
