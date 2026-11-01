import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../site';

export const isLive = (d: { data: { status: string } }) => import.meta.env.DEV || d.data.status === 'published';

export async function liveGuides() {
  return getCollection('guides', isLive);
}
/** All prompts, newest first. */
export async function allPrompts() {
  return (await getCollection('prompts')).sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf() || a.data.title.localeCompare(b.data.title));
}
export const promptUrl = (p: CollectionEntry<'prompts'>) => `/prompts/${p.data.category}/${p.data.slug}/`;
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Splits a prompt body into the prompt text (first fenced block) and the tips that follow it. */
export function splitPrompt(body = '') {
  const m = body.match(/```[a-z]*\n([\s\S]*?)\n```/);
  if (!m) throw new Error('Prompt body needs a fenced block');
  const rest = body.slice(body.indexOf(m[0]) + m[0].length);
  const tips = [...rest.matchAll(/^- (.+)$/gm)].map((t) => t[1]);
  return { text: m[1].trim(), tips };
}

export const IDEA_TOOL = {
  title: 'Idea → Prompt',
  url: '/idea-to-prompt/',
  description: 'Turn a vague idea into a detailed, structured prompt for websites, apps, brands, images, video and copy. Runs in your browser.',
};

export interface Item {
  type: 'tool' | 'guide' | 'prompt';
  title: string;
  url: string;
  description: string;
  category: string;
  subtopic?: string;
  alsoIn: string[];
  slug: string;
  updated: Date;
}

/** The tool, every live guide and every prompt as one flat list. */
export async function allItems(): Promise<Item[]> {
  const guides = (await liveGuides()).map(({ data: d }): Item => ({
    type: 'guide', title: d.title, url: `/guides/${d.slug}/`, description: d.metaDescription,
    category: d.category, subtopic: d.subtopic, alsoIn: d.alsoIn, slug: d.slug, updated: d.updated,
  }));
  const prompts = (await allPrompts()).map((p): Item => ({
    type: 'prompt', title: p.data.title, url: promptUrl(p), description: p.data.purpose,
    category: p.data.category, alsoIn: [], slug: p.data.slug, updated: p.data.updated,
  }));
  const tool: Item = { type: 'tool', ...IDEA_TOOL, category: 'prompting', alsoIn: [], slug: 'idea-to-prompt', updated: new Date('2026-11-01') };
  const known = new Set(CATEGORIES.flatMap((c) => c.subtopics.map((s) => s.slug)));
  for (const i of guides) if (i.subtopic && !known.has(i.subtopic)) throw new Error(`Unknown subtopic "${i.subtopic}" on ${i.url}`);
  return [tool, ...guides, ...prompts];
}

export const inCategory = (i: Item, cat: string) => i.category === cat || i.alsoIn.includes(cat);
export const TYPE_LABEL = { tool: 'Tool', guide: 'Tutorial', prompt: 'Prompt' } as const;
