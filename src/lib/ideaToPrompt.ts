// Idea → Prompt: expands a short idea into a detailed spec prompt using fixed rules and templates.
// Pure and deterministic: the same input always gives the same output. No network, no AI calls.

export const CATEGORIES = {
  website: 'Website',
  landing: 'Landing page',
  app: 'Mobile app UI',
  brand: 'Brand identity',
  image: 'Image generation',
  video: 'Video',
  camera: 'Camera moves',
  motion: 'Motion / animation',
  copy: 'Copywriting',
  social: 'Social post',
} as const;
export const STYLES = {
  minimal: 'Minimal',
  luxury: 'Luxury',
  tech: 'Tech',
  playful: 'Playful',
  editorial: 'Editorial',
  brutalist: 'Brutalist',
  organic: 'Organic',
  corporate: 'Corporate',
  retro: 'Retro',
} as const;
export type CategoryKey = keyof typeof CATEGORIES;
export type StyleKey = keyof typeof STYLES;

export interface Input { idea: string; category: CategoryKey; style: StyleKey; audience?: string; tone?: string }

export interface Palette { bg: string; surface: string; text: string; muted: string; accent: string; accentContrast: string }

interface Style {
  palette: Palette;
  fonts: { heading: string; body: string; mono?: string };
  radius: [number, number, number];
  shadow: string;
  tone: string;
  motion: { feel: string; ease: string; fast: number; base: number; slow: number };
  image: { light: string; lens: string; colours: string; refs: string };
  pacing: string;
  copy: string;
}

