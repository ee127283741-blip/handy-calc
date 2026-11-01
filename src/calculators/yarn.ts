// Swatch method: yarn scales with fabric area.
// project yarn = swatch yarn × (project area ÷ swatch area) × (1 + buffer)
export interface YarnInput {
  swatchWidth: number;
  swatchHeight: number;
  swatchYarn: number; // grams (or yards) used by the swatch
  projectWidth: number;
  projectHeight: number;
  bufferPct: number; // extra for seams, edging, gauge drift
}

export function yarnNeeded(i: YarnInput): number {
  const swatchArea = i.swatchWidth * i.swatchHeight;
  if (swatchArea <= 0) throw new RangeError('Swatch dimensions must be positive');
  const ratio = (i.projectWidth * i.projectHeight) / swatchArea;
  return i.swatchYarn * ratio * (1 + i.bufferPct / 100);
}

export function skeinsNeeded(total: number, perSkein: number): number {
  if (perSkein <= 0) throw new RangeError('Skein amount must be positive');
  return Math.ceil(total / perSkein - 1e-9);
}

/** Craft Yarn Council Standard Yarn Weight System, knit gauge in stockinette over 4 in. */
export const CYC_WEIGHTS = [
  { n: 0, name: 'Lace', examples: 'Fingering 10-count crochet thread', knitGauge: '33–40 sts', needle: '1.5–2.25 mm (US 000–1)' },
  { n: 1, name: 'Super Fine', examples: 'Sock, Fingering, Baby', knitGauge: '27–32 sts', needle: '2.25–3.25 mm (US 1–3)' },
  { n: 2, name: 'Fine', examples: 'Sport, Baby', knitGauge: '23–26 sts', needle: '3.25–3.75 mm (US 3–5)' },
  { n: 3, name: 'Light', examples: 'DK, Light Worsted', knitGauge: '21–24 sts', needle: '3.75–4.5 mm (US 5–7)' },
  { n: 4, name: 'Medium', examples: 'Worsted, Afghan, Aran', knitGauge: '16–20 sts', needle: '4.5–5.5 mm (US 7–9)' },
  { n: 5, name: 'Bulky', examples: 'Chunky, Craft, Rug', knitGauge: '12–15 sts', needle: '5.5–8 mm (US 9–11)' },
  { n: 6, name: 'Super Bulky', examples: 'Super Bulky, Roving', knitGauge: '7–11 sts', needle: '8–12.75 mm (US 11–17)' },
  { n: 7, name: 'Jumbo', examples: 'Jumbo, Roving', knitGauge: '6 sts and fewer', needle: '12.75 mm and larger (US 17+)' },
];
