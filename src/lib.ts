import { getCollection } from 'astro:content';

export const isLive = (d: { data: { status: string } }) => import.meta.env.DEV || d.data.status === 'published';

export async function liveCalculators() {
  return (await getCollection('calculators', isLive)).sort((a, b) => a.data.h1.localeCompare(b.data.h1));
}
export async function liveGuides() {
  return getCollection('guides', isLive);
}
export const calcUrl = (c: { data: { category: string; slug: string } }) => `/${c.data.category}/${c.data.slug}/`;
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
