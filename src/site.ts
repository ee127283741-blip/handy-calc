export const SITE_NAME = 'Handy Calc';
export const SITE_TAGLINE = 'Practical AI guides and calculators for small businesses and office workers.';

export interface Category {
  slug: string;
  name: string;
  title: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'ai-costs', name: 'AI Costs & Pricing', title: 'AI Cost & Pricing Calculators', description: 'Estimate LLM API bills and compare AI subscriptions with API pricing, using official, dated price lists.' },
  { slug: 'ai-business', name: 'AI for Business', title: 'AI for Business Calculators & Guides', description: 'Work out whether an AI rollout pays for itself, with conservative assumptions you can change.' },
  { slug: 'ai-productivity', name: 'AI Productivity', title: 'AI Productivity Guides', description: 'Practical, tested advice for using AI tools in everyday office work.' },
  { slug: 'prompts', name: 'Prompts & Templates', title: 'AI Prompts & Templates', description: 'Copy-ready prompts and templates for common small-business and office tasks.' },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;

/** Calculator slugs featured on the homepage and footer. */
export const POPULAR = ['llm-api-cost-calculator', 'ai-subscription-vs-api-calculator', 'ai-roi-calculator'];
