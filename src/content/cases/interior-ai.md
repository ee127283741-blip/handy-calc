---
title: "Interior AI revenue: Pieter Levels' room redesign tool"
slug: interior-ai
company: Interior AI
founders: [Pieter Levels]
summary: "Interior AI turns a photo of a room into redesigned versions in different styles. Pieter Levels reported Interior AI revenue of $40,000 MRR from 1,000+ recurring customers."
primaryKeyword: "interior ai revenue"
secondaryKeywords: ["interior ai pieter levels", "how much does interior ai make", "interior ai case study", "ai interior design startup revenue"]
industry: real-estate-home
productType: SaaS
foundedYear: 2022
foundedDate: "September 2022"
teamSize: { display: "Not disclosed", label: not-disclosed }
pricing: { display: "Paid subscription only; the free version was removed because of abuse", label: founder-reported, sourceUrl: "https://www.producthunt.com/p/interiorai/interior-ai" }
mrr: { value: 40000, display: "$40,000 MRR (Version 2.0 launch post)", label: founder-reported, sourceUrl: "https://www.producthunt.com/p/interiorai/interior-ai" }
totalRevenue: { value: null, display: "Not disclosed", label: not-disclosed }
revenueRange: 10k-50k
metrics:
  - { name: "Recurring customers", value: "1,000+", label: founder-reported, sourceUrl: "https://www.producthunt.com/p/interiorai/interior-ai" }
  - { name: "Monthly run rate on a record day (September 2024)", value: "$43K/month", label: founder-reported, sourceUrl: "https://levels.io/new-420k-mo-revenue-record-lex-fridman", sourceDate: "2024-09" }
  - { name: "Affiliate revenue share", value: "20%", label: founder-reported, sourceUrl: "https://www.producthunt.com/p/interiorai/interior-ai" }
tldr: "Interior AI is a tool by Pieter Levels that turns a single photo of a room into redesigned versions in 50+ styles. When he launched version 2.0 on Product Hunt, Levels reported 1,000+ recurring customers at $40,000 MRR, including interior design studios and real estate agencies (founder-reported). On a record day in September 2024 he posted Interior AI at a $43K/month run rate (founder-reported, levels.io)."
faq:
  - q: "How much revenue does Interior AI make?"
    a: "$40,000 MRR from 1,000+ recurring customers, as Pieter Levels reported in his Interior AI 2.0 Product Hunt post (founder-reported). Total revenue is not disclosed."
  - q: "When did Interior AI launch?"
    a: "Publicly in autumn 2022; directory listings disagree between September and October 2022."
  - q: "Who uses Interior AI?"
    a: "Homeowners, renters, real-estate agents and interior designers who want to preview a style before spending money. Agents and stagers are the natural heavy users."
  - q: "What tech does Interior AI run on?"
    a: "The same lightweight approach as Levels's other products: a PHP and jQuery front end on a single server, with diffusion models run through a hosted GPU API."
sources:
  - { title: "I hit a new $420,000/mo revenue record thanks to the Lex Fridman podcast", url: "https://levels.io/new-420k-mo-revenue-record-lex-fridman", publisher: "levels.io", date: "2024-09" }
  - { title: "Interior AI launches", url: "https://hunted.space/product/interiorai/launches/interior-ai", publisher: "Hunted Space" }
  - { title: "Interior AI on Product Hunt", url: "https://www.producthunt.com/p/interiorai/interior-ai", publisher: "Product Hunt" }
published: 2026-11-02
updated: 2026-11-02
---

Repainting a living room, buying a new sofa or staging an apartment for sale share one problem: you spend the money before you see the result. Interior AI flips that order. Upload one photo of a room, pick a style, and seconds later you see the same room redesigned. Pieter Levels built the first version in 2022, and by the time he launched version 2.0 it had 1,000+ recurring customers paying $40,000 a month ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai)).

## Why do rooms suit AI image tools so well?

