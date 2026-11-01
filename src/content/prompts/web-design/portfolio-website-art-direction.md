---
title: "Portfolio Website Art Direction Prompt"
slug: portfolio-website-art-direction
category: web-design
purpose: "Plan a personal portfolio site that shows your best work first, with layout, case-study structure, type and colour chosen for your discipline."
variables:
  - name: your_name
    description: "Your name or studio name"
    example: "Mara Okafor"
  - name: discipline
    description: "What you do"
    example: "Product designer specialising in fintech apps"
  - name: best_projects
    description: "Three to five projects to feature"
    example: "Budgeting app redesign, bank onboarding flow, crypto wallet design system"
  - name: target_viewer
    description: "Who you want to impress"
    example: "Hiring managers at mid-size tech companies"
  - name: mood
    description: "The impression you want to give"
    example: "confident, quiet, detail-obsessed"
tools: ["Claude", "ChatGPT", "Framer AI", "Webflow"]
tags: ["portfolio", "website", "art-direction", "personal-brand"]
published: 2026-10-23
updated: 2026-10-23
image: /prompt-proofs/web-design/portfolio-website-art-direction.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Act as an art director who reviews hundreds of design portfolios a year. Plan a portfolio website for {{your_name}}, a {{discipline}}. The site should feel {{mood}} and win over {{target_viewer}}.

Projects to feature: {{best_projects}}.

Deliver:
1. Site map: pages and what each must achieve in under 10 seconds of viewing.
2. Home page layout, top to bottom, with exact content for the hero (name, one-line positioning, no more than 15 words) and how projects are shown (grid, list or full-bleed). Justify the choice for this discipline.
3. Case study template with sections: context, my role, problem, constraints, process (3 key decisions with before/after), outcome (with placeholders for real metrics), what I would do next. Give a word budget per section.
4. Visual system: background, text, muted and accent colours as hex with contrast ratios (body text at least 4.5:1); heading and body fonts (free); a 1.25 type scale from 16px in px; 8pt spacing; image aspect ratios for thumbnails and case-study images.
5. Interaction and motion: hover state for project thumbnails, page transition, and scroll behaviour, each with duration and easing, plus a reduced-motion version.
6. Ten mistakes reviewers see in portfolios like this, and how this plan avoids each.

Do not invent client names or results; use placeholders such as [metric] where I must add real data.
```

## Tips

- Order projects by relevance to the job you want, not by date.
- Ask the model to critique your actual case-study text against section 3 once you have a draft.
- Keep the hero line honest and specific; vague lines like "I design experiences" are the most common reviewer complaint.
