import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const source = z.object({ title: z.string().min(3), url: z.string().url(), publisher: z.string().min(2) });
const faq = z.object({ q: z.string().min(5), a: z.string().min(10) });
const wordCount = (s: string) => s.trim().split(/\s+/).length;

const calculators = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/calculators' }),
  schema: z.object({
    title: z.string().max(70),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    category: z.enum(['cooking', 'home-diy', 'crafts', 'date-time', 'units']),
    h1: z.string(),
    metaDescription: z.string().min(70).max(170),
    directAnswer: z.string().refine((s) => wordCount(s) <= 70, 'directAnswer must be 70 words or fewer'),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    calculator: z.string(),
    faqs: z.array(faq).min(3, 'At least 3 FAQs are required').max(6),
    sources: z.array(source).min(2, 'At least 2 sources are required'),
    related: z.array(z.string()).default([]),
    author: z.string(),
    reviewedBy: z.string().optional(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    status: z.enum(['draft', 'published']),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(70),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    metaDescription: z.string().min(70).max(170),
    category: z.enum(['cooking', 'home-diy', 'crafts', 'date-time', 'units']),
    sources: z.array(source).min(1),
    author: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    status: z.enum(['draft', 'published']),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({ name: z.string(), slug: z.string(), description: z.string() }),
});

export const collections = { calculators, guides, authors };
