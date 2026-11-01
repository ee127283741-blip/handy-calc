// Usage: npm run new:guide -- --slug how-to-write-a-system-prompt [--category ai-productivity] [--tool <calculator-slug>]
import { existsSync, writeFileSync } from 'node:fs';
import { parseArgs, today } from './args.mjs';

const CATEGORIES = ['ai-costs', 'ai-business', 'ai-productivity', 'prompts'];
const { slug, category = 'ai-productivity', tool } = parseArgs();
if (!CATEGORIES.includes(category) || !/^[a-z0-9-]+$/.test(slug || '')) {
  console.error(`Usage: npm run new:guide -- --slug <kebab-slug> [--category ${CATEGORIES.join('|')}] [--tool <calculator-slug>]`);
  process.exit(1);
}
const path = `src/content/guides/${slug}.mdx`;
if (existsSync(path)) { console.error(`Exists, not overwriting: ${path}`); process.exit(1); }
writeFileSync(path, `---
title: TODO Guide Title
slug: ${slug}
category: ${category}
${tool ? `tool: ${tool}\n` : ''}metaDescription: TODO one unique sentence (70–170 characters) describing what the reader will learn from this guide.
sources:
  - title: TODO
    url: https://example.com/replace-me
    publisher: TODO
faqs:
  - q: TODO question one?
    a: TODO self-contained answer.
author: Editorial team
published: ${today()}
updated: ${today()}
lastVerified: ${today()}
status: draft
---

TODO intro that answers the main question in the first paragraph.

TODO second paragraph (an ad slot is inserted after it when ads are on).

## TODO question-style heading?

TODO
`);
console.log(`created ${path}\nFill every TODO, link it from a related calculator, then set status: published.`);
