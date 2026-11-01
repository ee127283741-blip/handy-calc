# Brief: how-many-words-is-a-token

- **Target keyword:** how many words is a token
- **Search intent:** Informational. Reader wants a quick conversion (tokens ↔ words) and to understand why it varies, usually to estimate cost or context limits.
- **Tool:** /ai-costs/llm-api-cost-calculator/

## Ranking pages read (searched 2026-11-01)
- https://www.johndcook.com/blog/2025/03/07/tokens-and-words/
- https://chrwittm.github.io/posts/2025-05-23-estimating-tokens-per-word
- https://howmanywords.app/blog/how-many-words-is-1000-tokens
- https://dev.to/airabbit/understanding-llm-token-counts-what-1000-128000-and-1-million-tokens-actually-mean-2lg9
- https://docs.digitalocean.com/glossary/token (ranked, but off-topic glossary)

## Points competitors commonly cover
- Rule of thumb: ~0.75 words per token / ~4 characters per token.
- BPE tokenization basics; common words are one token.
- Conversion tables (1K, 128K, 1M tokens to words/pages).
- Non-English languages use more tokens.

## Gaps / weaknesses
- Most pages give rough estimates with no tokenizer named and no measured counts.
- Measured studies use Wikipedia or dictionaries, not business text (emails, CSVs, invoices, code).
- Code and number-heavy data described only qualitatively.
- Claude/Gemini given as guesses; no mention of Anthropic's statement that Claude 4.7+ produces ~30% more tokens.
- No translation of token ratios into actual API cost with current official prices.

## Our outline
1. Two plain paragraphs: rule of thumb and where it breaks.
2. Method: js-tiktoken o200k_base + cl100k_base; Claude/Gemini tokenizers differ.
3. Results table from /tmp/tok/count.mjs on 5 real office samples (email, product copy, CSV, code, Traditional Chinese).
4. Conversion table (1K / 128K / 1M tokens) using measured ratios.
5. Worked cost examples (product descriptions, invoice CSVs) with official prices; Claude +30% scenario.
6. Practical rules; tool link; 5 FAQs.

Gap summary: Competitors repeat "0.75 words per token" on generic prose without naming a tokenizer; we publish measured o200k_base/cl100k_base counts on real business text (email, CSV, code, Chinese), note Claude's ~30% overhead, and turn the ratios into worked API costs.
