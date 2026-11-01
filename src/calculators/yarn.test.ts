import { describe, expect, it } from 'vitest';
import { skeinsNeeded, yarnNeeded } from './yarn';

const base = { swatchWidth: 4, swatchHeight: 4, swatchYarn: 5, projectWidth: 4, projectHeight: 4, bufferPct: 0 };

describe('yarn estimator', () => {
  it('returns swatch yarn for same-size project', () => {
    expect(yarnNeeded(base)).toBe(5);
  });
  it('scales by area', () => {
    expect(yarnNeeded({ ...base, projectWidth: 8, projectHeight: 8 })).toBe(20);
    // 36 x 48 in baby blanket from a 4x4 in swatch of 5 g: 108 x 5 = 540 g
    expect(yarnNeeded({ ...base, projectWidth: 36, projectHeight: 48 })).toBe(540);
  });
  it('applies buffer', () => {
    expect(yarnNeeded({ ...base, projectWidth: 36, projectHeight: 48, bufferPct: 10 })).toBeCloseTo(594, 6);
  });
  it('rounds skeins up', () => {
    expect(skeinsNeeded(594, 100)).toBe(6);
    expect(skeinsNeeded(600, 100)).toBe(6);
    expect(skeinsNeeded(601, 100)).toBe(7);
  });
  it('rejects bad input', () => {
    expect(() => yarnNeeded({ ...base, swatchWidth: 0 })).toThrow();
    expect(() => skeinsNeeded(10, 0)).toThrow();
  });
});
