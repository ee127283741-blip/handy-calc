import { describe, expect, it } from 'vitest';
import { INDUSTRIES, PRODUCT_TYPES } from '../site';
import { INDUSTRY_HUBS, TYPE_HUBS } from './hubs';

describe('hub copy', () => {
  it('exists for every industry and product type', () => {
    expect(Object.keys(INDUSTRY_HUBS).sort()).toEqual(INDUSTRIES.map((t) => t.slug).sort());
    expect(Object.keys(TYPE_HUBS).sort()).toEqual(PRODUCT_TYPES.map((t) => t.slug).sort());
  });
  it('contains no figures, and no two hubs share copy', () => {
    const all = [...Object.values(INDUSTRY_HUBS), ...Object.values(TYPE_HUBS)];
    for (const h of all) expect(`${h.phrase} ${h.overview} ${h.money}`.replace(/n8n/g, ''), h.phrase).not.toMatch(/\d|[$€£]/);
    expect(new Set(all.map((h) => h.money)).size).toBe(all.length);
  });
});
