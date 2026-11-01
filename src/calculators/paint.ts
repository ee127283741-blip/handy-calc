// Paint needed = (wall area − openings) × coats ÷ coverage per unit.
export interface PaintInput {
  perimeter: number; // ft or m
  height: number; // ft or m
  doors: number;
  windows: number;
  coats: number;
  coverage: number; // sq ft per gallon or m² per litre
  unit: 'imperial' | 'metric';
}

// Typical opening sizes used for deductions.
export const DOOR_AREA = { imperial: 21, metric: 1.9 }; // 3 × 7 ft ≈ 0.9 × 2.1 m
export const WINDOW_AREA = { imperial: 15, metric: 1.4 }; // 3 × 5 ft ≈ 0.9 × 1.5 m
export const DEFAULT_COVERAGE = { imperial: 350, metric: 8.6 }; // 350 sq ft/gal ≈ 8.6 m²/L

export function paintableArea(i: PaintInput): number {
  const gross = i.perimeter * i.height;
  const openings = i.doors * DOOR_AREA[i.unit] + i.windows * WINDOW_AREA[i.unit];
  return Math.max(0, gross - openings);
}

/** Returns paint quantity in gallons (imperial) or litres (metric), unrounded. */
export function paintNeeded(i: PaintInput): number {
  if (i.coverage <= 0) throw new RangeError('Coverage must be positive');
  return (paintableArea(i) * i.coats) / i.coverage;
}

/** Round up to whole gallons or to a common 2.5 L can size. */
export function cansToBuy(amount: number, unit: 'imperial' | 'metric'): number {
  const step = unit === 'imperial' ? 1 : 2.5;
  return Math.ceil(amount / step - 1e-9) * step;
}
