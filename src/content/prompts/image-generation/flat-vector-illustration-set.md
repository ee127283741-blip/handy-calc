---
title: "Consistent Flat Vector Illustration Set"
slug: flat-vector-illustration-set
category: image-generation
purpose: "Generate a set of matching flat illustrations for a website or app, with locked style rules so every image looks like part of one family."
variables:
  - name: scenes
    description: "List of scenes to illustrate"
    example: "1. Person reading invoices; 2. Team high-fiving; 3. Phone showing a payment notification"
  - name: palette
    description: "Four to six hex colours"
    example: "#1E3A5F, #3DA5D9, #F4D35E, #EE6C4D, #F7F7F2"
  - name: use
    description: "Where the illustrations go"
    example: "Website feature sections and onboarding screens"
tools: ["Midjourney", "DALL\u00b7E", "Imagen", "Recraft", "Firefly"]
tags: ["illustration", "vector", "consistent-style", "ui"]
published: 2026-10-30
updated: 2026-10-30
---

```text
Create a consistent set of flat vector illustrations for {{use}}. Scenes: {{scenes}}.

Style rules (apply identically to every image):
- Flat vector style, no gradients except one subtle shadow tone per colour, no textures.
- Palette strictly limited to: {{palette}}. Use the lightest colour as the background.
- Characters: simplified geometric people with rounded shapes, no facial features except a small nose line, varied skin tones and body types, proportions 1:6 head-to-body.
- Line: no outlines; shapes defined by colour blocks only.
- Composition: single focal scene centred, generous empty space around it, objects grounded on a soft ellipse shadow.
- Perspective: front-facing, slightly elevated, no dramatic angles.
- Detail level: medium — enough props to tell the story, nothing decorative that does not serve it.

For each scene, output a separate prompt that starts with the scene description and ends with the full style block above, so it can be run independently. Aspect ratio 4:3.

Negative prompt for all: 3D, photorealistic, gradients, outlines, text, letters, logos, watermark, busy background, extra limbs, distorted hands.
```

## Tips

- Run all prompts with the same seed or style reference image where the tool allows it; that does more for consistency than wording.
- Vectorise the best results (e.g. in a tracing tool) so you can recolour and scale them cleanly.
