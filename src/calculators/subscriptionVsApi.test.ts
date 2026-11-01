import { describe, expect, it } from 'vitest';
import { getModel, getPlan } from '../data/ai-pricing';
import { compareSubscription } from './subscriptionVsApi';

describe('subscription vs api', () => {
  const u = { messagesPerDay: 30, inputTokens: 1500, outputTokens: 600, daysPerMonth: 30, date: '2026-11-01' };
  it('compares Claude Pro with Sonnet', () => {
    const r = compareSubscription(getPlan('claude-pro'), getModel('claude-sonnet-5-5'), u);
    expect(r.perMessage).toBeCloseTo(0.009, 10);
    expect(r.apiMonthly).toBeCloseTo(8.1, 10);
    expect(r.breakEvenPerDay).toBeCloseTo(74.07, 2);
    expect(r.cheaper).toBe('api');
  });
  it('flags the plan as cheaper for heavy use', () => {
    const r = compareSubscription(getPlan('chatgpt-plus'), getModel('gpt-6-astra'), { ...u, messagesPerDay: 100 });
    expect(r.apiMonthly).toBeCloseTo(135, 10);
    expect(r.cheaper).toBe('plan');
  });
});
