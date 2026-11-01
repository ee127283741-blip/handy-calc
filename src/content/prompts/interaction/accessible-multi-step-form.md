---
title: "Accessible Multi-step Form Flow"
slug: accessible-multi-step-form
category: interaction
purpose: "Design and build a multi-step form with validation, progress, save-and-resume and error handling that works for keyboard and screen-reader users."
variables:
  - name: form_purpose
    description: "What the form is for"
    example: "Booking a home cleaning service"
  - name: steps
    description: "The steps and fields in each"
    example: "1. Address and home size; 2. Date and time; 3. Extras; 4. Contact details and payment"
  - name: tech_stack
    description: "How it will be built"
    example: "HTML, CSS and vanilla JavaScript"
tools: ["Claude", "ChatGPT", "Gemini", "Cursor"]
tags: ["forms", "validation", "accessibility", "ux"]
published: 2026-10-21
updated: 2026-10-21
image: /prompt-proofs/interaction/accessible-multi-step-form.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Act as a UX engineer who specialises in accessible forms. Design and implement a multi-step form for {{form_purpose}}.

Steps and fields: {{steps}}.
Build with: {{tech_stack}}.

UX requirements:
1. Progress indicator showing step names and "Step X of Y", marked up as an ordered list with aria-current="step".
2. One topic per step; the most uncertain questions last. Show a summary step before submit with "Edit" links back to each step.
3. Validation: validate on blur and on "Next", never on every keystroke. Error messages are specific ("Enter a postcode like SW1A 1AA"), appear under the field, are linked with aria-describedby, and an error summary at the top of the step lists all errors as links that move focus to the field.
4. Focus management: when a step changes, move focus to the step heading. Back and Next buttons are real buttons; Back never loses entered data.
5. Save and resume: store progress in localStorage (no personal payment data) and offer "Continue where you left off" on return.
6. Input details: correct type, inputmode and autocomplete attributes for every field; labels always visible (no placeholder-only labels); 44px minimum touch targets.
7. Works without JavaScript as a single long form that submits normally.

Visual spec: spacing on an 8pt grid, error colour with at least 4.5:1 contrast and an icon so colour is not the only signal, focus ring 2px.

Output: the step-by-step UX spec, then complete code, then a test script covering keyboard-only, screen reader (VoiceOver/NVDA) and mobile.
```

## Tips

- Ask only for what you need; every removed field raises completion rates.
- Run the finished form with a screen reader yourself; automated checkers miss focus-order problems.
