---
title: "Camera Move Shot List for a Short Film or Ad"
slug: shot-list-with-camera-moves
category: camera-moves
purpose: "Plan a full shot list where every shot has a named camera move, lens, timing and purpose, ready for filming or AI video generation."
variables:
  - name: concept
    description: "Concept of the film or ad"
    example: "A 30-second ad for a running shoe: city runner at dawn"
  - name: total_length
    description: "Total length"
    example: "30 seconds"
  - name: mood
    description: "Mood and pace"
    example: "Determined, building energy, ends calm"
  - name: production_method
    description: "How it will be made"
    example: "Mix of real filming on a gimbal and AI-generated shots"
tools: ["ChatGPT", "Claude", "Gemini", "Runway"]
tags: ["shot-list", "camera-moves", "pre-production", "ad"]
published: 2026-10-28
updated: 2026-10-28
---

```text
You are a director of photography. Create a shot list for: {{concept}}.

Total length: {{total_length}}.
Mood and pace: {{mood}}.
Production: {{production_method}}.

For each shot provide a table row with: shot number, duration (seconds), shot size (ECU, CU, MS, WS, EWS), camera move (static, push-in, pull-out, pan, tilt, truck, pedestal, dolly-zoom, orbit, crane, handheld, whip pan, tracking), speed (slow/medium/fast + ease), lens look (mm), subject action, purpose in the story, transition to the next shot (cut, match cut, whip, J-cut audio) and sound.

Rules:
- The running time must add up exactly to the total length.
- Vary shot sizes and moves; no two identical moves back to back unless it is a deliberate rhythm.
- Make camera speed follow the emotional curve: slower and steadier at the start and end, faster at the peak.
- Mark which shots are best filmed for real and which suit AI generation, and why.
- For every AI shot, write a ready-to-paste text-to-video prompt (subject, move, lens, light, duration, negative prompt).

End with a list of equipment or settings needed for the real shots (gimbal mode, shutter angle, frame rate for slow motion).
```

## Tips

- Ask for an animatic version: one still-image prompt per shot to preview the sequence before filming.
- Keep AI shots to inserts and atmosphere; faces and hands holding products are still easier to film for real.
