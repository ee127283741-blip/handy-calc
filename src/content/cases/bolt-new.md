---
title: "Bolt.new revenue: a dev-tools company's AI pivot to $4M ARR"
slug: bolt-new
company: Bolt.new (StackBlitz)
founders: [Eric Simons, Albert Pai]
summary: "StackBlitz had under $1M ARR before launching Bolt.new, an in-browser AI app builder. Bolt.new revenue reached $4M ARR in about four weeks."
primaryKeyword: "bolt.new revenue"
secondaryKeywords: ["bolt new revenue growth", "bolt.new arr", "stackblitz bolt pivot", "bolt.new founders"]
industry: developer-tools
productType: SaaS
foundedYear: 2018
foundedDate: "2018 (StackBlitz); Bolt.new launched October 2024"
teamSize: { display: "Not disclosed", label: not-disclosed }
mrr: { value: 333000, display: "≈$333K/month, implied from $4M ARR", label: media-reported, sourceUrl: "https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts", sourceDate: "2024-11" }
totalRevenue: { value: null, display: "Not disclosed", label: not-disclosed }
revenueRange: 250k-1m
metrics:
  - { name: "ARR ~4 weeks after launch", value: "$4M", label: media-reported, sourceUrl: "https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts", sourceDate: "2024-11" }
  - { name: "Weekly users", value: "100K+", label: media-reported, sourceUrl: "https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts", sourceDate: "2024-12" }
  - { name: "StackBlitz ARR before Bolt", value: "Under $1M", label: founder-reported, sourceUrl: "https://thenewstack.io/?p=22777034" }
tldr: "Bolt.new is StackBlitz's in-browser AI app builder, launched at ViteConf in October 2024 on top of years of WebContainers work. StackBlitz had under $1M ARR before Bolt (founder-reported); Bolt.new reached $4M ARR about four weeks after launch (media-reported). It had 100K+ weekly users by December 2024 (media-reported)."
faq:
  - q: "How much revenue does Bolt.new make?"
    a: "$4M ARR about four weeks after launch, in November 2024 (media-reported), about $333K a month. Total revenue is not disclosed."
  - q: "What was StackBlitz's revenue before Bolt.new?"
    a: "Under $1M ARR (founder-reported, The New Stack)."
  - q: "What powers Bolt.new?"
    a: "WebContainers (an in-browser runtime), Claude 3.5 Sonnet for code generation, Ruby on Rails for accounts and billing, Netlify for deploys and Supabase for databases."
  - q: "How many users does Bolt.new have?"
    a: "100K+ weekly users as of December 2024 (media-reported, Evil Martians)."
sources:
  - { title: "bolt.new from StackBlitz: how they surfed the AI wave", url: "https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts", publisher: "Evil Martians", date: "2024-12" }
  - { title: "Interview with Eric Simons", url: "https://thenewstack.io/?p=22777034", publisher: "The New Stack" }
published: 2026-11-02
updated: 2026-11-02
---

StackBlitz was founded in 2018 and spent years building WebContainers, a way to run Node.js inside the browser. It was impressive technology attached to a small business: under $1M in ARR ([founder-reported, The New Stack](https://thenewstack.io/?p=22777034)). Then a new model made the old technology suddenly valuable. About four weeks after launching Bolt.new, the company was reported at $4M ARR ([media-reported, Evil Martians](https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts)).

## Why did StackBlitz build Bolt.new?

When Claude 3.5 Sonnet arrived in mid-2024, the team saw that a strong coding model plus a full dev environment in the browser could build and run whole apps from a prompt. The pain it addresses is setup: building an app normally means installing tools, configuring environments and deploying. Bolt removes that.

## How does Bolt.new work?

A user describes an app. Claude 3.5 Sonnet generates code, which runs immediately in WebContainers, a WebAssembly-based in-browser runtime. Netlify provides one-click deploys and Supabase provides databases. The whole loop runs in a browser tab, so there is nothing to install and the app the model writes is running in seconds, which is what makes the demos so persuasive.

## How was Bolt.new built?

They built Bolt.new quickly on top of existing tech: WebContainers, Claude 3.5 Sonnet for code generation, Ruby on Rails for accounts and billing, Netlify for deploys and Supabase for databases. Team size is not disclosed with a dated primary source.

## How did Bolt.new market and price itself?

It was announced at ViteConf in October 2024. A conference keynote, demos that spread on X, a Supabase tutorial video and a fast-growing user subreddit followed.

Pricing is token-based monthly plans; the team added top-ups after heavy users kept running out of tokens.

## What challenges did Bolt.new face?

Usage-based pricing created the first friction: heavy users kept running out of tokens, so the team added top-ups. Rapid growth also meant scaling a product built in weeks. Shipping fast left little time to polish. Competition from [Lovable](/cases/lovable/) and [Base44](/cases/base44/) arrived in the same months.

## How much revenue does Bolt.new make?

Bolt.new reached $4M ARR about four weeks after launch, in November 2024, which implies about $333K a month ([media-reported, Evil Martians](https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts)). By December 2024 it had 100K+ weekly users ([media-reported, Evil Martians](https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts)). Higher later figures come from podcast summaries and are not used. Total revenue is not disclosed.

The timeline: StackBlitz founded in 2018; the team tests Claude 3.5 Sonnet with WebContainers in mid-2024; Bolt.new launches at ViteConf in October 2024; $4M ARR in November 2024.

## Why did Bolt.new work?

Years of deep tech can suddenly become valuable when models catch up. WebContainers gave Bolt something competitors lacked: a full runtime in the browser.

The team pivoted fast when a new capability fit its stack. And a ready audience of developers at ViteConf gave it a launch stage.

## What can founders learn from Bolt.new?

Years of deep tech can suddenly become valuable when models catch up.

Pivot fast when a new capability fits your stack.

Usage-based pricing needs easy top-ups. When your most engaged users hit a limit, make it easy for them to pay more instead of leaving.
