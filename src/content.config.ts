import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { INDUSTRY_SLUGS, PRODUCT_TYPE_NAMES, REVENUE_RANGE_SLUGS } from './site';

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({ name: z.string(), slug: z.string(), description: z.string() }),
});

// Provenance of a number. 'unverified' = quoted figure we could not confirm against the original source.
// Provenance of a number. 'not-disclosed' only when there is no number.
export const LABELS = ['founder-reported', 'verified', 'media-reported', 'unverified', 'not-disclosed'] as const;
const label = z.enum(LABELS);
const dateish = z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/);
const sourced = { label, sourceUrl: z.string().url().optional(), sourceDate: dateish.optional() };
const money = z.object({ value: z.number().nullable(), display: z.string(), ...sourced });
const metric = z.object({ name: z.string(), value: z.string(), ...sourced });

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string().max(70),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    company: z.string(),
    founders: z.array(z.string()).min(1),
    summary: z.string().min(70).max(200),
    industry: z.enum(INDUSTRY_SLUGS),
    productType: z.enum(PRODUCT_TYPE_NAMES),
    appSubcategory: z.string().optional(),
    foundedYear: z.number().int().nullable(),
    foundedDate: z.string(),
    teamSize: z.object({ display: z.string(), ...sourced }),
    mrr: money,
    totalRevenue: money,
    revenueRange: z.enum(REVENUE_RANGE_SLUGS),
    metrics: z.array(metric).min(1),
    sources: z.array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string(), date: dateish })).min(1),
    updated: z.coerce.date(),
  }),
});

export const collections = { authors, cases };
