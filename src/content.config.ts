import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS, PROMPT_CATEGORY_SLUGS } from './site';

const source = z.object({ title: z.string().min(3), url: z.string().url(), publisher: z.string().min(2) });
const faq = z.object({ q: z.string().min(5), a: z.string().min(10) });
const category = z.enum(CATEGORY_SLUGS);

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(70),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    metaDescription: z.string().min(70).max(170),
    category,
    subtopic: z.string().optional(),
    alsoIn: z.array(category).default([]),
    faqs: z.array(faq).default([]),
    sources: z.array(source).min(1),
    lastVerified: z.coerce.date().optional(),
    author: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    status: z.enum(['draft', 'published']),
  }),
});

const prompts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prompts' }),
  schema: z.object({
    title: z.string().max(70),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    category: z.enum(PROMPT_CATEGORY_SLUGS),
    purpose: z.string().min(40).max(300),
    variables: z.array(z.object({ name: z.string().regex(/^[a-z0-9_]+$/), description: z.string(), example: z.string() })).min(1),
    tools: z.array(z.string()).min(1),
    image: z.string().regex(/^\/prompt-proofs\//).optional(),
    imageCredit: z.string().optional(),
    tags: z.array(z.string()).default([]),
    published: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({ name: z.string(), slug: z.string(), description: z.string() }),
});

export const collections = { guides, prompts, authors };
