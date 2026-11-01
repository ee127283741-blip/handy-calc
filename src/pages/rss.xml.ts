import type { APIRoute } from 'astro';
import { SITE_NAME, SITE_TAGLINE } from '../site';
import { allPrompts, liveGuides, promptUrl } from '../lib';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Hand-written RSS 2.0 feed of guides and prompts, newest first.
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const entries = [
    ...(await liveGuides()).map(({ data: d }) => ({ title: d.title, url: `/guides/${d.slug}/`, description: d.metaDescription, date: d.published })),
    ...(await allPrompts()).map((p) => ({ title: p.data.title, url: promptUrl(p), description: p.data.purpose, date: p.data.published })),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf() || a.title.localeCompare(b.title));
  const items = entries.map((e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${abs(e.url)}</link>
      <guid isPermaLink="true">${abs(e.url)}</guid>
      <description>${esc(e.description)}</description>
      <pubDate>${e.date.toUTCString()}</pubDate>
    </item>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}: prompts and tutorials</title>
    <link>${abs('/')}</link>
    <description>${esc(SITE_TAGLINE)}</description>
    <language>en</language>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
