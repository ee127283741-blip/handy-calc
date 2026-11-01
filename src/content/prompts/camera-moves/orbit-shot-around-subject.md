---
title: "180\u00b0 Orbit Shot Around a Subject"
slug: orbit-shot-around-subject
category: camera-moves
purpose: "Create a smooth arc or orbit move around a person or object, keeping the subject centred and consistent across the whole move."
variables:
  - name: subject
    description: "The subject being orbited"
    example: "A dancer in a flowing red dress, frozen mid-turn"
  - name: environment
    description: "The surroundings"
    example: "An empty concrete warehouse with light beams through high windows"
  - name: orbit_direction
    description: "Direction and amount of the orbit"
    example: "Clockwise, 180 degrees"
  - name: duration
    description: "Clip length"
    example: "8 seconds"
tools: ["Runway", "Sora", "Veo", "Kling", "Luma"]
tags: ["text-to-video", "orbit", "arc-shot", "cinematic"]
published: 2026-10-26
updated: 2026-10-26
image: /prompt-proofs/camera-moves/orbit-shot-around-subject.webp
imageCredit: "Generated with Grok Bot image generator (GenerateImage) · 示意畫面 (illustrative still)"
imageWidth: 1024
imageHeight: 576
---

```text
Smooth cinematic orbit shot: the camera circles {{subject}} — {{orbit_direction}} — at a constant radius and eye-level height, keeping the subject centred and in sharp focus the whole time.

Environment: {{environment}}. The background moves past behind the subject with strong, natural parallax, revealing the space as the camera travels.
Camera behaviour: steady gimbal move, no wobble, constant angular speed with a soft ease-in for the first half-second and ease-out at the end. The camera always points at the subject's centre. Horizon stays level.
Lens: 35mm look, moderate depth of field so the environment is recognisable but softer than the subject.
Subject consistency: the subject's face, clothing, proportions and colours stay identical from every angle; no morphing, no extra limbs.
Light: motivated by the environment; as the camera moves, light and shadow on the subject change realistically (e.g. rim light becomes key light).
Duration: {{duration}}, 24fps, 16:9.

Negative: camera drift away from subject, zoom, jitter, warping, duplicated subject, changing clothes or face, text, watermark.
```

## Tips

- Orbits of 90–180° are far more reliable than full 360° moves in current video models.
- A frozen or slow-moving subject keeps consistency much better than fast action during an orbit.
