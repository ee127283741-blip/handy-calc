---
title: "Scroll-driven Storytelling Section"
slug: scroll-driven-storytelling-section
category: motion
purpose: "Create a scroll-triggered sequence that reveals a product story step by step using CSS scroll-driven animations with a JavaScript fallback."
variables:
  - name: story
    description: "What the section explains"
    example: "How our water filter removes contaminants in 4 stages"
  - name: steps
    description: "The steps or scenes"
    example: "1. Sediment filter, 2. Carbon block, 3. Mineral balance, 4. Clean water"
  - name: visual_assets
    description: "What visuals you have"
    example: "A layered product illustration as SVG"
tools: ["Claude", "ChatGPT", "Cursor"]
tags: ["scroll", "animation", "storytelling", "css"]
published: 2026-10-22
updated: 2026-10-22
image: /prompt-proofs/motion/scroll-driven-storytelling-section.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a creative developer known for performant scroll experiences. Build a scroll-driven storytelling section.

Story: {{story}}.
Scenes: {{steps}}.
Assets: {{visual_assets}}.

Spec:
1. Layout: a sticky visual on one side (or top on mobile) and step text blocks that scroll past; each step occupies about 80vh of scroll.
2. Animation: use CSS scroll-driven animations (animation-timeline: view() or scroll()) to transform and fade parts of the visual for each step. Use transform and opacity only.
3. Fallback: where scroll-timeline is unsupported, use IntersectionObserver to toggle a data-step attribute that triggers CSS transitions (250ms, cubic-bezier(0.2, 0, 0, 1)).
4. Never hijack scrolling: no scroll snapping that fights the user, no changes to scroll speed.
5. Content is complete without animation: all text is visible in the DOM in order, and the visual shows the final state if animations are disabled.
6. prefers-reduced-motion: no movement; each step simply swaps the highlighted part of the visual.
7. Performance: no layout thrashing, no scroll event listeners doing work per frame, Cumulative Layout Shift of 0.

Output: HTML, CSS and the small JS fallback, with a table mapping each step to the visual changes.
```

## Tips

- Write the step text first and make it work as a plain article; the animation should only add emphasis.
- Check the section on a small phone in landscape; sticky visuals often cover the text there.
