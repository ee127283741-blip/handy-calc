// Exact conversions per the definition of the Fahrenheit scale (NIST):
// °C = (°F − 32) × 5/9. Gas Mark n (n ≥ 1) = 250 + 25n °F; ¼ = 225 °F, ½ = 250 °F.
export const fToC = (f: number) => ((f - 32) * 5) / 9;
export const cToF = (c: number) => (c * 9) / 5 + 32;

export function gasMarkToF(mark: number): number {
  if (mark === 0.25) return 225;
  if (mark === 0.5) return 250;
  if (mark >= 1 && mark <= 10) return 250 + 25 * mark;
  throw new RangeError('Gas Mark must be 1/4, 1/2 or 1–10');
}

/** Nearest Gas Mark for a Fahrenheit temperature, or null if outside 225–500 °F. */
export function fToGasMark(f: number): number | null {
  if (f < 213 || f > 512) return null;
  if (f < 238) return 0.25;
  if (f < 263) return 0.5;
  return Math.round((f - 250) / 25);
}

/** Conventional rounded Celsius used on UK recipes and ovens. */
export const GAS_MARK_TABLE = [
  { mark: '¼', f: 225, c: 110 },
  { mark: '½', f: 250, c: 120 },
  { mark: '1', f: 275, c: 140 },
  { mark: '2', f: 300, c: 150 },
  { mark: '3', f: 325, c: 170 },
  { mark: '4', f: 350, c: 180 },
  { mark: '5', f: 375, c: 190 },
  { mark: '6', f: 400, c: 200 },
  { mark: '7', f: 425, c: 220 },
  { mark: '8', f: 450, c: 230 },
  { mark: '9', f: 475, c: 240 },
];

/** Fan (convection) ovens: general rule of thumb is to reduce by 20 °C (about 25 °F). */
export const FAN_OFFSET_C = 20;
export const fanAdjustC = (c: number, offsetC = FAN_OFFSET_C) => c - offsetC;
