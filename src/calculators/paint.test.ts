import { describe, expect, it } from 'vitest';
import { cansToBuy, paintNeeded, paintableArea, type PaintInput } from './paint';

const room: PaintInput = { perimeter: 48, height: 8, doors: 1, windows: 2, coats: 2, coverage: 350, unit: 'imperial' };

describe('paint calculator', () => {
  it('computes paintable area', () => {
    expect(paintableArea(room)).toBe(384 - 21 - 30);
    expect(paintableArea({ ...room, doors: 0, windows: 0 })).toBe(384);
  });
  it('computes gallons', () => {
    expect(paintNeeded(room)).toBeCloseTo(1.903, 3);
    expect(paintNeeded({ ...room, doors: 0, windows: 0, coats: 1, coverage: 384 })).toBe(1);
  });
  it('computes metric litres', () => {
    const m: PaintInput = { perimeter: 14, height: 2.4, doors: 1, windows: 1, coats: 2, coverage: 10, unit: 'metric' };
    expect(paintableArea(m)).toBeCloseTo(30.3, 5);
    expect(paintNeeded(m)).toBeCloseTo(6.06, 5);
  });
  it('never returns negative area', () => {
    expect(paintableArea({ ...room, perimeter: 1, doors: 5 })).toBe(0);
  });
  it('rounds up to purchasable sizes', () => {
    expect(cansToBuy(1.9, 'imperial')).toBe(2);
    expect(cansToBuy(2, 'imperial')).toBe(2);
    expect(cansToBuy(6.06, 'metric')).toBe(7.5);
  });
  it('rejects zero coverage', () => {
    expect(() => paintNeeded({ ...room, coverage: 0 })).toThrow();
  });
});
