// Usage: npm run new:calculator -- --category cooking --slug butter-converter
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { camel, parseArgs, pascal, today } from './args.mjs';

const CATEGORIES = ['cooking', 'home-diy', 'crafts', 'date-time', 'units'];
const { category, slug } = parseArgs();
if (!CATEGORIES.includes(category) || !/^[a-z0-9-]+$/.test(slug || '')) {
  console.error(`Usage: npm run new:calculator -- --category <${CATEGORIES.join('|')}> --slug <kebab-slug>`);
  process.exit(1);
}
const Name = pascal(slug);
const fn = camel(slug);
const files = {
  [`src/content/calculators/${slug}.mdx`]: `---
title: TODO Tool Name – Free Calculator | Handy Calc
slug: ${slug}
category: ${category}
h1: TODO Tool Name
metaDescription: TODO one unique sentence (70–170 characters) describing exactly what this calculator does for the visitor.
directAnswer: TODO 40–60 word direct answer to the main question, with a concrete number.
primaryKeyword: TODO
secondaryKeywords: []
calculator: ${Name}
faqs:
  - q: TODO question one?
    a: TODO self-contained answer.
  - q: TODO question two?
    a: TODO self-contained answer.
  - q: TODO question three?
    a: TODO self-contained answer.
  - q: TODO question four?
    a: TODO self-contained answer.
sources:
  - title: TODO
    url: https://example.com/replace-me
    publisher: TODO
  - title: TODO
    url: https://example.com/replace-me-too
    publisher: TODO
related: []
author: Editorial team
published: ${today()}
updated: ${today()}
status: draft
---

## Worked example: TODO real scenario

1. TODO step

## How the calculation works

<code class="formula">TODO formula</code>

- TODO variables, assumptions and limitations

## TODO quick reference table

| Input | Result |
|---|---|
| TODO | TODO |
`,
  [`src/calculators/${fn}.ts`]: `// TODO: pure calculation logic. Cite the source of every constant.
export function ${fn}(input: number): number {
  return input;
}
`,
  [`src/calculators/${fn}.test.ts`]: `import { describe, expect, it } from 'vitest';
import { ${fn} } from './${fn}';

// At least 5 known values checked against an authoritative source.
describe('${fn}', () => {
  it.todo('matches known value 1');
  it.todo('matches known value 2');
  it.todo('matches known value 3');
  it.todo('matches known value 4');
  it.todo('matches known value 5');
  it('runs', () => {
    expect(${fn}(1)).toBe(1);
  });
});
`,
  [`src/components/calculators/${Name}.astro`]: `---
import CalcShell from '../CalcShell.astro';
---
<CalcShell id="calc-${slug}" label="TODO calculator">
  <div class="row">
    <div><label for="${slug}-in">TODO input</label><input id="${slug}-in" inputmode="decimal" value="1" /></div>
  </div>
</CalcShell>
<script>
  import { $, fmt, wire } from '../../calculators/ui';
  import { ${fn} } from '../../calculators/${fn}';
  const root = document.getElementById('calc-${slug}')!;
  const run = wire(root, () => {
    const n = Number($(root, '#${slug}-in').value);
    return Number.isFinite(n) ? fmt(${fn}(n)) : 'Enter a number';
  });
  run();
</script>
`,
};
for (const path of Object.keys(files)) {
  if (existsSync(path)) { console.error(`Exists, not overwriting: ${path}`); process.exit(1); }
}
for (const [path, body] of Object.entries(files)) {
  mkdirSync(path.replace(/\/[^/]+$/, ''), { recursive: true });
  writeFileSync(path, body);
  console.log(`created ${path}`);
}
console.log(`\nNext: register ${Name} in src/components/calculators/index.ts, fill every TODO, then set status: published.`);
