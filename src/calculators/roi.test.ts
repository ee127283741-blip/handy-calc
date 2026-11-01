import { describe, expect, it } from 'vitest';
import { roi } from './roi';

describe('ai roi', () => {
  const base = { employees: 10, hoursSavedPerWeek: 1, hourlyCost: 40, adoptionPct: 50, seatCostPerMonth: 25, setupCost: 1000 };
  it('computes the default scenario', () => {
    const r = roi(base);
    expect(r.activeUsers).toBe(5);
    expect(r.hoursSaved).toBeCloseTo(21.667, 3);
    expect(r.value).toBeCloseTo(866.67, 2);
    expect(r.toolCost).toBe(250);
    expect(r.net).toBeCloseTo(616.67, 2);
    expect(r.roiPct).toBeCloseTo(160, 6);
    expect(r.paybackMonths).toBeCloseTo(1.62, 2);
  });
  it('never pays back when net is negative', () => {
    const r = roi({ ...base, adoptionPct: 10 });
    expect(r.net).toBeLessThan(0);
    expect(r.paybackMonths).toBe(Infinity);
    expect(r.roiPct).toBeLessThan(0);
  });
  it('pays back immediately with no setup cost', () => {
    expect(roi({ ...base, setupCost: 0 }).paybackMonths).toBe(0);
  });
});
