---
title: "Design System Tokens from a Brand Brief"
slug: design-system-tokens-from-brand
category: web-design
purpose: "Turn a short brand description into a full set of design tokens (colour, type, spacing, radius, shadow, motion) as JSON and CSS custom properties."
variables:
  - name: brand_name
    description: "Brand or product name"
    example: "Northfield Clinic"
  - name: brand_personality
    description: "Three to five personality traits"
    example: "trustworthy, warm, modern, unhurried"
  - name: base_colour
    description: "Existing brand colour as hex, if any"
    example: "#1F6F78"
  - name: platforms
    description: "Where the tokens will be used"
    example: "Web app and marketing site"
tools: ["Claude", "ChatGPT", "Gemini"]
tags: ["design-system", "tokens", "css", "ui"]
published: 2026-10-21
updated: 2026-10-21
---

```text
Act as a design systems lead. Create a starter design token set for {{brand_name}}, a brand that should feel {{brand_personality}}. Existing brand colour: {{base_colour}}. The tokens will be used on: {{platforms}}.

Requirements:
- Colour: a 10-step tonal scale (50–900) for the brand colour and for a neutral grey, plus semantic tokens that reference them: color.bg, color.surface, color.border, color.text, color.text-muted, color.accent, color.accent-hover, color.on-accent, color.success, color.warning, color.danger, color.focus. Provide a light theme and a dark theme. For every text/background pair, state the WCAG contrast ratio; body text must be at least 4.5:1.
- Typography: font families (free fonts), a modular scale with ratio 1.25 from 16px (list each step in px and rem), line heights, weights and letter spacing per step.
- Spacing: space.0 to space.12 on a 4px base (0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128).
- Radius: none, sm, md, lg, full, with px values and where each is used.
- Shadow: three elevation levels as CSS box-shadow values, tuned for both themes.
- Motion: duration.fast, duration.base, duration.slow in ms, and three easing curves (standard, enter, exit) as cubic-bezier values. Include a reduced-motion rule.

Output format:
1. A short rationale (max 120 words) explaining how the tokens express the personality.
2. The tokens as one JSON object following the W3C Design Tokens format ($value, $type).
3. The same tokens as CSS custom properties under :root and [data-theme="dark"].
4. A table of every text/background pair with its contrast ratio and pass/fail for AA.
```

## Tips

- Paste the JSON into a token tool such as Tokens Studio or Style Dictionary to generate platform files.
- If a contrast pair fails, ask the model to darken only that step rather than regenerate everything.
- Use the same prompt for sub-brands by changing only the personality and base colour, so the structure stays consistent.
