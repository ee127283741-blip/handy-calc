import { getCollection } from 'astro:content';
import { CATEGORIES, POPULAR } from './site';

export const isLive = (d: { data: { status: string } }) => import.meta.env.DEV || d.data.status === 'published';

export async function liveCalculators() {
  return (await getCollection('calculators', isLive)).sort((a, b) => a.data.h1.localeCompare(b.data.h1));
}
export async function liveGuides() {
  return getCollection('guides', isLive);
}
export const calcUrl = (c: { data: { category: string; slug: string } }) => `/${c.data.category}/${c.data.slug}/`;
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Every category with its live calculators, in CATEGORIES order. */
export async function calculatorsByCategory() {
  const calcs = await liveCalculators();
  return CATEGORIES.map((cat) => ({ cat, calcs: calcs.filter((c) => c.data.category === cat.slug) }));
}

/** Calculators listed in POPULAR order (falls back to all if none match). */
export async function popularCalculators() {
  const calcs = await liveCalculators();
  const picked = POPULAR.map((s) => calcs.find((c) => c.data.slug === s)).filter((c) => !!c);
  return picked.length ? picked : calcs;
}
