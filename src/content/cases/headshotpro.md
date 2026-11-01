---
title: "HeadshotPro revenue: Danny Postma's AI headshot business"
slug: headshotpro
company: HeadshotPro
founders: [Danny Postma]
summary: "Danny Postma's HeadshotPro makes studio-style business headshots from selfies. How it started, its model pipeline, and what is publicly known about HeadshotPro revenue."
primaryKeyword: "headshotpro revenue"
secondaryKeywords: ["headshotpro danny postma", "ai headshot business revenue", "headshotpro case study", "headshotpro mrr"]
industry: careers-hr
productType: SaaS
foundedYear: 2023
foundedDate: "2023"
teamSize: { display: "Small team (started with freelancers and part-timers)", label: founder-reported, sourceUrl: "https://www.unite.ai/de/danny-postma-founder-of-headshotpro-interview-series/", sourceDate: "2024-02" }
mrr: { value: null, display: "Not disclosed", label: not-disclosed }
totalRevenue: { value: null, display: "Not disclosed", label: not-disclosed }
revenueRange: not-disclosed
metrics:
  - { name: "Photos required per order", value: "15–17 uploads", label: founder-reported, sourceUrl: "https://www.unite.ai/de/danny-postma-founder-of-headshotpro-interview-series/", sourceDate: "2024-02" }
tldr: "HeadshotPro is Danny Postma's AI service that turns 15–17 uploaded selfies into studio-style business headshots, launched in 2023 after earlier experiments with AI stock photos and ProfilePicture.AI. It chains dozens of open-source and custom models rather than relying on one fine-tuned model. Its revenue is not disclosed by any primary source."
faq:
  - q: "How much does HeadshotPro make?"
    a: "Not disclosed. Large monthly figures appear in blog posts, but none could be traced to a primary source."
  - q: "How many photos do you upload to HeadshotPro?"
    a: "15–17 uploads per order, according to Danny Postma in a February 2024 Unite.AI interview (founder-reported)."
  - q: "Is HeadshotPro a subscription?"
    a: "No. It sells one-off packages rather than subscriptions, with team ordering for companies."
  - q: "Who founded HeadshotPro?"
    a: "Danny Postma, who had previously sold the AI copywriting tool Headlime."
sources:
  - { title: "Danny Postma, Founder of HeadshotPro – Interview Series", url: "https://www.unite.ai/de/danny-postma-founder-of-headshotpro-interview-series/", publisher: "Unite.AI", date: "2024-02" }
  - { title: "Danny Postma built and sold an AI writing tool for $1M in 8 months", url: "https://www.indiehackers.com/post/danny-postma-built-and-sold-ai-writing-tool-for-1m-in-8-months-full-story-7da7a7edf7", publisher: "Indie Hackers" }
published: 2026-11-02
updated: 2026-11-02
---

A professional photographer, a studio booking and an afternoon off work, or a few selfies and a wait. HeadshotPro bet that most people who need a business headshot would choose the second option if the result looked good enough. Its founder, Danny Postma, did not arrive at that bet directly. He got there by running several small AI image experiments and watching which one people kept paying for.

## Why did Danny Postma start HeadshotPro?

Postma had already sold an AI copywriting tool, Headlime. After Stable Diffusion's release in 2022 he tried an AI stock-photo site, dropped it over quality concerns, and built ProfilePicture.AI in about 30 hours. Business headshots turned out to be the use case people paid for most reliably.

The pain is concrete. LinkedIn profiles, company "about" pages, conference bios and job applications all want a professional photo, and getting one usually means paying a photographer and finding the time. For a whole company, coordinating a shoot for every employee is even harder.

## How does HeadshotPro work?

Customers upload 15–17 photos of themselves ([founder-reported, Unite.AI](https://www.unite.ai/de/danny-postma-founder-of-headshotpro-interview-series/)). The service then generates studio-style headshots in a range of looks.

Rather than a single fine-tuned model, the company says it chains dozens of open-source and custom models. A vision-language model filters bad or unsafe uploads before any training happens, and a face-restoration model cleans artefacts afterwards. The input filtering matters: a blurry or badly lit selfie produces a bad headshot, so rejecting poor inputs is part of delivering quality.

## How was HeadshotPro built?

He launched HeadshotPro alongside another image product, watched which one grew, and then focused on headshots. That portfolio approach meant he did not have to guess the winner in advance.

The model pipeline was not bought off the shelf. The company spent about a year on its own models, according to the February 2024 interview with Postma. The team started with freelancers and part-time staff, and remains a small team; exact headcount is not disclosed ([founder-reported, Unite.AI](https://www.unite.ai/de/danny-postma-founder-of-headshotpro-interview-series/)).

## How does HeadshotPro market and sell its headshots?

Postma is known for SEO. HeadshotPro has landing pages for many headshot searches, by job, style and use, plus comparison pages. People searching for "headshots for doctors" or "LinkedIn headshot" find a page built for exactly that query.

Sales use one-off packages rather than subscriptions, with team ordering for companies. Team plans give companies a reason to buy for everyone at once, which raises order size without changing the product. The pitch is price and speed compared with booking a photographer.

## What challenges did HeadshotPro face?

Quality was the first hurdle. Postma had already dropped the stock-photo idea over quality concerns, and headshots are even less forgiving: people know exactly what their own face looks like. That is why so much of the product is filtering and restoration rather than generation alone, and why the company invested about a year in its own models.

A second challenge is competition. Many apps launched AI headshots on the same open models. HeadshotPro answered with a more complex pipeline and with search-driven distribution rather than relying on a single viral moment.

## How much revenue does HeadshotPro make?

HeadshotPro's monthly revenue is not disclosed, and its total revenue is not disclosed either. Large monthly figures appear in blog posts, but none could be traced to a primary source, so they are not repeated here.

The documented timeline runs from 2022, when Postma sold Headlime and experimented with AI stock photos and ProfilePicture.AI, to 2023, when HeadshotPro launched and became the focus, to February 2024, when an interview described the custom model pipeline.

## Why did HeadshotPro work?

It chose a use case with a clear buyer and an existing budget. Companies already pay photographers for staff headshots, so an AI alternative replaces a known expense rather than creating a new one.

It also treated quality as a pipeline problem, filtering inputs and cleaning outputs, rather than as a single model choice. And it won attention through search, which compounds over time. The same "sell the outcome" logic drives [Photo AI](/cases/photo-ai/), while [Umax](/cases/umax/) shows a very different, social-first route for a face-based consumer app.

## What can founders learn from HeadshotPro?

Run several small bets and double down on the winner. Postma did not predict headshots; he observed them.

Quality filtering of inputs is part of the product. In AI products, what you refuse to process can matter as much as what you generate.

One-off pricing fits a purchase people make once a year. Not every AI product needs a subscription; match the pricing to how often customers actually need the result.
