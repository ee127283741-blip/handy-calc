import { describe, expect, it } from 'vitest';
import { CATEGORIES, STYLES, STYLE_SPECS, contrast, generate, toPlainText, typeScale, type CategoryKey, type StyleKey } from './ideaToPrompt';

const cats = Object.keys(CATEGORIES) as CategoryKey[];
const styles = Object.keys(STYLES) as StyleKey[];
const REQUIRED: Record<CategoryKey, string[]> = {
  website: ['Colour palette', 'Typography', 'Spacing & layout', 'Radii & shadows', 'Page structure', 'Components', 'Motion', 'Accessibility'],
  landing: ['Colour palette', 'Typography', 'Spacing & layout', 'Page structure', 'Components', 'Motion', 'Accessibility'],
  app: ['Colour palette', 'Typography', 'Spacing & layout', 'Screens', 'Components', 'Motion', 'Accessibility'],
  brand: ['Colour palette', 'Typography', 'Brand system contents', 'Components'],
  image: ['Subject', 'Composition', 'Lens & camera', 'Lighting', 'Colour palette', 'Style references', 'Aspect ratio', 'Negative prompt'],
  video: ['Shot list', 'Camera moves', 'Transitions', 'Pacing', 'Audio'],
  camera: ['Shot list', 'Camera moves', 'Transitions', 'Pacing', 'Audio'],
  motion: ['Sequence', 'Timing & easing', 'Transitions', 'Pacing', 'Audio', 'Reduced motion'],
  copy: ['Audience', 'Voice', 'Structure', 'Length', 'Call to action'],
  social: ['Audience', 'Voice', 'Structure', 'Length', 'Call to action'],
};
const sections = (md: string) => [...md.matchAll(/^## (.+)\n([\s\S]*?)(?=\n## |\n?$)/gm)].map((m) => ({ title: m[1], body: m[2].trim() }));

describe('contrast', () => {
  it('matches known WCAG values', () => {
    expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrast('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
    expect(contrast('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2);
  });
  it.each(styles)('%s palette meets 4.5:1 for text, muted text and text on accent', (st) => {
    const p = STYLE_SPECS[st].palette;
    expect(contrast(p.text, p.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(p.text, p.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(p.muted, p.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(p.muted, p.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(p.accentContrast, p.accent)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('typeScale', () => {
  it('uses a 1.25 ratio from 16px', () => {
    expect(typeScale().map((t) => t.px)).toEqual([13, 16, 20, 25, 31, 39, 49, 61]);
  });
});

describe('generate', () => {
  const idea = 'a booking site for a tiny bakery';
  it.each(cats)('%s has its required sections, none empty, in every style', (c) => {
    for (const st of styles) {
      const md = generate({ idea, category: c, style: st });
      const got = sections(md);
      for (const r of [...REQUIRED[c], 'Idea', 'Audience & tone', 'Output format']) expect(got.map((s) => s.title), `${c}/${st}`).toContain(r);
      for (const s of got) expect(s.body.length, `${c}/${st}: ${s.title}`).toBeGreaterThan(10);
      expect(md).not.toMatch(/undefined|NaN|\[object/);
    }
  });
  it('is deterministic', () => {
    for (const c of cats) expect(generate({ idea, category: c, style: 'tech' })).toBe(generate({ idea, category: c, style: 'tech' }));
  });
  it('includes the idea, audience and tone', () => {
    const md = generate({ idea: '  a  booking site ', category: 'copy', style: 'minimal', audience: 'busy parents', tone: 'kind and brief' });
    expect(md).toContain('a booking site');
    expect(md).toContain('busy parents');
    expect(md).toContain('kind and brief');
  });
  it('puts the style palette hex codes into design prompts', () => {
    const md = generate({ idea, category: 'website', style: 'luxury' });
    for (const hex of Object.values(STYLE_SPECS.luxury.palette)) expect(md).toContain(hex);
    expect(md).toContain('prefers-reduced-motion');
  });
  it('falls back gracefully on an empty idea', () => {
    expect(generate({ idea: ' ', category: 'image', style: 'retro' })).toContain('## Idea\na project');
  });
  it('plain text strips Markdown headings', () => {
    expect(toPlainText(generate({ idea, category: 'social', style: 'playful' }))).not.toMatch(/^#/m);
  });
});
