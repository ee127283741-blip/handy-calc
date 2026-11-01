---
title: "Crane-up Reveal Establishing Shot"
slug: crane-up-reveal-establishing-shot
category: camera-moves
purpose: "Open a video with a crane or drone rise that starts on a detail and reveals the wider location, with timing and framing set."
variables:
  - name: start_detail
    description: "The close detail the shot starts on"
    example: "A hand placing a wooden sign that reads OPEN"
  - name: reveal
    description: "What the rise reveals"
    example: "A small bookshop on a cobbled street, surrounded by a waking town"
  - name: time_of_day
    description: "Time and weather"
    example: "Early morning, light mist, sun just above rooftops"
  - name: duration
    description: "Clip length"
    example: "10 seconds"
tools: ["Runway", "Sora", "Veo", "Kling"]
tags: ["text-to-video", "crane", "drone", "establishing-shot"]
published: 2026-10-27
updated: 2026-10-27
image: /prompt-proofs/camera-moves/crane-up-reveal-establishing-shot.webp
imageCredit: "Generated with Grok Bot image generator (GenerateImage) · 示意畫面 (illustrative still)"
imageWidth: 1024
imageHeight: 576
---

```text
Establishing crane-up reveal. Opening frame: close shot of {{start_detail}}, framed low and intimate.
Move: the camera rises vertically and tilts down slightly to keep the starting point in frame, then continues rising to a high wide shot that reveals {{reveal}}. Smooth, constant vertical speed after a 1-second ease-in; final 1.5 seconds slow to a gentle hold on the wide composition.
Framing at the end: the starting point sits in the lower third, leading lines of streets or rooftops draw the eye through the frame, sky occupies the top quarter.
Time and atmosphere: {{time_of_day}}; volumetric light, natural haze adding depth, realistic small movements (birds, smoke from chimneys, a few people).
Lens: starts at a 35mm look, natural perspective throughout; no fisheye distortion.
Look: cinematic, soft contrast, natural colour, fine grain.
Duration: {{duration}}, 24fps, 16:9.

Negative: sudden speed changes, rotation, wobble, warping buildings, melting architecture, text, watermark, drone shadow, lens flares covering the subject.
```

## Tips

- If the reveal looks inconsistent, generate the high wide frame as an end image and use a start-and-end-frame mode.
- Shorter rises (to rooftop height, not aerial) give more believable results.
