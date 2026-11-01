---
title: "Drag-and-drop Kanban Board Interaction"
slug: drag-and-drop-kanban-board
category: interaction
purpose: "Specify and build a kanban board where cards can be moved by mouse, touch and keyboard, with clear drop feedback and undo."
variables:
  - name: board_use
    description: "What the board tracks"
    example: "Content calendar: Ideas, Drafting, Editing, Scheduled, Published"
  - name: card_fields
    description: "What each card shows"
    example: "Title, owner avatar, due date, channel tag"
  - name: tech_stack
    description: "How it will be built"
    example: "React with no drag-and-drop library"
tools: ["Claude", "ChatGPT", "Cursor"]
tags: ["drag-and-drop", "kanban", "keyboard", "interaction"]
published: 2026-10-23
updated: 2026-10-23
image: /prompt-proofs/interaction/drag-and-drop-kanban-board.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
Act as an interaction designer and front-end engineer. Design and build a kanban board for {{board_use}}.

Card content: {{card_fields}}.
Implementation: {{tech_stack}}.

Interaction spec:
1. Pointer drag (mouse and touch via Pointer Events): press and hold 150ms on touch before drag starts to avoid conflicts with scrolling; the card lifts (scale 1.03, shadow level 3, 120ms), a placeholder of the same height stays in the original position, and a drop indicator line shows the exact insertion point.
2. Auto-scroll the board horizontally and the column vertically when dragging near edges (speed proportional to distance from edge).
3. Keyboard: focus a card, press Space to pick up, arrow keys to move between positions and columns, Space to drop, Escape to cancel. Announce each step in an aria-live region ("Picked up 'Q3 newsletter'. Column Drafting, position 2 of 5.").
4. Drop animation: card settles into place over 180ms with an ease-out curve; reduced motion = instant.
5. Undo: after any move show a toast "Moved to Editing · Undo" for 6 seconds.
6. Column limits (optional WIP limit): column header turns to warning colour when over limit, with text, not colour alone.
7. Persist order to localStorage and expose an onChange callback for a backend.

Output: state model, component code, CSS with tokens, and a manual test plan for mouse, touch, keyboard and screen reader.
```

## Tips

- Keyboard dragging is the part most implementations skip; keep step 3 in the prompt.
- Ask for unit tests of the reorder function separately from the UI code.
