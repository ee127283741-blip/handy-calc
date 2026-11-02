export const SITE_NAME = 'AI Founder Atlas';
export const SITE_TAGLINE = 'Real AI startup case studies with sourced, dated revenue numbers, by industry and product type.';

export interface Taxon { slug: string; name: string; description: string }

/** Case library: level-1 industries, at /industries/<slug>/. */
export const INDUSTRIES: Taxon[] = [
  { slug: 'creative-media', name: 'Creative & Media', description: 'AI startups for photos, video and music creation.' },
  { slug: 'productivity', name: 'Productivity', description: 'AI tools for documents, spreadsheets, presentations and everyday work.' },
  { slug: 'developer-tools', name: 'Developer Tools', description: 'AI app builders and coding tools, including "vibe coding" platforms.' },
  { slug: 'customer-support', name: 'Customer Support', description: 'AI chatbots and agents trained on a company\'s own content.' },
  { slug: 'marketing-advertising', name: 'Marketing & Advertising', description: 'AI for ads, social media growth and content marketing.' },
  { slug: 'education', name: 'Education', description: 'AI for students, researchers and academic writing.' },
  { slug: 'health-fitness', name: 'Health & Fitness', description: 'AI for nutrition, fitness and health tracking.' },
  { slug: 'beauty-lifestyle', name: 'Beauty & Lifestyle', description: 'Consumer AI apps about appearance and lifestyle.' },
  { slug: 'careers-hr', name: 'Careers & HR', description: 'AI for professional profiles, hiring and careers.' },
  { slug: 'sales-lead-generation', name: 'Sales & Lead Generation', description: 'AI and automation tools for outbound sales, cold email and lead generation.' },
  { slug: 'legal-professional-services', name: 'Legal & Professional Services', description: 'AI for law firms, in-house legal teams and professional services.' },
  { slug: 'real-estate-home', name: 'Real Estate & Home', description: 'AI for interiors, property and home design.' },
];
export const INDUSTRY_SLUGS = INDUSTRIES.map((c) => c.slug) as [string, ...string[]];

/** Product types, at /types/<slug>/. Apps are further split by appSubcategory. */
export const PRODUCT_TYPES: Taxon[] = [
  { slug: 'saas', name: 'SaaS', description: 'Subscription web software.' },
  { slug: 'app', name: 'App', description: 'Mobile apps, desktop apps and browser extensions.' },
  { slug: 'tool', name: 'Tool', description: 'Single-purpose utilities and small tools.' },
  { slug: 'service', name: 'Service', description: 'Done-for-you or productised services powered by AI.' },
  { slug: 'content', name: 'Content', description: 'Newsletters, courses and media businesses built on AI.' },
];
export const PRODUCT_TYPE_NAMES = PRODUCT_TYPES.map((t) => t.name) as [string, ...string[]];
export const typeSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Monthly revenue buckets (from the case's monthly revenue figure). */
export const REVENUE_RANGES = [
  { slug: 'under-10k', name: 'Under $10K/mo' },
  { slug: '10k-50k', name: '$10K–50K/mo' },
  { slug: '50k-250k', name: '$50K–250K/mo' },
  { slug: '250k-1m', name: '$250K–1M/mo' },
  { slug: '1m-10m', name: '$1M–10M/mo' },
  { slug: '10m-plus', name: '$10M+/mo' },
  { slug: 'not-disclosed', name: 'Not disclosed' },
] as const;
export const REVENUE_RANGE_SLUGS = REVENUE_RANGES.map((r) => r.slug) as unknown as [string, ...string[]];

/** Production URL; astro.config.mjs uses SITE_URL from the environment and falls back to this. */
export const SITE_URL = 'https://ai-founder-atlas.pages.dev';
