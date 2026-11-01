---
title: "E-commerce Product Photo on Clean Background"
slug: ecommerce-product-photo
category: image-generation
purpose: "Generate a crisp, catalogue-ready product photo with controlled lighting, accurate materials and room for text, plus a negative prompt."
variables:
  - name: product
    description: "The product, with material and colour"
    example: "Matte black stainless-steel water bottle with a bamboo lid"
  - name: background
    description: "Background and surface"
    example: "Seamless warm light-grey backdrop, subtle reflection on the surface"
  - name: aspect_ratio
    description: "Image proportions"
    example: "4:5"
tools: ["Midjourney", "DALL\u00b7E", "Imagen", "Stable Diffusion", "Firefly"]
tags: ["product-photo", "e-commerce", "studio", "lighting"]
published: 2026-10-28
updated: 2026-10-28
---

```text
Professional studio product photograph of {{product}}, standing upright, three-quarter view from slightly above eye level, centred with generous space on the left for text.
Background: {{background}}.
Lighting: large softbox key light from the front left at 45°, white bounce card on the right for gentle fill, a thin strip light behind for a clean edge highlight; soft natural contact shadow under the product.
Camera: 100mm macro lens look, f/8 for front-to-back sharpness, high detail on texture, true-to-life colour, no distortion.
Materials: accurate rendering of each surface (matte, gloss, wood grain, metal) with realistic micro-texture.
Style: clean e-commerce catalogue photography, high-key, neutral colour balance, crisp edges.
Aspect ratio: {{aspect_ratio}}.

Negative prompt: text, logo, watermark, label artwork, extra products, props, hands, reflections of the photographer, warped shape, melted edges, floating product, harsh shadows, oversaturated colour, blur, low resolution.
```

## Tips

- For Midjourney add --ar 4:5 --style raw; for other tools set the aspect ratio in the settings.
- AI images cannot reproduce your exact product or label; use them for mock-ups and mood, and photograph the real item for listings.
- Keep the negative prompt; "extra products" and "warped shape" are the most common failures.
