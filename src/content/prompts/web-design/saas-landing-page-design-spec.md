---
title: "SaaS Landing Page Design Spec Prompt"
slug: saas-landing-page-design-spec
category: web-design
purpose: "Get a complete, buildable landing page design for a software product: sections, copy, palette, type scale, spacing and component states in one answer."
variables:
  - name: product_name
    description: "Name of the product"
    example: "Ledgerly"
  - name: product_description
    description: "What it does in one sentence"
    example: "Invoicing and expense tracking for freelance designers"
  - name: target_user
    description: "Who the page is for"
    example: "Freelancers billing 5\u201320 clients a month"
  - name: primary_action
    description: "The one thing a visitor should do"
    example: "Start a 14-day free trial"
  - name: brand_colour
    description: "Main brand colour as hex, or \"choose one\""
    example: "#3B5BDB"
  - name: style_words
    description: "Three words for the look and feel"
    example: "calm, precise, friendly"
tools: ["ChatGPT", "Claude", "Gemini", "v0", "Figma AI"]
tags: ["landing-page", "saas", "ui", "conversion"]
published: 2026-10-20
updated: 2026-10-20
image: /prompt-proofs/web-design/saas-landing-page-design-spec.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a senior product designer who also writes front-end code. Design a high-converting landing page for {{product_name}}: {{product_description}}.

Audience: {{target_user}}.
Single goal of the page: {{primary_action}}.
Look and feel: {{style_words}}. Brand colour: {{brand_colour}}.

Deliver, in this order:

1. PAGE STRUCTURE
List every section top to bottom. For each: purpose (one line), headline, supporting copy (max 40 words), and the visual (screenshot, illustration, icon set or none). Include at minimum: hero with one primary button, problem, how it works in 3 steps, 3–4 benefits with proof, testimonials, pricing, FAQ (5 questions that answer real objections), final call to action.

2. COLOUR SYSTEM
Give hex codes for: background, surface, border, text, muted text, accent, accent-hover, text-on-accent, success, warning, error. Build the accent around {{brand_colour}}. State the contrast ratio of every text colour against the background it sits on; all body text must reach 4.5:1 and large text 3:1.

3. TYPOGRAPHY
One heading font and one body font, both free on Google Fonts. A type scale from a 16px base with a 1.25 ratio, listed in px with line heights and font weights for H1–H6, body, small and button text. Maximum line length for body copy.

4. SPACING, GRID AND SHAPE
Spacing tokens on an 8pt grid (4px allowed for tight UI). Desktop grid (columns, gutter, max width) and mobile margins. Corner radius for inputs, buttons, cards and modals. Two elevation levels as CSS box-shadow values.

5. COMPONENTS
Specify primary button, secondary button, nav bar (desktop and mobile), feature card, testimonial card, pricing card and FAQ accordion. For each give default, hover, focus-visible, active and disabled states.

6. MOTION
Durations in ms and easing curves for hover, accordion open, and section reveal on scroll. Describe the prefers-reduced-motion fallback.

7. ACCESSIBILITY AND PERFORMANCE CHECKLIST
Ten concrete checks (headings order, focus ring, alt text, tap target 44×44px, no layout shift from images, etc.).

Write the copy in plain English. Do not invent statistics, customer names or logos: use clearly marked placeholders like [Customer quote] instead.
```

## Tips

- Give a real brand colour if you have one; the model builds a cleaner palette around a fixed anchor than from scratch.
- Ask a follow-up: "Now write this as a single HTML file with Tailwind CSS" to turn the spec into a prototype.
- Keep the "do not invent statistics" line. Without it, most models fill testimonials with made-up names.
- If the answer is long, ask for one section at a time and check contrast numbers with a contrast checker before you ship.
