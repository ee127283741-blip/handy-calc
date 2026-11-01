import { API_MODELS, priceOn, type ApiModel } from '../data/ai-pricing';

/** Rough English average; editable in the UI. */
export const DEFAULT_WORDS_PER_TOKEN = 0.75;

export const wordsToTokens = (words: number, wordsPerToken = DEFAULT_WORDS_PER_TOKEN) => Math.round(words / wordsPerToken);

/** USD for one request on `date`, using the long-prompt price when the input exceeds its threshold. */
export function costPerRequest(model: ApiModel, inputTokens: number, outputTokens: number, date: string): number {
  const lp = model.longPrompt;
  const p = lp && inputTokens > lp.overTokens ? lp : priceOn(model, date);
  return (inputTokens * p.inputPerM + outputTokens * p.outputPerM) / 1_000_000;
}

export interface Usage { inputTokens: number; outputTokens: number; requestsPerDay: number; daysPerMonth: number; date: string }

export const monthlyCost = (model: ApiModel, u: Usage) =>
  costPerRequest(model, u.inputTokens, u.outputTokens, u.date) * u.requestsPerDay * u.daysPerMonth;

/** Every model's cost for the same usage, cheapest first. */
export const compareModels = (u: Usage, models = API_MODELS) =>
  models
    .map((model) => ({ model, perRequest: costPerRequest(model, u.inputTokens, u.outputTokens, u.date), monthly: monthlyCost(model, u) }))
    .sort((a, b) => a.monthly - b.monthly);