Because one picture shows the whole value. Levels was playing with Stable Diffusion in 2022 and found it was quite good at redesigning interiors from a photo, so he quickly spun up an MVP ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai)). Image-to-image diffusion can keep a room's shape, its walls, windows and layout, while changing furniture, colours, materials and lighting.

That is exactly what people deciding on a redesign need. Homeowners, renters, real-estate agents and interior designers want to preview a style before spending money, and a before-and-after pair explains the product without a word, which also makes every result easy to share.

## What changed in Interior AI 2.0?

The first versions had a common flaw of early diffusion tools: they redesigned the building, not just the interior.

> "AI is notoriously bad at this and most other apps you'll see change the entire building" — Pieter Levels ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai))

Version 2.0 was built on a fork of Photo AI and focused on keeping the structure intact ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai)):

| Feature | What it does |
|---|---|
| 3D depth perception | Understands objects in the room |
| 3D construction segmentation | Keeps walls, floor and ceiling in place |
| 3D video flythroughs | Turns a redesign into a camera fly-through video |
| AI Virtual Staging | Fills empty rooms with furniture for real estate agents |
| 50+ styles, 30+ room types | From contemporary to seasonal styles, bedrooms to patios |

The web app follows Levels' usual lightweight approach, with diffusion models run through a hosted GPU API rather than his own GPU fleet.

## Who pays for Interior AI, and how?

Levels said customers included many leading interior design studios and real estate agencies, and that the product had been featured in The New York Times and TechCrunch ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai)). Virtual staging was aimed squarely at agents, which he saw as a potentially big market.

Interior AI is paid-only. A Product Hunt commenter asked for one free room to try; Levels replied that there had been lots of abuse of the free version, so he removed it ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai)). Growth relies on before-and-after posts on X, AI tool directories, Product Hunt launches and an affiliate program paying a 20% revenue share.

## What is Interior AI's monthly revenue?

In his version 2.0 Product Hunt post, Levels reported 1,000+ recurring customers at $40,000 MRR ([founder-reported, Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai)). On a record day in September 2024, after his Lex Fridman podcast appearance, he posted Interior AI at a $43K/month run rate, and noted that GPU costs of about $60K a month were shared between Photo AI and Interior AI ([founder-reported, levels.io](https://levels.io/new-420k-mo-revenue-record-lex-fridman)). Total revenue and team size are not disclosed; Levels runs his products largely alone.

| When | Milestone | Source |
|---|---|---|
| Autumn 2022 | First MVP after Stable Diffusion's release | [Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai) |
| About a year later | Version 2.0 on Product Hunt: 1,000+ recurring customers, $40,000 MRR | [Product Hunt](https://www.producthunt.com/p/interiorai/interior-ai) |
| September 2024 | $43K/month run rate on a record day | [levels.io](https://levels.io/new-420k-mo-revenue-record-lex-fridman) |

## How does Interior AI compare with Photo AI and HeadshotPro?

[Photo AI](/cases/photo-ai/) is Interior AI's sibling. Version 2.0 was literally built on a fork of it, and the two share GPU costs and the same audience on X. Photo AI sells photos of people; Interior AI sells photos of rooms, with a clearer professional buyer in agents and design studios.

[HeadshotPro](/cases/headshotpro/) applies the same "one image proves it" logic to business headshots and also sells to companies. The difference is investment: HeadshotPro spent a year on custom models, while Interior AI improved quality by adding depth and segmentation on top of models Levels already used. Both show that a narrow vertical with a professional buyer pays more reliably than a general image generator.

## What are the lessons from Interior AI?

- **Pick a vertical where one picture sells it.** Before-and-after images do the marketing for free.
- **Fix the flaw your category shares.** Keeping walls and floors intact was Interior AI 2.0's main upgrade.
- **Find the professional inside the consumer market.** Design studios and real estate agents turned a fun tool into recurring revenue.
- **Free tiers can be abused.** Levels removed the free version rather than pay for misuse.
