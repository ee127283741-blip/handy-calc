---
title: "Edit Plan from a Raw Transcript"
slug: edit-plan-from-transcript
category: video-editing
purpose: "Turn a long interview or talking-head transcript into a tight edit plan: selects with timecodes, story order, b-roll and caption notes."
variables:
  - name: video_goal
    description: "What the finished video should do"
    example: "A 90-second customer story for our website"
  - name: target_length
    description: "Finished length"
    example: "90 seconds"
  - name: audience
    description: "Who will watch"
    example: "Small business owners considering our software"
  - name: transcript
    description: "Paste the transcript with timecodes"
    example: "[00:00:12] So when we first started\u2026"
tools: ["Claude", "ChatGPT", "Gemini", "Descript"]
tags: ["editing", "transcript", "interview", "story"]
published: 2026-10-24
updated: 2026-10-24
---

```text
You are an experienced documentary editor. From the transcript below, plan an edit.

Goal: {{video_goal}}.
Finished length: {{target_length}}.
Audience: {{audience}}.

Steps:
1. Find the story: summarise the strongest narrative arc in 3 sentences (situation → problem → turning point → result).
2. Selects: list the best soundbites with start and end timecodes, a one-line summary and why each earns its place. Prefer complete thoughts of 4–15 seconds. Flag any line that would need a cut mid-sentence.
3. Paper edit: arrange selects in order, with running time after each, hitting the target length within ±5 seconds. Mark where the opening hook (first 5 seconds) comes from.
4. B-roll and cutaways: for each select, suggest b-roll shots that illustrate what is said (be specific and practical to film) and where to use them to hide jump cuts.
5. Graphics and captions: lower third for the speaker, any on-screen text, and captions styled for silent autoplay (max 2 lines, 32 characters per line).
6. Music and pacing: tempo range, where the music should lift or drop, and where to leave silence.
7. Cutdowns: a 30-second and a 15-second version using only the selects above.

Rules: do not change the meaning of anything the speaker says; never stitch words from different sentences into a new claim.

Transcript:
{{transcript}}
```

## Tips

- Use a transcript with timecodes (Descript, Premiere and DaVinci Resolve can all export one).
- For long transcripts, ask for selects first, then the paper edit in a second message.
- Always check selects against the footage; a great line can be unusable because of noise or a bad take.
