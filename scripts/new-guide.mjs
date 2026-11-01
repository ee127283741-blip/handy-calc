// Usage: npm run new:guide -- --slug how-to-write-a-system-prompt [--category ai-productivity]
import { existsSync, writeFileSync } from 'node:fs';
import { parseArgs, today } from './args.mjs';

const CATEGORIES = ['ai-productivity', 'ai-business', 'ai-tools', 'ai-privacy', 'ai-costs', 'prompting'];
const { slug, category = 'ai-productivity' } = parseArgs();
if (!CATEGORIES.includes(category) || !/^[a-z0-9-]+$/.test(slug || '')) {
  console.error(`Usage: npm run new:guide -- --slug <kebab-slug> [--category ${CATEGORIES.join('|')}]`);
  process.exit(1);
}
const path = `src/content/guides/${slug}.mdx`;
if (existsSync(path)) { console.error(`Exists, not overwriting: ${path}`); process.exit(1); }
writeFileSync(path, `---
title: TODO Guide Title
slug: ${slug}
category: ${category}
metaDescription: TODO one unique sentence (70–170 characters) describing what the reader will learn from this guide.
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
console.log(`created ${path}\nFill every TODO, link it from a related guide or prompt, then set status: published.`);
