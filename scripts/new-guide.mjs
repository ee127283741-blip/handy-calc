// Usage: npm run new:guide -- --slug how-to-measure-flour [--category cooking]
import { existsSync, writeFileSync } from 'node:fs';
import { parseArgs, today } from './args.mjs';

const { slug, category = 'cooking' } = parseArgs();
if (!/^[a-z0-9-]+$/.test(slug || '')) {
  console.error('Usage: npm run new:guide -- --slug <kebab-slug> [--category cooking|home-diy|crafts|date-time|units]');
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
author: Editorial team
published: ${today()}
updated: ${today()}
status: draft
---

TODO intro that answers the main question in the first paragraph.

## TODO question-style heading?

TODO
`);
console.log(`created ${path}\nFill every TODO, link it from a related calculator, then set status: published.`);