export const STYLE_SPECS: Record<StyleKey, Style> = {
  minimal: {
    palette: { bg: '#FAFAF9', surface: '#FFFFFF', text: '#1C1917', muted: '#57534E', accent: '#2563EB', accentContrast: '#FFFFFF' },
    fonts: { heading: 'Inter (600)', body: 'Inter (400)' },
    radius: [4, 8, 12], shadow: '0 1px 2px rgba(0,0,0,.06), 0 1px 1px rgba(0,0,0,.04)',
    tone: 'calm, clear and confident; short sentences, no hype',
    motion: { feel: 'subtle fades and short slides', ease: 'cubic-bezier(0.2, 0, 0, 1)', fast: 120, base: 200, slow: 320 },
    image: { light: 'soft diffused daylight from a large window, gentle shadows', lens: '50mm, f/4', colours: 'off-white, warm grey and one muted accent', refs: 'Scandinavian product photography, Swiss graphic design' },
    pacing: 'unhurried; let shots breathe for 3–4 s', copy: 'plain words, one idea per sentence',
  },
  luxury: {
    palette: { bg: '#0F0D0B', surface: '#1A1714', text: '#F5EFE6', muted: '#B8AD9E', accent: '#C9A45C', accentContrast: '#0F0D0B' },
    fonts: { heading: 'Cormorant Garamond (500)', body: 'Jost (400)' },
    radius: [0, 2, 4], shadow: '0 24px 48px -12px rgba(0,0,0,.45)',
    tone: 'refined, understated and assured; few words, chosen carefully',
    motion: { feel: 'slow, graceful reveals and long cross-fades', ease: 'cubic-bezier(0.22, 1, 0.36, 1)', fast: 200, base: 400, slow: 700 },
    image: { light: 'low-key light with a single soft key and deep falloff, warm rim light', lens: '85mm, f/2', colours: 'black, warm ivory and brushed gold', refs: 'high-end fashion and jewellery campaigns, still-life chiaroscuro' },
    pacing: 'slow and deliberate; 4–6 s shots, slow-motion details', copy: 'elegant, sensory and restrained; never shouty',
  },
  tech: {
    palette: { bg: '#0B1020', surface: '#121A2E', text: '#E6EAF2', muted: '#9AA4B8', accent: '#22D3EE', accentContrast: '#0B1020' },
    fonts: { heading: 'Space Grotesk (600)', body: 'IBM Plex Sans (400)', mono: 'JetBrains Mono (400)' },
    radius: [6, 10, 16], shadow: '0 0 0 1px rgba(255,255,255,.06), 0 8px 24px rgba(0,0,0,.4)',
    tone: 'precise, technical and direct; concrete numbers over adjectives',
    motion: { feel: 'crisp, snappy transitions with small scale and opacity changes', ease: 'cubic-bezier(0.4, 0, 0.2, 1)', fast: 100, base: 180, slow: 280 },
    image: { light: 'cool key light with cyan and violet edge lights, clean reflections', lens: '35mm, f/2.8', colours: 'deep navy, electric cyan and soft violet', refs: 'product renders in the style of modern hardware launches, isometric tech illustration' },
    pacing: 'fast and rhythmic; 1.5–2.5 s shots cut on the beat', copy: 'specific and benefit-led; numbers, verbs, no buzzwords',
  },
  playful: {
    palette: { bg: '#FFF8EE', surface: '#FFFFFF', text: '#2B1D3A', muted: '#5E4E6E', accent: '#7C3AED', accentContrast: '#FFFFFF' },
    fonts: { heading: 'Fredoka (600)', body: 'Nunito (400)' },
    radius: [10, 16, 28], shadow: '0 4px 0 rgba(43,29,58,.12)',
    tone: 'warm, upbeat and friendly; light humour, never sarcastic',
    motion: { feel: 'bouncy springs and gentle overshoot', ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fast: 150, base: 260, slow: 420 },
    image: { light: 'bright, even high-key light with soft coloured shadows', lens: '35mm, f/5.6', colours: 'candy pastels with one saturated pop colour', refs: 'flat vector illustration, claymation-style 3D, children\'s picture-book colour' },
    pacing: 'lively; quick cuts with playful pauses before reveals', copy: 'conversational and energetic; short punchy lines',
  },
  editorial: {
    palette: { bg: '#F7F4EE', surface: '#FFFFFF', text: '#161616', muted: '#5A5650', accent: '#B42318', accentContrast: '#FFFFFF' },
    fonts: { heading: 'Fraunces (600)', body: 'Source Serif 4 (400)' },
    radius: [0, 0, 2], shadow: 'none; separate with 1px rules instead',
    tone: 'thoughtful, articulate and curious; strong headlines, generous detail',
    motion: { feel: 'restrained fades; motion only where it aids reading', ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fast: 150, base: 240, slow: 360 },
    image: { light: 'natural documentary light, slightly overcast', lens: '35mm, f/2.8', colours: 'muted naturals with a single red accent', refs: 'magazine documentary photography, print-era photojournalism' },
    pacing: 'considered; documentary rhythm with lingering wide shots', copy: 'narrative and precise; lead with the most interesting fact',
  },
  brutalist: {
    palette: { bg: '#FFFFFF', surface: '#F2F2F2', text: '#000000', muted: '#3D3D3D', accent: '#FF4F00', accentContrast: '#000000' },
    fonts: { heading: 'Archivo Black (400)', body: 'IBM Plex Mono (400)' },
    radius: [0, 0, 0], shadow: '6px 6px 0 #000000 (hard offset, no blur)',
    tone: 'blunt, bold and honest; statements, not suggestions',
    motion: { feel: 'instant cuts and hard steps; no easing flourishes', ease: 'steps(4, end) or linear', fast: 0, base: 120, slow: 200 },
    image: { light: 'harsh direct flash, hard shadows', lens: '28mm, f/8', colours: 'black, white and one safety-orange accent', refs: 'raw concrete architecture, photocopied zine aesthetics, Swiss poster grids' },
    pacing: 'abrupt; hard cuts, jump cuts and freeze frames', copy: 'terse and declarative; all-caps labels, no fluff',
  },
  organic: {
    palette: { bg: '#F4F1EA', surface: '#FBFAF6', text: '#22301F', muted: '#56604F', accent: '#3F6B3A', accentContrast: '#FFFFFF' },
    fonts: { heading: 'Young Serif (400)', body: 'Work Sans (400)' },
    radius: [8, 14, 24], shadow: '0 2px 8px rgba(34,48,31,.08)',
    tone: 'gentle, grounded and sincere; sensory words, no greenwashing',
    motion: { feel: 'soft, flowing eases like leaves settling', ease: 'cubic-bezier(0.37, 0, 0.63, 1)', fast: 160, base: 280, slow: 480 },
    image: { light: 'golden-hour sunlight with dappled shadows', lens: '50mm, f/2.8', colours: 'sage, clay, oat and moss', refs: 'natural-material still life, botanical illustration, slow-living lifestyle photography' },
    pacing: 'calm and flowing; dissolves and natural sound', copy: 'warm and honest; concrete details about materials and people',
  },
  corporate: {
    palette: { bg: '#FFFFFF', surface: '#F5F7FA', text: '#0F172A', muted: '#475569', accent: '#0B5CAD', accentContrast: '#FFFFFF' },
    fonts: { heading: 'IBM Plex Sans (600)', body: 'IBM Plex Sans (400)' },
    radius: [4, 6, 8], shadow: '0 1px 3px rgba(15,23,42,.08), 0 1px 2px rgba(15,23,42,.06)',
    tone: 'professional, reassuring and clear; evidence before claims',
    motion: { feel: 'quiet, functional transitions', ease: 'cubic-bezier(0.4, 0, 0.2, 1)', fast: 120, base: 200, slow: 300 },
    image: { light: 'bright, clean office light with soft fill', lens: '50mm, f/4', colours: 'white, slate and trustworthy blue', refs: 'annual-report photography, clean infographic style' },
    pacing: 'steady; 3 s shots, clear titles and lower thirds', copy: 'clear and credible; outcomes, proof points and plain English',
  },
  retro: {
    palette: { bg: '#F3E9D2', surface: '#FFF7E6', text: '#2E1F14', muted: '#5C4532', accent: '#B5462C', accentContrast: '#FFFFFF' },
    fonts: { heading: 'Bricolage Grotesque (700)', body: 'DM Sans (400)', mono: 'Space Mono (400)' },
    radius: [6, 12, 20], shadow: '3px 3px 0 #2E1F14',
    tone: 'nostalgic, warm and witty; a wink, not a costume',
    motion: { feel: 'film-like wipes, slight jitter and grain', ease: 'cubic-bezier(0.65, 0, 0.35, 1)', fast: 150, base: 250, slow: 400 },
    image: { light: 'warm tungsten light with gentle film halation', lens: '40mm, f/4, film grain', colours: 'mustard, burnt orange, teal and cream', refs: '1970s print advertising, vintage travel posters, analogue film stock look' },
    pacing: 'groovy; match cuts, split screens and freeze-frame titles', copy: 'playful and confident; vintage-ad headlines with modern clarity',
  },
};

