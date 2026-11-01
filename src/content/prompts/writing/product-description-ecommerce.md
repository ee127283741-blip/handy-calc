---
title: "E-commerce Product Description"
slug: product-description-ecommerce
category: writing
purpose: "Write scannable product descriptions that answer buyer questions, with SEO-friendly title, bullets, specs and care details."
variables:
  - name: product_name
    description: "Product name"
    example: "Linen Wash Bag \u2013 Large"
  - name: product_facts
    description: "Facts: materials, size, features"
    example: "100% European flax linen, 40\u00d750cm, drawstring, machine washable at 40\u00b0C"
  - name: buyer
    description: "Who buys it"
    example: "Eco-minded travellers and people who hate plastic packaging"
  - name: brand_voice
    description: "Brand voice"
    example: "Warm, practical, lightly witty"
tools: ["ChatGPT", "Claude", "Gemini"]
tags: ["e-commerce", "product-description", "seo", "copywriting"]
published: 2026-10-31
updated: 2026-10-31
---

```text
You are an e-commerce copywriter. Write a product page for {{product_name}}.

Facts (use only these; mark anything else as [check]): {{product_facts}}.
Buyer: {{buyer}}.
Voice: {{brand_voice}}.

Output:
1. SEO title (max 60 characters) and meta description (140–155 characters).
2. Opening paragraph (40–60 words): what it is and the main reason this buyer wants it.
3. 5 benefit bullets, each starting with a bolded 2–3 word lead-in.
4. Specs table: material, dimensions, weight [check], care, origin [check].
5. "Good to know" section answering the 3 questions buyers most often ask before buying this type of product.
6. Care instructions in 3 short steps.
7. A 25-word version for marketplace listings and a 120-character version for social ads.

Avoid unverifiable claims ("best", "eco-friendly" without specifics, "lasts forever"). Use British English.
```

## Tips

- Paste in real customer questions or reviews to make the "Good to know" section match what buyers really ask.
- Environmental claims need evidence in many countries; keep the [check] markers until you have it.
