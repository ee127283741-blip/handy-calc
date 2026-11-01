---
title: "Logo Reveal Animation Brief"
slug: logo-reveal-animation
category: motion
purpose: "Plan a 2\u20134 second logo animation with frame-accurate timing, easing and sound cues, ready for After Effects, Lottie or CSS."
variables:
  - name: brand_name
    description: "Brand name"
    example: "Orbit Coffee"
  - name: logo_description
    description: "Describe the logo"
    example: "A circle with a small dot orbiting it, wordmark to the right"
  - name: brand_feeling
    description: "Feeling to convey"
    example: "warm, energetic, a little playful"
  - name: output_format
    description: "Where it will be used"
    example: "Lottie for the app splash screen and MP4 for video intros"
  - name: duration
    description: "Target length"
    example: "3 seconds"
tools: ["ChatGPT", "Claude", "After Effects", "LottieFiles"]
tags: ["logo", "animation", "motion", "branding"]
published: 2026-10-21
updated: 2026-10-21
image: /prompt-proofs/motion/logo-reveal-animation.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Act as a senior motion designer. Write an animation brief for a logo reveal for {{brand_name}}.

Logo: {{logo_description}}.
Feeling: {{brand_feeling}}.
Output: {{output_format}}.
Length: {{duration}} at 60fps.

Provide:
1. Concept: two alternative concepts in 2 sentences each, then pick one and explain why it suits the brand.
2. Timeline table with columns: time (ms), frame, element, property, from, to, easing (cubic-bezier), notes. Cover anticipation, main action, overshoot/settle and hold. The final frame must be the static logo exactly, held for at least 500ms.
3. Easing guidance: which curves create the intended feeling and where to use spring/overshoot.
4. Sound design cues (if used in video): what sound, at which frame, and how long.
5. Variants: a 1-second short version for app loading and a looping idle version (seamless, under 4 seconds).
6. Technical notes for {{output_format}}: layer structure, shape layers vs images, file size target under 50KB for Lottie, which effects to avoid because Lottie does not support them.
7. Accessibility: a reduced-motion version (simple 200ms fade) and a rule never to block app use while it plays.
```

## Tips

- Build the short version first; it is used far more often than the long one.
- If you use the timeline in After Effects, convert the cubic-bezier values to keyframe influence percentages.