// WCAG 2.x relative luminance and contrast ratio.
function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
const ratio = (a: string, b: string) => `${contrast(a, b).toFixed(1)}:1`;

/** Type scale from a 16px base with a 1.25 ratio, rounded to whole pixels. */
export function typeScale(base = 16, r = 1.25) {
  const names = ['caption', 'body', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1'];
  return names.map((name, i) => ({ name, px: Math.round(base * r ** (i - 1)) }));
}

const DESIGN = {
  website: {
    role: 'a senior web designer and front-end developer',
    deliverable: 'a complete, responsive multi-page website design',
    structure: ['Header: logo, 4–5 nav links, one primary button', 'Hero: headline (max 10 words), one-sentence subhead, primary and secondary button, supporting visual', 'Value propositions: 3 short benefit blocks with icons', 'Features or services: 3–6 cards with title, 2-line description and link', 'Social proof: 3 testimonials or a logo row with real names and roles', 'About / story: short paragraph and photo', 'FAQ: 5–6 questions in an accessible accordion', 'Footer: contact details, secondary nav, legal links'],
    components: ['Buttons (primary, secondary, ghost) with all states', 'Navigation bar with mobile menu', 'Cards', 'Accordion', 'Form inputs with labels, help text and error messages', 'Footer'],
  },
  landing: {
    role: 'a conversion-focused landing page designer and copywriter',
    deliverable: 'a single long-scroll landing page with one goal',
    structure: ['Hero: outcome-led headline, subhead, single primary CTA above the fold, trust line under the button', 'Problem: the pain in the visitor\'s own words (3 bullets)', 'Solution: how the offer solves it, with a product visual', 'Benefits: 3–4 benefits, each with a proof point', 'How it works: 3 numbered steps', 'Testimonials: 2–3 quotes with names, roles and photos', 'Offer / pricing: what they get, price, guarantee', 'FAQ: objections answered in 5 questions', 'Final CTA: restate the outcome and repeat the button'],
    components: ['Primary CTA button (repeated, identical label)', 'Benefit cards', 'Step list', 'Testimonial cards', 'Pricing card', 'Accordion', 'Sticky mobile CTA bar'],
  },
  app: {
    role: 'a senior mobile product designer (iOS and Android)',
    deliverable: 'high-fidelity mobile app screens at 390×844 pt',
    structure: ['Onboarding: 3 screens max, skip option, permission requests explained before the system prompt', 'Home: the one thing users come back for, visible without scrolling', 'List / browse: search, filters, empty state', 'Detail: key info first, primary action in thumb reach', 'Create / edit flow: one task per screen, progress indicator, save draft', 'Settings & profile: account, notifications, privacy, help', 'States: loading skeletons, empty, error, offline'],
    components: ['Bottom tab bar (3–5 tabs)', 'Top app bar', 'Primary and secondary buttons', 'List rows', 'Cards', 'Bottom sheet', 'Text fields', 'Toggles and segmented controls', 'Toasts / snackbars'],
  },
  brand: {
    role: 'a brand identity designer',
    deliverable: 'a compact brand identity system and one-page brand guide',
    structure: ['Brand core: purpose, promise, 3 personality traits, what the brand is not', 'Logo: 3 distinct concepts (wordmark, symbol + wordmark, monogram) with rationale', 'Logo rules: clear space, minimum size (24px / 10mm), mono and reversed versions', 'Colour system: the palette below with usage ratios (60/30/10)', 'Typography: the pairing below with hierarchy examples', 'Iconography & graphic elements: line weight, corner style, pattern', 'Imagery: photo style, crop and colour treatment', 'Voice: 3 do / don\'t pairs with example sentences', 'Applications: business card, social avatar, website header, packaging or signage'],
    components: ['Primary logo', 'Secondary logo', 'Favicon / app icon', 'Colour swatches with hex, RGB and usage', 'Type specimen', 'Example layouts'],
  },
} as const;

const IMAGE_COMPOSITION: Record<StyleKey, string> = {
  minimal: 'centred subject with generous negative space, rule of thirds, clean horizon',
  luxury: 'low angle, tight crop on texture and detail, subject isolated against darkness',
  tech: 'three-quarter hero angle, symmetrical framing, subject floating with subtle reflection',
  playful: 'slightly tilted dynamic angle, subject filling the frame, props arranged in a loose circle',
  editorial: 'environmental portrait framing, subject off-centre with context around them',
  brutalist: 'flat frontal view, hard crop, strong graphic shapes and diagonals',
  organic: 'overhead or eye-level, natural arrangement, foreground leaves softly out of focus',
  corporate: 'eye-level, clean background, subject on the left third leaving room for text',
  retro: 'centred poster-like framing, slight vignette, bold horizon line',
};

const sec = (title: string, body: string | string[]) => `## ${title}\n${Array.isArray(body) ? body.map((l) => `- ${l}`).join('\n') : body}`;

function designSections(cat: keyof typeof DESIGN, s: Style): string[] {
  const p = s.palette;
  const d = DESIGN[cat];
  const scale = typeScale();
  const [rs, rm, rl] = s.radius;
  return [
    sec('Colour palette', [
      `Background (bg): ${p.bg}`,
      `Surface (cards, panels): ${p.surface}`,
      `Text (primary): ${p.text} — contrast on bg ${ratio(p.text, p.bg)}`,
      `Muted text (secondary): ${p.muted} — contrast on bg ${ratio(p.muted, p.bg)}`,
      `Accent (buttons, links, highlights): ${p.accent}`,
      `Accent contrast (text on accent): ${p.accentContrast} — contrast ${ratio(p.accentContrast, p.accent)}`,
      'Use the accent sparingly (about 10% of the screen); never put muted text on the accent colour.',
    ]),
    sec('Typography', [
      `Headings: ${s.fonts.heading}; body: ${s.fonts.body}${s.fonts.mono ? `; code and data: ${s.fonts.mono}` : ''}`,
      `Type scale (base 16px, ratio 1.25): ${scale.map((t) => `${t.name} ${t.px}px`).join(', ')}`,
      'Line height: 1.5 for body, 1.15–1.25 for headings; body line length 60–75 characters',
      'Never set body text below 16px on mobile',
    ]),
    sec('Spacing & layout', [
      'Spacing scale on a 4/8pt grid: 4, 8, 12, 16, 24, 32, 48, 64, 96px',
      cat === 'app' ? '4-column grid, 16px side margins, 8px gutters; touch targets at least 44×44pt' : '12-column grid, max content width 1200px, 24px gutters; 16px side margins on mobile',
      'Section spacing: 96px desktop, 64px mobile; related items 8–16px apart, groups 32–48px apart',
    ]),
    sec('Radii & shadows', [`Radius: small ${rs}px (inputs, tags), medium ${rm}px (buttons, cards), large ${rl}px (modals, sheets)`, `Shadow: ${s.shadow}`]),
    sec(cat === 'app' ? 'Screens' : cat === 'brand' ? 'Brand system contents' : 'Page structure', [...d.structure]),
    sec('Components', [...d.components, 'Show every interactive component in default, hover, focus, active, disabled and loading states']),
    sec('Motion', [
      `Feel: ${s.motion.feel}`,
      `Durations: ${s.motion.fast}ms (hover, toggles), ${s.motion.base}ms (menus, cards), ${s.motion.slow}ms (page and modal transitions)`,
      `Easing: ${s.motion.ease}`,
      'Animate only opacity and transform; no layout-shifting animation',
      'Respect prefers-reduced-motion: replace movement with instant changes or simple fades',
    ]),
    sec('Accessibility', [
      'Meet WCAG 2.2 AA: text contrast at least 4.5:1, large text and UI components at least 3:1',
      'Visible focus ring on every interactive element (2px, accent colour, 2px offset)',
      'Semantic structure: one H1, ordered headings, labelled form fields, alt text for meaningful images',
      'Full keyboard support; never rely on colour alone to convey meaning',
    ]),
  ];
}

function imageSections(idea: string, style: StyleKey, s: Style): string[] {
  return [
    sec('Subject', `${idea}. Describe the main subject first, with specific materials, textures and one clear focal point.`),
    sec('Composition', IMAGE_COMPOSITION[style]),
    sec('Lens & camera', `${s.image.lens}; sharp focus on the subject, natural depth of field`),
    sec('Lighting', s.image.light),
    sec('Colour palette', `${s.image.colours} (anchor colours: ${s.palette.bg}, ${s.palette.text}, ${s.palette.accent})`),
    sec('Style references', `${s.image.refs}. Do not imitate any living artist.`),
    sec('Aspect ratio', '16:9 for headers and slides, 4:5 for social feeds, 1:1 for thumbnails; generate the 16:9 first'),
    sec('Negative prompt', 'blurry, low resolution, extra fingers, distorted hands, warped text, watermark, logo, signature, oversaturated, plastic skin, cluttered background, cropped subject'),
  ];
}

function timeSections(cat: 'video' | 'camera' | 'motion', s: Style): string[] {
  const m = s.motion;
  if (cat === 'motion') {
    return [
      sec('Sequence', ['0–300ms: elements enter (fade + 12px rise), staggered 40–60ms apart', '300–900ms: the key element performs its main action', '900–1400ms: settle and hold the final state', 'Loop or end state: define clearly; loops must be seamless']),
      sec('Timing & easing', [`Feel: ${m.feel}`, `Durations: micro ${m.fast}ms, standard ${m.base}ms, emphasis ${m.slow}ms`, `Easing: ${m.ease}; exits 20–30% faster than entrances`]),
      sec('Transitions', ['Shared-element transitions between states where possible', 'Animate transform and opacity only; keep to 60fps', 'No more than 2 things moving at once']),
      sec('Pacing', s.pacing),
      sec('Audio', 'Optional UI sounds under 200ms, soft and low in the mix; the animation must work fully muted'),
      sec('Reduced motion', 'With prefers-reduced-motion, replace movement with an instant change or a 150ms cross-fade; never autoplay loops'),
      sec('Deliverable', 'Output a timeline table (element, property, from, to, start ms, duration ms, easing) and CSS or Lottie-ready keyframes'),
    ];
  }
  const shots = cat === 'video'
    ? ['Shot 1 (0–3s): hook — the most striking image of the idea, wide', 'Shot 2 (3–7s): context — where and who, medium shot', 'Shot 3 (7–12s): detail — close-up on the key object or action', 'Shot 4 (12–18s): the change or benefit happening', 'Shot 5 (18–24s): human reaction, close-up', 'Shot 6 (24–30s): closing wide shot with title and call to action']
    : ['Shot 1 (0–4s): establishing — slow push-in from wide to medium', 'Shot 2 (4–8s): orbit 90° around the subject at eye level', 'Shot 3 (8–12s): crane up from detail to reveal the environment', 'Shot 4 (12–16s): tracking shot alongside the moving subject', 'Shot 5 (16–20s): slow dolly-out to a final wide hero frame'];
  return [
    sec('Shot list', shots),
    sec('Camera moves', [
      'Name each move explicitly: push-in, pull-out, dolly, truck, pedestal, orbit, crane, tilt, pan, handheld',
      `Speed: ${cat === 'camera' ? 'slow and constant, about 0.3 m/s; ease in and out over the first and last 0.5s' : 'mostly locked-off with motivated moves; one hero move per scene'}`,
      `Lens: ${s.image.lens.split(',')[0]} as the base; wide 24mm for establishing shots`,
      'Keep the subject in the same screen third across cuts to avoid jumps',
    ]),
    sec('Look', `${s.image.light}; colour: ${s.image.colours}`),
    sec('Transitions', ['Default: straight cuts', `Style accent: ${s.motion.feel}`, 'Use one transition type consistently; no random wipes']),
    sec('Pacing', s.pacing),
    sec('Audio', ['Music: tempo matched to the pacing above; cut on the beat', 'Sound design: natural ambience plus 2–3 accent sounds on key moments', 'Voice-over or captions: one short line per shot; burn in captions for silent autoplay']),
    sec('Deliverable', 'Output a shot table (shot, duration, framing, camera move, action, audio) and one text-to-video prompt per shot'),
  ];
}

function copySections(cat: 'copy' | 'social', s: Style, audience: string, tone: string): string[] {
  return [
    sec('Audience', `${audience}. State what they want, what they worry about and what they already know.`),
    sec('Voice', [`Tone: ${tone}`, `Style: ${s.copy}`, 'Use "you" more than "we"; plain words over jargon']),
    sec('Structure', cat === 'social'
      ? ['Hook (first line, under 12 words) that stops the scroll', 'Body: 3–5 short lines with one concrete detail or number', 'Payoff: the takeaway in one sentence', 'Call to action', '3–5 relevant hashtags at the end, never mid-sentence']
      : ['Headline: the outcome, in under 10 words', 'Subhead: who it is for and how it works, one sentence', 'Problem → solution → proof (PAS), one short paragraph each', '3 benefit bullets that start with a verb', 'Objection handling: answer the top 2 doubts', 'Call to action with a reason to act now']),
    sec('Length', cat === 'social' ? 'Main version under 150 words; also give a 40-word version and a 280-character version' : 'Main version 150–250 words; also give a 50-word short version and 3 alternative headlines'),
    sec('Call to action', 'One clear action with a specific verb (e.g. "Book a free call", "Get the checklist"); no more than one CTA per piece'),
    sec('Avoid', 'Clichés ("game-changer", "unlock", "elevate"), exaggerated claims, invented statistics or testimonials, and more than one exclamation mark'),
  ];
}

/** Expands an idea into a detailed Markdown prompt. */
export function generate(input: Input): string {
  const idea = input.idea.trim().replace(/\s+/g, ' ') || 'a project you describe in one sentence';
  const s = STYLE_SPECS[input.style];
  const audience = input.audience?.trim() || 'the people most likely to need this, described as specifically as possible';
  const tone = input.tone?.trim() || s.tone;
  const c = input.category;
  const what = CATEGORIES[c].toLowerCase();
  const style = STYLES[input.style].toLowerCase();
  const design = c in DESIGN ? DESIGN[c as keyof typeof DESIGN] : undefined;
  const role = design ? design.role
    : c === 'image' ? 'an expert image-generation prompt writer and art director'
    : c === 'copy' || c === 'social' ? 'a senior copywriter'
    : c === 'motion' ? 'a senior motion designer'
    : 'an experienced director and video editor';
  const head = [
    `# ${CATEGORIES[c]} prompt: ${idea}`,
    `Act as ${role}. Create ${design ? design.deliverable : `a ${what} plan`} for the idea below, in a ${style} style. Follow every section of this brief; where it leaves a choice open, make the decision and state it.`,
    sec('Idea', idea),
    sec('Audience & tone', [`Audience: ${audience}`, `Tone: ${tone}`]),
  ];
  const body = c === 'image' ? imageSections(idea, input.style, s)
    : c === 'copy' || c === 'social' ? copySections(c, s, audience, tone)
    : c === 'video' || c === 'camera' || c === 'motion' ? timeSections(c, s)
    : designSections(c, s);
  const tail = sec('Output format', [
    'Start with a 2-sentence summary of your approach',
    'Then deliver the work section by section, using the headings above',
    'End with 3 questions you would ask the client before the next round',
  ]);
  return [...head, ...body, tail].join('\n\n') + '\n';
}

/** Plain-text version for pasting into chat tools that do not render Markdown. */
export const toPlainText = (md: string) => md.replace(/^#{1,6} /gm, '').replace(/\*\*/g, '');

export const EXAMPLES: Input[] = [
  { idea: 'a booking site for a small dog-grooming salon', category: 'website', style: 'playful' },
  { idea: 'a waitlist page for a budgeting app for freelancers', category: 'landing', style: 'tech' },
  { idea: 'a habit tracker that feels calm, not naggy', category: 'app', style: 'minimal' },
  { idea: 'a natural skincare brand made from olive oil', category: 'brand', style: 'organic' },
  { idea: 'a perfume bottle on wet black stone', category: 'image', style: 'luxury' },
  { idea: 'a 30-second launch video for a coffee subscription', category: 'video', style: 'retro' },
];
