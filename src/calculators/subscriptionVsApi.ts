import type { ApiModel, Plan } from '../data/ai-pricing';
import { costPerRequest } from './llmCost';

export interface ChatUsage { messagesPerDay: number; inputTokens: number; outputTokens: number; daysPerMonth: number; date: string }

/** Raw token cost only: plans include limits and features that APIs price separately or not at all. */
export function compareSubscription(plan: Plan, model: ApiModel, u: ChatUsage) {
  const perMessage = costPerRequest(model, u.inputTokens, u.outputTokens, u.date);
  const apiMonthly = perMessage * u.messagesPerDay * u.daysPerMonth;
  const breakEvenPerDay = perMessage > 0 ? plan.monthlyUSD / (perMessage * u.daysPerMonth) : Infinity;
  return { perMessage, apiMonthly, planMonthly: plan.monthlyUSD, breakEvenPerDay, cheaper: apiMonthly < plan.monthlyUSD ? 'api' : 'plan' as const };
}
