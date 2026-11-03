import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { INDUSTRY_SLUGS, PRODUCT_TYPE_NAMES, REVENUE_RANGE_SLUGS } from './site';

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({ name: z.string(), slug: z.string(), description: z.string() }),
});

// Provenance of a number. 'unverified' = quoted figure we could not confirm against the original source.
// Provenance of a number. 'not-disclosed' only when there is no number.
export const LABELS = ['founder-reported', 'verified', 'media-reported', 'unverified', 'third-party-estimate', 'calc', 'not-disclosed'] as const;
// 'third-party-estimate' = analyst/data-firm estimate (e.g. Sacra); 'calc' = our arithmetic on a sourced figure (e.g. ARR/12), never a reported number.
const label = z.enum(LABELS);
// Year-month only, and only when the source makes it reasonably clear; otherwise omit.
const dateish = z.string().regex(/^\d{4}-\d{2}$/);
// labelNote: optional display override for the label, e.g. 'Founder-reported via Latka'.
const sourced = { label, labelNote: z.string().optional(), sourceUrl: z.string().url().optional(), sourceDate: dateish.optional() };
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
    // Keyword-first workflow (PUBLISHING.md): must appear in title, H1, first paragraph (summary) and meta description.
    primaryKeyword: z.string().min(3),
    secondaryKeywords: z.array(z.string()).default([]),
    industry: z.enum(INDUSTRY_SLUGS),
    productType: z.enum(PRODUCT_TYPE_NAMES),
    appSubcategory: z.string().optional(),
    foundedYear: z.number().int().nullable(),
    foundedDate: z.string(),
    teamSize: z.object({ display: z.string(), ...sourced }),
    // Shown in the "At a glance" table at the top of the case; 'Not disclosed' when no sourced pricing exists.
    pricing: z.object({ display: z.string(), ...sourced }),
    mrr: money,
    totalRevenue: money,
    revenueRange: z.enum(REVENUE_RANGE_SLUGS),
    metrics: z.array(metric).min(1),
    // 2-3 sentence direct answer shown at the top (AEO); FAQ is rendered and emitted as FAQPage JSON-LD.
    tldr: z.string().min(100).max(600),
    faq: z.array(z.object({ q: z.string().endsWith('?'), a: z.string().min(10) })).min(3),
    sources: z.array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string(), date: dateish.optional() })).min(1),
    published: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

// "What is X?" explainers for mainstream AI tools, at /what-is/<slug>/ (see PUBLISHING.md 0.3).
export const EXPLAINER_TYPES = ['AI assistant', 'Coding agent', 'AI search', 'Autonomous agent', 'Code editor', 'Open models'] as const;
const explainers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/explainers' }),
  schema: z.object({
    title: z.string().max(70),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string(),
    maker: z.string(),
    type: z.enum(EXPLAINER_TYPES),
    summary: z.string().min(70).max(200),
    primaryKeyword: z.string().min(3),
    secondaryKeywords: z.array(z.string()).min(3),
    tldr: z.string().min(100).max(600),
    officialUrl: z.string().url(),
    // Plans and prices change often: always show the date they were checked on the official page.
    pricing: z.object({ display: z.string(), sourceUrl: z.string().url(), checked: z.coerce.date() }),
    relatedCases: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string().endsWith('?'), a: z.string().min(10) })).min(3).max(5),
    sources: z.array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string(), date: dateish.optional() })).min(1),
    published: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

export const collections = { authors, cases, explainers };
