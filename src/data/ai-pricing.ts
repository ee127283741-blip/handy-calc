// The ONLY place AI prices live. USD; API prices are per 1M tokens. Update process: see PUBLISHING.md.
export interface PriceStep { from: string; inputPerM: number; outputPerM: number }
export interface ApiModel {
  id: string;
  provider: string;
  name: string;
  inputPerM: number;
  outputPerM: number;
  cachedInputPerM?: number;
  /** Scheduled price changes; each applies from its date (YYYY-MM-DD) onward. */
  schedule?: PriceStep[];
  /** Higher price for prompts over `overTokens` input tokens. */
  longPrompt?: { overTokens: number; inputPerM: number; outputPerM: number };
  notes?: string;
  sourceUrl: string;
  lastVerified: string;
}
export interface Plan { id: string; provider: string; name: string; monthlyUSD: number; notes?: string; sourceUrl: string; lastVerified: string }

const OPENAI = 'https://platform.openai.com/docs/pricing';
const ANTHROPIC = 'https://docs.anthropic.com/en/docs/about-claude/pricing';
const GOOGLE = 'https://ai.google.dev/gemini-api/docs/pricing';
const V = '2026-11-01';
const openaiNote = 'Standard tier, prompts up to 272K input tokens.';
const claudeNote = 'Claude 4.7+ tokenizer produces about 30% more tokens for the same text than earlier models.';

export const API_MODELS: ApiModel[] = [
  { id: 'gpt-6-astra', provider: 'OpenAI', name: 'GPT-6 Astra', inputPerM: 10, outputPerM: 50, cachedInputPerM: 1, notes: openaiNote, sourceUrl: OPENAI, lastVerified: V },
  { id: 'gpt-6.1-sol', provider: 'OpenAI', name: 'GPT-6.1 Sol', inputPerM: 2, outputPerM: 10, cachedInputPerM: 0.1, notes: openaiNote, sourceUrl: OPENAI, lastVerified: V },
  { id: 'gpt-6.1-terra', provider: 'OpenAI', name: 'GPT-6.1 Terra', inputPerM: 1, outputPerM: 5, cachedInputPerM: 0.05, notes: openaiNote, sourceUrl: OPENAI, lastVerified: V },
  { id: 'gpt-6-luna', provider: 'OpenAI', name: 'GPT-6 Luna', inputPerM: 0.1, outputPerM: 0.5, cachedInputPerM: 0.01, notes: openaiNote, sourceUrl: OPENAI, lastVerified: V },
  { id: 'claude-fable-5-1', provider: 'Anthropic', name: 'Claude Fable 5.1', inputPerM: 10, outputPerM: 50, cachedInputPerM: 0.25, notes: claudeNote, sourceUrl: ANTHROPIC, lastVerified: V },
  { id: 'claude-opus-5-5', provider: 'Anthropic', name: 'Claude Opus 5.5', inputPerM: 4, outputPerM: 20, cachedInputPerM: 0.2, notes: claudeNote, sourceUrl: ANTHROPIC, lastVerified: V },
  { id: 'claude-sonnet-5-5', provider: 'Anthropic', name: 'Claude Sonnet 5.5', inputPerM: 2, outputPerM: 10, cachedInputPerM: 0.1, notes: claudeNote, sourceUrl: ANTHROPIC, lastVerified: V },
  { id: 'claude-haiku-5-5', provider: 'Anthropic', name: 'Claude Haiku 5.5', inputPerM: 0.1, outputPerM: 0.5, longPrompt: { overTokens: 100_000, inputPerM: 0.5, outputPerM: 2.5 }, notes: `Prompts over 100K tokens: $0.50 input / $2.50 output. ${claudeNote}`, sourceUrl: ANTHROPIC, lastVerified: V },
  { id: 'gemini-4-argon', provider: 'Google', name: 'Gemini 4 Argon', inputPerM: 2, outputPerM: 10, schedule: [{ from: '2026-12-01', inputPerM: 4, outputPerM: 20 }], notes: 'Paid tier, Standard. Output includes thinking tokens.', sourceUrl: GOOGLE, lastVerified: V },
  { id: 'gemini-3.8-flash', provider: 'Google', name: 'Gemini 3.8 Flash', inputPerM: 0.75, outputPerM: 3.75, schedule: [{ from: '2027-01-01', inputPerM: 1.5, outputPerM: 7.5 }], notes: 'Paid tier, Standard.', sourceUrl: GOOGLE, lastVerified: V },
  { id: 'gemini-3.5-flash-lite', provider: 'Google', name: 'Gemini 3.5 Flash-Lite', inputPerM: 0.3, outputPerM: 2.5, notes: 'Paid tier, Standard.', sourceUrl: GOOGLE, lastVerified: V },
];

