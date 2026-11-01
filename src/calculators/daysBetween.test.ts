import { describe, expect, it } from 'vitest';
import { breakdown, businessDaysBetween, daysBetween, toDayNumber } from './daysBetween';

describe('days between dates', () => {
  it('counts simple spans', () => {
    expect(daysBetween('2026-01-01', '2026-12-31')).toBe(364);
    expect(daysBetween('2026-01-01', '2027-01-01')).toBe(365);
    expect(daysBetween('2024-01-01', '2025-01-01')).toBe(366); // leap year
    expect(daysBetween('2024-02-28', '2024-03-01')).toBe(2);
  });
  it('handles includeEnd and reversed order', () => {
    expect(daysBetween('2026-01-01', '2026-12-31', true)).toBe(365);
    expect(daysBetween('2026-03-10', '2026-03-01')).toBe(-9);
  });
  it('ignores DST transitions', () => {
    expect(daysBetween('2026-03-07', '2026-03-09')).toBe(2);
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
  });
  it('counts business days', () => {
    // Mon 2026-11-02 to Mon 2026-11-09: 5 weekdays
    expect(businessDaysBetween('2026-11-02', '2026-11-09')).toBe(5);
    expect(businessDaysBetween('2026-11-02', '2026-11-09', true)).toBe(6);
    expect(businessDaysBetween('2026-11-07', '2026-11-09')).toBe(0); // Sat to Mon
    expect(businessDaysBetween('2026-01-01', '2027-01-01')).toBe(261);
  });
  it('rejects invalid dates', () => {
    expect(toDayNumber('2026-02-30')).toBeNaN();
    expect(() => daysBetween('x', '2026-01-01')).toThrow();
  });
  it('breaks down into weeks', () => {
    expect(breakdown(364)).toEqual({ weeks: 52, days: 0 });
    expect(breakdown(-10)).toEqual({ weeks: 1, days: 3 });
  });
});
