---
title: "Law Firm Plain-language Client Explainer"
slug: law-firm-client-explainer
category: industry
purpose: "Turn a legal process into a plain-language client guide with steps, timelines, costs and questions to ask, clearly marked as general information."
variables:
  - name: practice_area
    description: "Area of law"
    example: "Residential conveyancing"
  - name: jurisdiction
    description: "Country or state"
    example: "England and Wales"
  - name: process
    description: "The process to explain"
    example: "Buying a home from offer accepted to completion"
  - name: firm_tone
    description: "Tone of the firm"
    example: "Reassuring, precise, no jargon"
tools: ["Claude", "ChatGPT", "Gemini"]
tags: ["legal", "law-firm", "client-guide", "plain-language"]
published: 2026-11-01
updated: 2026-11-01
---

```text
Act as a legal content writer working with a solicitor who will review everything. Write a client explainer on {{process}} for {{practice_area}} in {{jurisdiction}}. Tone: {{firm_tone}}.

Structure:
1. In one paragraph: what this process is and how long it usually takes (give a range and say it varies).
2. Step-by-step timeline: each step with what happens, who does it (client, firm, other side, third parties), typical duration, and what the client needs to provide.
3. Costs: types of fees and disbursements to expect, without quoting amounts unless marked [firm to confirm].
4. Common delays and how the client can avoid them.
5. Jargon buster: 8–10 terms defined in one sentence each.
6. Questions clients should ask their lawyer.
7. Disclaimer: this is general information, not legal advice, and law changes; contact the firm for advice on your situation.

Rules: do not cite specific statutes, case law or fees unless you are certain and mark each with [verify]; prefer "usually" and "often" over absolute statements; reading level about grade 8.
```

## Tips

- A qualified lawyer must check every [verify] item before publication; AI models can state outdated law confidently.
- Turn the timeline into a one-page PDF; clients refer back to it more than to emails.
