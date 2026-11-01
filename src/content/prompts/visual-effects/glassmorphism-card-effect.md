---
title: "Accessible Glassmorphism Card Effect"
slug: glassmorphism-card-effect
category: visual-effects
purpose: "Create a frosted-glass card that stays readable on any background, with backdrop blur, border highlight, fallbacks and contrast checks."
variables:
  - name: card_content
    description: "What the card contains"
    example: "Pricing plan: name, price, 4 features, button"
  - name: background_scene
    description: "What sits behind the card"
    example: "A colourful photo of a city at dusk"
  - name: theme
    description: "Light or dark glass"
    example: "Dark glass"
tools: ["ChatGPT", "Claude", "v0"]
tags: ["css", "glassmorphism", "card", "ui"]
published: 2026-10-21
updated: 2026-10-21
image: /prompt-proofs/visual-effects/glassmorphism-card-effect.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Write HTML and CSS for a glassmorphism card that is genuinely readable.

Card content: {{card_content}}.
Background behind the card: {{background_scene}}.
Glass theme: {{theme}}.

Specification:
- Use backdrop-filter: blur() with saturate(), a semi-transparent fill, a 1px inner highlight border (top-left lighter than bottom-right) and a soft outer shadow. Give exact values and explain each.
- Readability: choose the fill opacity so text keeps at least 4.5:1 contrast even over the brightest part of the background. Explain how you estimated this and suggest increasing fill opacity if unsure.
- Fallback with @supports not (backdrop-filter: blur(1px)): a solid, near-opaque fill that looks intentional.
- States: hover lift (translateY -4px, shadow grows, 180ms ease-out) and a focus-visible ring for the button inside.
- Respect prefers-reduced-transparency where supported by switching to the solid fallback, and prefers-reduced-motion by removing the lift.
- Performance note: limit backdrop blur to elements smaller than about a third of the viewport and avoid animating the blur radius.

Output: semantic HTML, commented CSS using custom properties for every tunable value, and a short "do and don't" list for using glass effects in a real UI.
```

## Tips

- Glass works best over busy, colourful backgrounds; over flat colour it just looks grey.
- Never place small grey text on glass. Keep body text white or near-black at full opacity.
