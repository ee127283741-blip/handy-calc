import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkAdAfterP2 from './src/remark-ad-after-p2.mjs';

const site = process.env.SITE_URL || 'https://PLACEHOLDER.pages.dev';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [mdx({ remarkPlugins: [remarkAdAfterP2] }), sitemap({ filter: (page) => !page.includes('/404') })],
});
