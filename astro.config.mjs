import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readdirSync, readFileSync } from 'node:fs';
import remarkAdAfterP2 from './src/remark-ad-after-p2.mjs';

const site = process.env.SITE_URL || 'https://PLACEHOLDER.pages.dev';

// Path -> `updated` date from content frontmatter; other pages get the build date.
function contentDates() {
  const dates = {};
  const fm = (file) => Object.fromEntries([...readFileSync(file, 'utf8').matchAll(/^(slug|category|updated): *(.+)$/gm)].map((m) => [m[1], m[2].trim()]));
  for (const file of readdirSync('./src/content/guides')) {
    const f = fm(`./src/content/guides/${file}`);
    dates[`/guides/${f.slug}/`] = new Date(f.updated).toISOString();
  }
  for (const file of readdirSync('./src/content/prompts', { recursive: true }).filter((f) => f.endsWith('.md'))) {
    const f = fm(`./src/content/prompts/${file}`);
    dates[`/prompts/${f.category}/${f.slug}/`] = new Date(f.updated).toISOString();
  }
  return dates;
}
const dates = contentDates();
const buildDate = new Date().toISOString();

export default defineConfig({
  markdown: { syntaxHighlight: false },
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    mdx({ remarkPlugins: [remarkAdAfterP2] }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, lastmod: dates[new URL(item.url).pathname] ?? buildDate }),
    }),
  ],
});
