---
title: "Animated Mesh Gradient Background (CSS)"
slug: animated-mesh-gradient-background
category: visual-effects
purpose: "Get a soft, slowly shifting mesh-gradient hero background in pure CSS, with a static fallback, a performance budget and reduced-motion support."
variables:
  - name: colours
    description: "Three to five hex colours for the gradient"
    example: "#0EA5E9, #6366F1, #F472B6, #FDE68A"
  - name: mood
    description: "How it should feel"
    example: "dreamy and calm, like light through frosted glass"
  - name: section_height
    description: "Height of the area it covers"
    example: "100vh hero, 640px minimum"
  - name: foreground
    description: "What sits on top of it"
    example: "White headline, subhead and a button"
tools: ["ChatGPT", "Claude", "Gemini", "v0"]
tags: ["css", "gradient", "background", "hero"]
published: 2026-10-20
updated: 2026-10-20
image: /prompt-proofs/visual-effects/animated-mesh-gradient-background.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a creative front-end developer. Write a pure CSS (no JavaScript, no images, no libraries) animated mesh-gradient background.

Colours: {{colours}}.
Mood: {{mood}}.
Size: {{section_height}}.
Content on top: {{foreground}}.

Requirements:
1. Build the mesh from 3–5 large, blurred radial-gradient layers or pseudo-elements, each drifting slowly on its own path so the pattern never visibly repeats within 20 seconds.
2. Animate only transform and opacity (or background-position on a single layer) so it stays on the compositor. Target 60fps on a mid-range phone; no filter: blur() on large animated layers if it can be avoided — explain the trade-off if you use it.
3. Add a subtle noise/grain overlay using an inline SVG feTurbulence data URI at 4–6% opacity to prevent colour banding.
4. Guarantee text legibility: add a scrim or adjust the colour stops so the foreground text keeps at least 4.5:1 contrast at every point of the animation. State which colour you measured against.
5. Respect prefers-reduced-motion: show a static version of the same gradient.
6. Provide a fallback for browsers without support for any modern feature you use (e.g. @property).

Output: the HTML structure, the full CSS with comments, and a short list of the three values to tweak for speed, softness and saturation.
```

## Tips

- Light text on a moving gradient is the main risk; check contrast against the lightest colour in the set, not the average.
- If the animation feels busy, double every duration before changing anything else.
- Ask for a variant using CSS @property to animate colour stops smoothly in browsers that support it.
