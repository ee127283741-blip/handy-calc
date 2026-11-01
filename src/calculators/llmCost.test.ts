import { describe, expect, it } from 'vitest';
import { API_MODELS, getModel, nextChange, priceOn } from '../data/ai-pricing';
import { compareModels, costPerRequest, monthlyCost, wordsToTokens } from './llmCost';

describe('ai-pricing', () => {
  it('every entry is complete and dated', () => {
    for (const m of API_MODELS) {
      expect(m.inputPerM, m.id).toBeGreaterThan(0);
      expect(m.outputPerM, m.id).toBeGreaterThan(0);
      expect(m.sourceUrl).toMatch(/^https:\/\//);
      expect(m.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
  it('priceOn follows the schedule', () => {
    const argon = getModel('gemini-4-argon');
    expect(priceOn(argon, '2026-11-30')).toEqual({ inputPerM: 2, outputPerM: 10 });
    expect(priceOn(argon, '2026-12-01')).toEqual({ inputPerM: 4, outputPerM: 20 });
    const flash = getModel('gemini-3.8-flash');
    expect(priceOn(flash, '2026-12-31')).toEqual({ inputPerM: 0.75, outputPerM: 3.75 });
    expect(priceOn(flash, '2027-01-01')).toEqual({ inputPerM: 1.5, outputPerM: 7.5 });
    expect(nextChange(argon, '2026-11-01')?.from).toBe('2026-12-01');
    expect(nextChange(argon, '2026-12-01')).toBeUndefined();
  });
});

describe('llm cost', () => {
  const d = '2026-11-01';
  it('converts words to tokens', () => {
    expect(wordsToTokens(750)).toBe(1000);
    expect(wordsToTokens(300, 0.6)).toBe(500);
  });
  it('prices one request', () => {
    expect(costPerRequest(getModel('gpt-6.1-sol'), 1000, 500, d)).toBeCloseTo(0.007, 10);
    expect(costPerRequest(getModel('claude-opus-5-5'), 1_000_000, 0, d)).toBe(4);
    expect(costPerRequest(getModel('gemini-4-argon'), 1000, 500, '2026-12-01')).toBeCloseTo(0.014, 10);
  });
  it('uses Haiku long-prompt pricing above 100K input tokens', () => {
    const h = getModel('claude-haiku-5-5');
    expect(costPerRequest(h, 100_000, 1000, d)).toBeCloseTo(0.0105, 10);
    expect(costPerRequest(h, 200_000, 1000, d)).toBeCloseTo(0.1025, 10);
  });
  it('scales to a month and sorts the comparison', () => {
    const u = { inputTokens: 1000, outputTokens: 500, requestsPerDay: 100, daysPerMonth: 30, date: d };
    expect(monthlyCost(getModel('gpt-6.1-sol'), u)).toBeCloseTo(21, 10);
    const rows = compareModels(u);
    expect(rows).toHaveLength(API_MODELS.length);
    expect(rows[0].model.id).toBe('gpt-6-luna');
    expect(rows.at(-1)!.monthly).toBeCloseTo(105, 10);
  });
});
