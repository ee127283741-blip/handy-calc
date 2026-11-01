import { describe, expect, it } from 'vitest';
import { cupsToGrams, gramsToCups, parseAmount } from './cupsToGrams';

describe('cupsToGrams', () => {
  it('matches King Arthur chart values', () => {
    expect(cupsToGrams(1, 'ap-flour')).toBe(120);
    expect(cupsToGrams(1, 'granulated-sugar')).toBe(198);
    expect(cupsToGrams(1, 'brown-sugar')).toBe(213);
    expect(cupsToGrams(0.5, 'butter')).toBe(113);
    expect(cupsToGrams(0.5, 'cocoa')).toBe(42);
    expect(cupsToGrams(1 / 16, 'honey')).toBe(21);
  });
  it('scales linearly', () => {
    expect(cupsToGrams(2.5, 'ap-flour')).toBe(300);
  });
  it('converts grams back to cups', () => {
    expect(gramsToCups(240, 'ap-flour')).toBe(2);
    expect(gramsToCups(227, 'water')).toBe(1);
  });
  it('parses fractions', () => {
    expect(parseAmount('1 1/2')).toBe(1.5);
    expect(parseAmount('3/4')).toBe(0.75);
    expect(parseAmount('2')).toBe(2);
    expect(parseAmount('abc')).toBeNaN();
  });
  it('throws on unknown ingredient', () => {
    expect(() => cupsToGrams(1, 'nope')).toThrow();
  });
});
