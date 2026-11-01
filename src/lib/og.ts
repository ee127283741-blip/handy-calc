import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Text-only Open Graph card (1200x630), rendered at build time. No photos or AI images.
const require = createRequire(import.meta.url);
const font = (w: 400 | 700) => readFileSync(require.resolve(`@fontsource/inter/files/inter-latin-${w}-normal.woff`));
const fonts = [
  { name: 'Inter', data: font(400), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: font(700), weight: 700 as const, style: 'normal' as const },
];
export const OG_SIZE = { width: 1200, height: 630 };

type Node = { type: string; props: { style?: Record<string, unknown>; children?: (Node | string)[] | Node | string } };
const el = (type: string, style: Record<string, unknown>, children?: Node['props']['children']): Node => ({ type, props: { style, children } });

export async function ogPng({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const tree = el('div', { width: 1200, height: 630, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: '#0B3B5C', color: '#fff', fontFamily: 'Inter' }, [
    el('div', { display: 'flex', width: 1040, fontSize: 28, color: '#9CC7E4', textTransform: 'uppercase', letterSpacing: 2 }, eyebrow),
    el('div', { display: 'flex', width: 1040, fontSize: title.length > 48 ? 62 : 74, fontWeight: 700, lineHeight: 1.15 }, title),
    el('div', { display: 'flex', width: 1040, fontSize: 28, color: '#D6E6F2', borderTop: '2px solid #2E6A92', paddingTop: 28 }, footer),
  ]);
  const svg = await satori(tree as Parameters<typeof satori>[0], { ...OG_SIZE, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_SIZE.width } }).render().asPng();
}
