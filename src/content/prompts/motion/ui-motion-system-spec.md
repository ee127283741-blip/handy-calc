---
title: "UI Motion System Spec"
slug: ui-motion-system-spec
category: motion
purpose: "Define a consistent motion language for a product: duration and easing tokens, choreography rules, and patterns for common transitions."
variables:
  - name: product
    description: "Product or app"
    example: "A personal finance mobile app"
  - name: personality
    description: "How motion should feel"
    example: "reassuring, precise, never flashy"
  - name: platforms
    description: "Platforms"
    example: "iOS, Android and web"
tools: ["Claude", "ChatGPT", "Gemini"]
tags: ["motion", "design-system", "animation", "tokens"]
published: 2026-10-20
updated: 2026-10-20
image: /prompt-proofs/motion/ui-motion-system-spec.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a motion design lead. Create a motion system for {{product}} on {{platforms}}. Motion should feel {{personality}}.

Include:
1. Principles: 3–4 short principles, each with a do and a don't.
2. Tokens: durations (e.g. instant 0ms, fast 100ms, base 200ms, slow 300ms, deliberate 500ms) and easing curves (standard, emphasised-enter, emphasised-exit, linear for progress) as cubic-bezier values. Explain which to use when, and why exits are faster than entrances.
3. Distance rule: how duration scales with distance travelled or element size.
4. Choreography: stagger timing for lists (ms per item, max total), what leads and what follows, and the rule of maximum two simultaneous movements.
5. Patterns, each with duration, easing, properties animated and a reduced-motion alternative:
   - Button press and hover
   - Screen push/pop navigation
   - Modal and bottom sheet open/close
   - Expand/collapse
   - Toast/snackbar
   - Skeleton to content
   - Number change in a balance (count-up)
   - Success confirmation
6. Accessibility: prefers-reduced-motion behaviour, no flashing more than 3 times per second, no parallax on essential content, autoplay limits.
7. Implementation: the tokens as CSS custom properties, iOS (SwiftUI animation values) and Android (Compose) equivalents.

Format the patterns as a table.
```

## Tips

- Hand the token table to developers and designers alike; shared names stop "make it snappier" debates.
- Record a short screen capture of each pattern once built and compare it with the spec.
