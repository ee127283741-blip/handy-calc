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
teamSize: { display: "Small team (started with freelancers and part-timers)", label: founder-reported, sourceUrl: "https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/", sourceDate: "2024-02" }
pricing: { display: "Not disclosed", label: not-disclosed }
mrr: { value: null, display: "Not disclosed", label: not-disclosed }
totalRevenue: { value: null, display: "Not disclosed", label: not-disclosed }
revenueRange: not-disclosed
metrics:
  - { name: "Photos required per order", value: "15–17 uploads", label: founder-reported, sourceUrl: "https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/", sourceDate: "2024-02" }
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
  - { title: "Danny Postma, Founder of HeadshotPro – Interview Series (English)", url: "https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/", publisher: "Unite.AI", date: "2024-02" }
  - { title: "Danny Postma, Founder of HeadshotPro – Interview Series", url: "https://www.unite.ai/de/danny-postma-founder-of-headshotpro-interview-series/", publisher: "Unite.AI", date: "2024-02" }
  - { title: "Danny Postma built and sold an AI writing tool for $1M in 8 months", url: "https://www.indiehackers.com/post/danny-postma-built-and-sold-ai-writing-tool-for-1m-in-8-months-full-story-7da7a7edf7", publisher: "Indie Hackers" }
published: 2026-11-02
updated: 2026-11-02
---

Danny Postma's first AI company wrote copy. His second made profile pictures. His third, HeadshotPro, makes one thing only: professional business headshots from a batch of selfies. Getting there took a stock-photo idea he abandoned, a product he built in 30 hours, and a launch where the project that won the press lost the sales. The company's revenue is not disclosed.

## What led Danny Postma from copywriting to headshots?

Postma started out as a freelance conversion specialist and built Landingfolio, a gallery of landing page designs, in 2015 without knowing how to code. While working on a copy tool called Headlime, a friend showed him GPT-3. He got early access by contacting OpenAI directly and turned Headlime into one of the first AI copywriting tools in production ([founder-reported, Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/)). Indie Hackers reported that he built and sold it for $1M in eight months ([Indie Hackers](https://www.indiehackers.com/post/danny-postma-built-and-sold-ai-writing-tool-for-1m-in-8-months-full-story-7da7a7edf7)).

When Stable Diffusion launched in September 2022 he tried an AI stock-photo site, Stock AI, but dropped it over quality and possible legal trouble from companies like Getty Images. He then built ProfilePicture.AI in about 30 hours. It exploded on Twitter and ranked well on Google, then sales faded as the excitement wore off.

## Why did HeadshotPro win when Deep Agency did not?

Postma launched two products at the same time: Deep Agency and HeadshotPro. Deep Agency got a lot of press attention but did not turn into sales. HeadshotPro was an instant hit, so he followed the demand and made it the focus ([founder-reported, Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/)).

The use case explains why. LinkedIn profiles, company pages, conference bios and job applications all want a professional photo, and getting one usually means paying a photographer and finding the time. HeadshotPro turns 15 to 17 uploaded photos into studio-style headshots with a chosen background and lighting. Postma says the company focuses exclusively on professional headshots, while many competitors move sideways into dating photos and avatars.

## What is inside HeadshotPro's model pipeline?

Postma says most competitors use only Stable Diffusion with DreamBooth trained on the user's photos. HeadshotPro chains dozens of extra open-source and custom models, and by February 2024 the team had spent a full year on its own custom models ([founder-reported, Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/)).

| Step | What HeadshotPro uses it for |
|---|---|
| Filtering uploads | LLaVA, a vision-language model, rejects bad or unsafe photos before training |
| Generation | Custom and open-source models on top of the user's photos |
| Clean-up | CodeFormer removes AI artefacts from faces |
| Safety | Removes NSFW generations |

Quality is the whole game: people know exactly what their own face looks like, so a slightly wrong result is a failed order. That is why so much of the pipeline is filtering and restoration rather than generation alone.

## How did a solo founder learn to build a team?

Postma had always worked alone and automated as much as he could, partly because he was afraid of hiring. As HeadshotPro grew he faced three options: sell, stay solo, or build a team. He chose the team, told every candidate from the first interview that managing people was new to him, and started with contractors and part-time people who had other clients.

> "Looking back, I should have started a team way earlier." — Danny Postma ([founder-reported, Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/))

He now runs a small team; exact headcount is not disclosed.

## Does HeadshotPro disclose its revenue?

HeadshotPro's revenue is not disclosed by any primary source we could verify, and neither is total revenue. What the founder has disclosed is the product strategy and the team story above, from a February 2024 interview with Unite.AI ([founder-reported, Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/)).

| When | Milestone | Source |
|---|---|---|
| 2015 | Landingfolio, built without code | [Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/) |
| GPT-3 era | Headlime becomes an AI copywriting tool, later sold | [Indie Hackers](https://www.indiehackers.com/post/danny-postma-built-and-sold-ai-writing-tool-for-1m-in-8-months-full-story-7da7a7edf7) |
| September 2022 | Stable Diffusion launches; Stock AI tried and dropped | [Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/) |
| Late 2022 | ProfilePicture.AI built in about 30 hours | [Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/) |
| 2023 | Deep Agency and HeadshotPro launched; HeadshotPro becomes the focus | [Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/) |
| February 2024 | A year into custom models; small team | [Unite.AI](https://www.unite.ai/danny-postma-founder-of-headshotpro-interview-series/) |

## How does HeadshotPro compare with Photo AI?

[Photo AI](/cases/photo-ai/) and HeadshotPro started from the same 2022 insight, that people will pay for good photos of themselves, and went opposite ways. Pieter Levels kept Photo AI broad, for any setting or style, built it on a deliberately plain stack and rented GPUs. Postma narrowed HeadshotPro to one output and invested a year in a custom model pipeline. One optimised for shipping speed, the other for quality on a single job.

Both founders tested several products before one stuck. Levels expanded an avatar experiment into Photo AI; Postma ran Stock AI, ProfilePicture.AI and Deep Agency before HeadshotPro. [Interior AI](/cases/interior-ai/) shows the same "photos of X" pattern applied to rooms.

## What are the key lessons from HeadshotPro?

- **Follow sales, not press.** Deep Agency got the attention; HeadshotPro got the customers, so that is where Postma went.
- **Narrow the product to win on quality.** Focusing only on business headshots justified a year of custom model work.
- **Viral spikes fade.** ProfilePicture.AI's Twitter success did not last; a steady, searched-for use case did.
- **Hire before you have to.** Postma's own regret is starting his team too late.
