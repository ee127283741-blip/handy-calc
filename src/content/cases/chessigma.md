---
title: "Chessigma revenue: free chess analyzer at $8K MRR"
slug: chessigma
company: "Chessigma"
founders: ["Mehdi Ben Haddou"]
summary: "Chessigma revenue reached $8,052 MRR and $81,042 all time in November 2026 (verified, TrustMRR via Stripe) for a free on-device chess game analyzer."
primaryKeyword: "chessigma revenue"
secondaryKeywords: ["chessigma", "chessigma game review", "chessigma chess analyzer", "chessigma founder"]
industry: education
productType: Tool
foundedYear: 2025
foundedDate: "2025-03"
teamSize: { display: "Not disclosed", label: not-disclosed }
pricing: { display: "Free; paid plan prices not disclosed (Nov 2026)", label: founder-reported, labelNote: "Company-written listing on TrustMRR", sourceUrl: "https://trustmrr.com/startup/chessigma", sourceDate: "2026-11" }
mrr: { value: 8052, display: "$8,052 MRR (Nov 2026)", label: verified, labelNote: "TrustMRR, verified with a Stripe API key", sourceUrl: "https://trustmrr.com/startup/chessigma", sourceDate: "2026-11" }
totalRevenue: { value: 81042, display: "$81,042 all time (Nov 2026)", label: verified, labelNote: "TrustMRR, verified with a Stripe API key", sourceUrl: "https://trustmrr.com/startup/chessigma", sourceDate: "2026-11" }
revenueRange: under-10k
metrics:
  - { name: "Revenue, last 30 days (Nov 2026)", value: "$14,466", label: verified, labelNote: "TrustMRR, verified with a Stripe API key", sourceUrl: "https://trustmrr.com/startup/chessigma", sourceDate: "2026-11" }
  - { name: "Active subscriptions (Nov 2026)", value: "632", label: verified, labelNote: "TrustMRR, verified with a Stripe API key", sourceUrl: "https://trustmrr.com/startup/chessigma", sourceDate: "2026-11" }
tldr: "Chessigma is a free chess game analyzer that runs Stockfish on the user's own device, pitched as a free alternative to Chess.com game review. TrustMRR showed $8,052 MRR, 632 active subscriptions and $81,042 all-time revenue in November 2026 (verified, via Stripe). The listing names Mehdi Ben Haddou as founder, based in Belgium."
faq:
  - q: "What is Chessigma revenue?"
    a: "TrustMRR showed $8,052 MRR, $14,466 in the last 30 days and $81,042 all time in November 2026 (verified, via Stripe)."
  - q: "Is Chessigma game review free?"
    a: "The company-written listing describes a free chess analyzer that runs on your device, with unlimited game reviews and full Stockfish analysis. It still has 632 paying subscriptions."
  - q: "Who is the Chessigma founder?"
    a: "TrustMRR lists Mehdi Ben Haddou as founder, March 2025 as the founding date and Belgium as the location. Team size is not disclosed."
sources:
  - { title: "Chessigma on TrustMRR", url: "https://trustmrr.com/startup/chessigma", publisher: "TrustMRR", date: "2026-11" }
  - { title: "Chessigma homepage", url: "https://www.chessigma.com/", publisher: "Chessigma" }
published: 2026-11-10
updated: 2026-11-10
---

Chess.com charges for unlimited game reviews. Chessigma gives them away. The Belgian tool runs the Stockfish engine in the player's own browser, so analysis costs it almost nothing to serve, and it still earned $14,466 in the 30 days before November 2026 ([verified, TrustMRR](https://trustmrr.com/startup/chessigma)). It is a clean example of a free product with a paid layer on top.

## How does Chessigma offer free chess game review?

Chessigma moves the expensive part to the user's device. The company-written listing describes a free chess analyzer that runs on your device, with unlimited game reviews and full Stockfish analysis, for players on Chess.com and Lichess ([founder-reported, TrustMRR](https://trustmrr.com/startup/chessigma)). Because the engine runs locally, each extra review does not add server cost.

> "Chess.com but free. 1M+ users." — Chessigma listing ([founder-reported, TrustMRR](https://trustmrr.com/startup/chessigma))

The tagline is blunt positioning: name the market leader, then undercut it on price.

## How much money does Chessigma make if reviews are free?

Chessigma had $8,052 MRR and 632 active subscriptions in November 2026, with $14,466 collected in the last 30 days and $81,042 all time ([verified, TrustMRR](https://trustmrr.com/startup/chessigma)). Revenue is verified through a Stripe API key.

| Item (Nov 2026) | Value | Source |
|---|---|---|
| MRR | $8,052 | [verified, TrustMRR](https://trustmrr.com/startup/chessigma) |
| Revenue, last 30 days | $14,466 | [verified, TrustMRR](https://trustmrr.com/startup/chessigma) |
| All-time revenue | $81,042 | [verified, TrustMRR](https://trustmrr.com/startup/chessigma) |
| Active subscriptions | 632 | [verified, TrustMRR](https://trustmrr.com/startup/chessigma) |
| Founded | March 2025, Belgium | [founder-reported, TrustMRR](https://trustmrr.com/startup/chessigma) |

Last-30-day revenue is almost twice MRR. That gap usually means annual plans or one-off payments landing in the month, which MRR spreads out. The listing shows pricing only as free, so paid plan prices are not disclosed. Team size and profit are not disclosed either.

## Who uses Chessigma and how did it spread?

The users are ordinary online chess players who want to know where a game went wrong. The listing claims more than 1 million users in its tagline, and 632 of them pay ([founder-reported, TrustMRR](https://trustmrr.com/startup/chessigma)). Marketing channels are not listed, and the founder has about 390 followers on X.

The stack is light: Next.js on the front end, Supabase, Vercel and Stripe on the back end. That fits a product where the heavy computing happens in the browser.

## How does Chessigma compare with Codedex and Speak?

Chessigma sits with learning products like [Codedex](/cases/codedex/), which teaches coding through game-style lessons, and [Speak](/cases/speak/), the AI language tutor. All three help people improve at a skill.

Our observation: Codedex and Speak charge for the core lesson. Chessigma gives the core away and is built around a very large free base, made possible because the analysis runs on the user's hardware. Its conversion rate is small, but a near-zero serving cost means even a few hundred paying players make the model work.

## What lessons does Chessigma hold for freemium tools?

- **Push compute to the client.** Running Stockfish on the user's device keeps free reviews cheap to serve.
- **Name the incumbent.** "Chess.com but free" tells players the value in four words.
- **A small paid share can be enough.** 632 subscriptions produced $8,052 MRR in November 2026 ([verified, TrustMRR](https://trustmrr.com/startup/chessigma)).
- **Watch cash, not just MRR.** Thirty-day revenue near twice MRR shows how annual or one-off payments change the picture.
