---
title: "Slow Push-in Hero Shot (Text-to-Video)"
slug: slow-push-in-hero-shot
category: camera-moves
purpose: "Generate a cinematic slow dolly push-in on a product or subject, with lens, light, speed and start and end frames specified."
variables:
  - name: subject
    description: "What the camera moves towards"
    example: "A ceramic coffee cup with steam rising, on a walnut table"
  - name: setting
    description: "Where it is"
    example: "A quiet caf\u00e9 at sunrise, window behind"
  - name: duration
    description: "Clip length"
    example: "6 seconds"
  - name: aspect_ratio
    description: "Aspect ratio"
    example: "16:9"
tools: ["Runway", "Sora", "Veo", "Kling", "Luma"]
tags: ["text-to-video", "dolly", "push-in", "product"]
published: 2026-10-25
updated: 2026-10-25
image: /prompt-proofs/camera-moves/slow-push-in-hero-shot.webp
imageCredit: "Generated with Grok Bot image generator (GenerateImage) · 示意畫面 (illustrative still)"
imageWidth: 1024
imageHeight: 576
---

```text
Cinematic slow dolly push-in on {{subject}}, in {{setting}}.

Camera: starts as a medium shot with the subject in the centre third and some environment visible; moves forward smoothly on a dolly, constant speed after a gentle ease-in, ending in a close-up where the subject fills two-thirds of the frame. No rotation, no shake, no zoom — a physical forward move with natural parallax between foreground and background.
Lens: 50mm look, shallow depth of field (about f/2), focus stays locked on the subject throughout; background softly blurred with round highlights.
Light: soft directional key light from the window side, gentle rim light separating the subject from the background, warm highlights, natural shadows.
Motion in scene: subtle and realistic only (steam, dust in light, a slight flicker of reflections); the subject itself does not change shape.
Look: natural colour, gentle contrast, fine film grain, no text or logos.
Duration: {{duration}}. Aspect ratio: {{aspect_ratio}}. 24fps.

Negative: shaky camera, fast motion, warping, morphing objects, extra objects appearing, text, watermark, flicker, oversharpening.
```

## Tips

- If the tool supports an image-to-video start frame, generate the first frame as a still first for much better consistency.
- Most tools obey "constant speed" better than numeric speeds; shorten the clip if the move is too slow.
- Generate 3–4 takes and pick the steadiest; camera moves are where models vary most.
