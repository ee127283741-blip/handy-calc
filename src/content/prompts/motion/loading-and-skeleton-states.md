---
title: "Loading, Skeleton & Progress States"
slug: loading-and-skeleton-states
category: motion
purpose: "Design honest loading feedback for every wait length: instant, short, long and unknown, with skeletons, progress and timeouts."
variables:
  - name: screen
    description: "The screen that loads data"
    example: "Order history list in an online shop account"
  - name: typical_wait
    description: "How long loading usually takes"
    example: "300ms\u20132s, sometimes 10s on slow networks"
  - name: tech_stack
    description: "How it will be built"
    example: "CSS and vanilla JavaScript"
tools: ["ChatGPT", "Claude", "Gemini"]
tags: ["loading", "skeleton", "progress", "ux", "motion"]
published: 2026-10-23
updated: 2026-10-23
image: /prompt-proofs/motion/loading-and-skeleton-states.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Act as a product designer focused on perceived performance. Design the loading experience for: {{screen}}.

Typical wait: {{typical_wait}}.
Build with: {{tech_stack}}.

Define behaviour by wait length:
- Under 300ms: show nothing (avoid flashes). Explain how to delay the indicator.
- 300ms–2s: skeleton screen matching the real layout (same heights, so no layout shift when content arrives).
- 2–10s: skeleton plus a short status line ("Loading your orders…").
- Over 10s or failure: friendly error with a retry button, and keep any data already loaded.
- Unknown length tasks (uploads, exports): determinate progress bar with percentage and time remaining when possible.

Visual and motion spec:
- Skeleton colours from the page's surface colour (two tones with about 6% lightness difference), radius matching real components.
- Shimmer: a linear gradient moving left to right, 1.4s linear infinite; under prefers-reduced-motion, a static skeleton with a gentle 2s opacity pulse or nothing.
- Content arrival: fade in 150ms; stagger list rows 30ms, max 300ms total.
- Accessibility: aria-busy on the container while loading; a polite live region announcing "Orders loaded" once; never trap focus.

Output: a decision table, the HTML/CSS for the skeleton, and JS for the delayed-indicator and timeout logic.
```

## Tips

- Match skeleton shapes to the real content; generic grey bars feel slower than a blank screen.
- Log real load times before choosing thresholds; your numbers may differ from the defaults here.
