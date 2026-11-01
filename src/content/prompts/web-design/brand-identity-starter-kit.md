---
title: "Brand Identity Starter Kit Prompt"
slug: brand-identity-starter-kit
category: web-design
purpose: "Get a compact brand identity for a new business: positioning, three logo concepts, palette, type pairing, voice and example applications."
variables:
  - name: business_name
    description: "Name of the business"
    example: "Fern & Flour"
  - name: what_you_do
    description: "What the business does"
    example: "Small-batch sourdough bakery with a caf\u00e9"
  - name: customers
    description: "Who buys from you"
    example: "Local families and remote workers, ages 25\u201345"
  - name: competitors
    description: "Two or three competitors or alternatives"
    example: "Supermarket bakery aisle, a national coffee chain"
  - name: values
    description: "Three values that matter to you"
    example: "craft, patience, neighbourliness"
tools: ["ChatGPT", "Claude", "Gemini", "Midjourney"]
tags: ["branding", "logo", "identity", "small-business"]
published: 2026-10-22
updated: 2026-10-22
image: /prompt-proofs/web-design/brand-identity-starter-kit.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a brand strategist and identity designer working with a small business on a limited budget.

Business: {{business_name}} — {{what_you_do}}.
Customers: {{customers}}.
Alternatives customers consider: {{competitors}}.
Values: {{values}}.

Produce a brand identity starter kit:

1. Positioning: one-sentence positioning statement, three brand personality traits, and three things the brand is NOT.
2. Name usage: how the name is written (capitalisation, ampersand use), plus a short tagline (max 6 words) and two alternatives.
3. Logo concepts: three different directions (a wordmark, a symbol with wordmark, a badge or monogram). For each, describe shape, letterforms, symbolism and why it fits the values. Add a ready-to-use text-to-image prompt for each concept, ending with "flat vector logo, plain white background, no mockup".
4. Colour palette: 5 colours with hex codes, names and roles (primary, secondary, accent, dark neutral, light neutral) and a 60/30/10 usage rule. Check that the dark neutral on the light neutral passes 4.5:1 contrast and state the ratio.
5. Typography: a free heading and body font pairing from Google Fonts, with weights and an example hierarchy (headline, subhead, body, caption).
6. Voice: three "We say / We don't say" pairs with example sentences.
7. Applications: describe a shop sign, a menu or price list, an Instagram post template and a business card using the system above.
8. Next steps: what to test with five real customers before finalising.

Keep it practical for a business that will produce most materials in Canva or similar tools.
```

## Tips

- Run the logo prompts in an image generator, then redraw the best one as vector; AI image tools still struggle with clean, legible lettering.
- Check that your chosen name and logo are not already used by a business in your area or a registered trademark before you print anything.
- Ask for "a one-page brand guide in Markdown" as a follow-up to share with whoever makes your materials.
