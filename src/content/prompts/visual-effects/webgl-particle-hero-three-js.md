---
title: "WebGL Particle Hero with Three.js"
slug: webgl-particle-hero-three-js
category: visual-effects
purpose: "Build an interactive particle field hero section in Three.js that reacts to the cursor, with a strict performance budget and a no-WebGL fallback."
variables:
  - name: particle_shape
    description: "What the particles form or do"
    example: "Drift like dust, then gather into the company logo shape on hover"
  - name: colours
    description: "Particle and background colours"
    example: "Particles #E2E8F0 to #38BDF8, background #0B1020"
  - name: particle_count
    description: "Particle count on desktop"
    example: "8,000"
  - name: interaction
    description: "How the cursor affects them"
    example: "Particles gently flee the cursor within a 120px radius"
tools: ["Claude", "ChatGPT", "Cursor", "v0"]
tags: ["webgl", "three-js", "particles", "hero", "interaction"]
published: 2026-10-22
updated: 2026-10-22
image: /prompt-proofs/visual-effects/webgl-particle-hero-three-js.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Act as a senior creative developer. Build a full-width hero section with a Three.js particle system.

Behaviour: {{particle_shape}}.
Colours: {{colours}}.
Desktop particle count: {{particle_count}} (use 25% of that on mobile, detected by viewport width and devicePixelRatio).
Cursor interaction: {{interaction}}.

Technical requirements:
1. Use a single THREE.Points with BufferGeometry and a custom ShaderMaterial; do the motion in the vertex shader using uniforms for time and pointer position. No per-particle JavaScript loop each frame.
2. Cap devicePixelRatio at 2. Pause rendering when the canvas is off-screen (IntersectionObserver) and when the tab is hidden.
3. Performance budget: under 4ms per frame on a mid-range laptop; under 150KB of JavaScript gzipped including Three.js (import only what you need).
4. The headline and button are real HTML above the canvas, not drawn in WebGL, and must keep 4.5:1 contrast.
5. prefers-reduced-motion: render one static frame, no animation, no pointer reaction.
6. Fallback: if WebGL is unavailable, show a CSS radial gradient with the same colours. The page must be fully usable without JavaScript.
7. Clean up on unmount (dispose geometry, material, renderer; remove listeners).

Output: file structure, complete code (JS module, GLSL shaders inline, HTML, CSS) with comments, and a list of five parameters to tune the look.
```

## Tips

- Load the hero script after the page is interactive (dynamic import on idle) so it does not hurt Largest Contentful Paint.
- Test on a real phone; particle counts that feel fine on a laptop often drop frames on mobile.
- To form a logo shape, ask the model to sample points from an SVG path or a canvas-rendered text mask.
