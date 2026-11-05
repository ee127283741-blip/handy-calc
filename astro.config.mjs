import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const site = process.env.SITE_URL || 'https://ai-founder-atlas.pages.dev';

// Path -> `updated` date from content frontmatter; other pages get the build date.
function contentDates() {
  const dates = {};
  const fm = (file) => Object.fromEntries([...readFileSync(file, 'utf8').matchAll(/^(slug|category|updated): *(.+)$/gm)].map((m) => [m[1], m[2].trim()]));
  for (const file of readdirSync('./src/content/cases').filter((f) => f.endsWith('.md'))) {
    const f = fm(`./src/content/cases/${file}`);
    dates[`/cases/${f.slug}/`] = new Date(f.updated).toISOString();
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
    sitemap({
      filter: (page) => !page.includes('/404') && new URL(page).pathname !== '/search/',
      serialize: (item) => ({ ...item, lastmod: dates[new URL(item.url).pathname] ?? buildDate }),
    }),
  ],
});
