---
title: "Long Video to Short-form Clips Plan"
slug: short-form-video-repurposing
category: video-editing
purpose: "Find the best moments in a podcast or webinar and plan vertical clips with hooks, captions, reframing and posting order."
variables:
  - name: source_video
    description: "What the long video is"
    example: "45-minute webinar on pricing for freelancers"
  - name: platforms
    description: "Where clips will be posted"
    example: "TikTok, Instagram Reels, YouTube Shorts, LinkedIn"
  - name: number_of_clips
    description: "How many clips you want"
    example: "6"
  - name: transcript
    description: "Transcript with timecodes"
    example: "[00:03:10] The biggest mistake I see\u2026"
tools: ["Claude", "ChatGPT", "Gemini", "CapCut", "Opus Clip"]
tags: ["short-form", "repurposing", "vertical-video", "social"]
published: 2026-10-25
updated: 2026-10-25
image: /prompt-proofs/video-editing/short-form-video-repurposing.webp
imageCredit: "Generated with Grok Bot image generator (GenerateImage) · 示意畫面 (illustrative still)"
imageWidth: 720
imageHeight: 1280
---

```text
Act as a short-form video editor and social strategist. Plan {{number_of_clips}} vertical clips from {{source_video}} for {{platforms}}.

For each clip give:
1. Timecodes (start–end) from the transcript and length (aim for 20–45s; one may be up to 60s).
2. Hook: the first line on screen and spoken, working in under 2 seconds. If the best hook appears later in the clip, show how to move it to the start without changing the meaning.
3. Why it works as a standalone clip (the clip must make sense with no context).
4. Edit notes: where to cut pauses and filler, punch-in zooms (110–120%) for emphasis, reframing for 9:16 (keep eyes in the top third), and any b-roll or screen recording to add.
5. Captions: burned-in, word-by-word or phrase style, max 3 words per line in the centre safe zone, keywords highlighted in the accent colour.
6. On-screen title (max 6 words) and the post caption with a question to drive comments.
7. Platform tweaks: what to change for LinkedIn versus TikTok.

Finally, give a posting order for the clips with reasoning, and three ideas for follow-up clips if one performs well.

Transcript:
{{transcript}}
```

## Tips

- Keep captions inside the safe area; platform buttons cover the bottom and right edges.
- Clips that answer one specific question usually outperform clips of general advice.
