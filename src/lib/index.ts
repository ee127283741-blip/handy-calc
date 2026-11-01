import { getCollection, type CollectionEntry } from 'astro:content';

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** All cases, alphabetical by company. */
export async function allCases() {
  return (await getCollection('cases')).sort((a, b) => a.data.company.localeCompare(b.data.company));
}
export const caseUrl = (c: CollectionEntry<'cases'>) => `/cases/${c.data.slug}/`;
export const subSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
export const LABEL_NAME: Record<string, string> = {
  'founder-reported': 'Founder-reported', verified: 'Verified', 'media-reported': 'Media-reported', 'not-disclosed': 'Not disclosed',
};
