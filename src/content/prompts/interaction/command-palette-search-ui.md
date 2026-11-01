---
title: "Command Palette (\u2318K) Search UI"
slug: command-palette-search-ui
category: interaction
purpose: "Build a keyboard-first command palette with fuzzy search, grouped results, recent items and full accessibility using the combobox pattern."
variables:
  - name: app_name
    description: "Your app"
    example: "Taskbeam, a project management tool"
  - name: commands
    description: "Groups of actions and items to search"
    example: "Navigation (projects, settings), Actions (new task, invite teammate), Recent tasks"
  - name: visual_style
    description: "Look of the palette"
    example: "Dark, minimal, like a spotlight search"
tools: ["Claude", "ChatGPT", "Cursor", "v0"]
tags: ["command-palette", "search", "keyboard", "accessibility"]
published: 2026-10-22
updated: 2026-10-22
image: /prompt-proofs/interaction/command-palette-search-ui.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a senior front-end engineer. Build a command palette for {{app_name}}.

Searchable content: {{commands}}.
Visual style: {{visual_style}}.

Behaviour:
- Opens with Cmd+K / Ctrl+K and with a visible button; closes with Escape, clicking outside, or selecting an item. Focus returns to whatever opened it.
- Implements the WAI-ARIA combobox + listbox pattern: input with role="combobox", aria-expanded, aria-controls, aria-activedescendant; results with role="listbox" and role="option"; group headings exposed to assistive tech.
- Arrow keys move the active option (wrapping), Enter runs it, Home/End jump, Tab does not trap the user unexpectedly.
- Fuzzy matching with highlighted matched characters; ranking: exact prefix > word start > fuzzy; recent items shown when the query is empty.
- Shows keyboard shortcuts on the right of each action.
- Empty state: "No results for '…'" with a suggestion.
- Announces the number of results in a polite live region, debounced 300ms.

Visual spec: width 640px (full width minus 16px on mobile), max height 60vh, 8px radius, list rows 44px, active row highlighted with accent background at 4.5:1 text contrast, open animation 140ms scale 0.98→1 with opacity, reduced-motion = opacity only.

Output: component code with no external search library, CSS, a sample data file and a short list of edge cases you handled.
```

## Tips

- Keep the palette for actions as well as navigation; that is what makes power users adopt it.
- Test with a screen reader: activedescendant patterns break easily if ids change on re-render.
