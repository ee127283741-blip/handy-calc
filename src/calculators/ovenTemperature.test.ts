import { describe, expect, it } from 'vitest';
import { cToF, fToC, fToGasMark, gasMarkToF } from './ovenTemperature';

describe('oven temperature', () => {
  it('converts Fahrenheit to Celsius', () => {
    expect(fToC(32)).toBe(0);
    expect(fToC(212)).toBe(100);
    expect(fToC(350)).toBeCloseTo(176.67, 2);
    expect(fToC(-40)).toBe(-40);
  });
  it('converts Celsius to Fahrenheit', () => {
    expect(cToF(180)).toBe(356);
    expect(cToF(200)).toBe(392);
    expect(cToF(100)).toBe(212);
  });
  it('maps Gas Marks to Fahrenheit', () => {
    expect(gasMarkToF(1)).toBe(275);
    expect(gasMarkToF(4)).toBe(350);
    expect(gasMarkToF(9)).toBe(475);
    expect(gasMarkToF(0.25)).toBe(225);
    expect(() => gasMarkToF(11)).toThrow();
  });
  it('finds nearest Gas Mark', () => {
    expect(fToGasMark(350)).toBe(4);
    expect(fToGasMark(400)).toBe(6);
    expect(fToGasMark(250)).toBe(0.5);
    expect(fToGasMark(100)).toBeNull();
  });
});