const GOOGLE_PLANS = 'https://one.google.com/intl/en_us/about/google-ai-plans/';
const CHATGPT_PRO = 'https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers';
export const PLANS: Plan[] = [
  { id: 'chatgpt-go', provider: 'OpenAI', name: 'ChatGPT Go', monthlyUSD: 8, sourceUrl: 'https://openai.com/index/introducing-chatgpt-go/', lastVerified: V },
  { id: 'chatgpt-plus', provider: 'OpenAI', name: 'ChatGPT Plus', monthlyUSD: 20, notes: 'Monthly billing only.', sourceUrl: 'https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus', lastVerified: V },
  { id: 'chatgpt-pro-100', provider: 'OpenAI', name: 'ChatGPT Pro ($100 tier)', monthlyUSD: 100, sourceUrl: CHATGPT_PRO, lastVerified: V },
  { id: 'chatgpt-pro-200', provider: 'OpenAI', name: 'ChatGPT Pro ($200 tier)', monthlyUSD: 200, sourceUrl: CHATGPT_PRO, lastVerified: V },
  { id: 'chatgpt-pro-500', provider: 'OpenAI', name: 'ChatGPT Pro ($500 tier)', monthlyUSD: 500, sourceUrl: CHATGPT_PRO, lastVerified: V },
  { id: 'claude-pro', provider: 'Anthropic', name: 'Claude Pro', monthlyUSD: 20, notes: '$17/month if billed annually ($200/year).', sourceUrl: 'https://claude.com/pricing', lastVerified: V },
  { id: 'claude-max', provider: 'Anthropic', name: 'Claude Max', monthlyUSD: 100, sourceUrl: 'https://claude.com/pricing', lastVerified: V },
  { id: 'claude-ultra', provider: 'Anthropic', name: 'Claude Ultra', monthlyUSD: 200, sourceUrl: 'https://claude.com/pricing', lastVerified: V },
  { id: 'google-ai-plus', provider: 'Google', name: 'Google AI Plus', monthlyUSD: 4.99, sourceUrl: GOOGLE_PLANS, lastVerified: V },
  { id: 'google-ai-pro', provider: 'Google', name: 'Google AI Pro', monthlyUSD: 19.99, notes: "Google's paid Gemini plan, previously marketed as Gemini Advanced / Google One AI Premium.", sourceUrl: GOOGLE_PLANS, lastVerified: V },
  { id: 'google-ai-ultra-5x', provider: 'Google', name: 'Google AI Ultra 5x', monthlyUSD: 99.99, sourceUrl: GOOGLE_PLANS, lastVerified: V },
  { id: 'google-ai-ultra-20x', provider: 'Google', name: 'Google AI Ultra 20x', monthlyUSD: 199.99, sourceUrl: GOOGLE_PLANS, lastVerified: V },
];

/** Price in effect on `date` (YYYY-MM-DD): the latest schedule step on or before it, else the base price. */
export function priceOn(model: ApiModel, date: string): { inputPerM: number; outputPerM: number } {
  const step = (model.schedule ?? []).filter((s) => s.from <= date).sort((a, b) => b.from.localeCompare(a.from))[0];
  return step ? { inputPerM: step.inputPerM, outputPerM: step.outputPerM } : { inputPerM: model.inputPerM, outputPerM: model.outputPerM };
}

/** The next scheduled change after `date`, if any. */
export const nextChange = (model: ApiModel, date: string) =>
  (model.schedule ?? []).filter((s) => s.from > date).sort((a, b) => a.from.localeCompare(b.from))[0];

export const getModel = (id: string) => API_MODELS.find((m) => m.id === id)!;
export const getPlan = (id: string) => PLANS.find((p) => p.id === id)!;
