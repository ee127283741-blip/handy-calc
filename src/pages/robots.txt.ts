import type { APIRoute } from 'astro';

// Allow everything, including AI search/assistant bots (see SPEC 2.4).
const bots = ['*', 'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended'];

export const GET: APIRoute = ({ site }) =>
  new Response(
    bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n') + `\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
