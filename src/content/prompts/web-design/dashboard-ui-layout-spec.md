---
title: "Admin Dashboard UI Layout Spec Prompt"
slug: dashboard-ui-layout-spec
category: web-design
purpose: "Design a data-heavy dashboard screen with clear hierarchy: layout grid, KPI cards, charts, tables, filters, empty and error states."
variables:
  - name: product_type
    description: "Type of product"
    example: "Inventory management for small online shops"
  - name: main_user
    description: "Who uses the dashboard daily"
    example: "Shop owner checking stock each morning"
  - name: key_metrics
    description: "Four to six numbers they need at a glance"
    example: "Items low on stock, orders to ship today, revenue this week, returns pending"
  - name: main_tasks
    description: "The top tasks they do from this screen"
    example: "Reorder stock, print shipping labels, check a product's sales"
  - name: theme
    description: "Light, dark or both"
    example: "Both, light by default"
tools: ["Claude", "ChatGPT", "v0", "Figma AI"]
tags: ["dashboard", "ui", "data", "saas"]
published: 2026-10-24
updated: 2026-10-24
image: /prompt-proofs/web-design/dashboard-ui-layout-spec.webp
imageCredit: "Generated with Claude via claude CLI, rendered in Chromium"
---

```text
You are a senior UX designer specialising in data-dense B2B interfaces. Design the main dashboard for {{product_type}}.

Primary user: {{main_user}}.
Numbers they need at a glance: {{key_metrics}}.
Tasks they start from here: {{main_tasks}}.
Theme: {{theme}}.

Provide:
1. Information hierarchy: rank everything on the screen by importance and explain the ranking in one line each.
2. Layout: app shell (sidebar or top nav, with widths), content grid (columns, gutter, breakpoints at 1440, 1024, 768 and 390px) and what collapses or moves at each breakpoint.
3. KPI cards: content of each card (label, value, comparison, trend), number formatting rules, and when a card turns into a warning state.
4. Charts: pick the chart type for each metric that needs one and justify it. Specify axis labels, gridlines, tooltip content and a colour-blind-safe series palette (hex values).
5. Table: columns, default sort, row actions, bulk actions, pagination vs infinite scroll, and the mobile pattern.
6. Filters and date range: placement, defaults and how active filters are shown.
7. States: first-run empty state, loading skeleton, partial data, error with retry, and no permission.
8. Visual tokens: colours for background, surface, border, text, muted text, accent, success, warning, danger (hex, with contrast ratios for text pairs, minimum 4.5:1), type scale (1.25 ratio from 14px for data UIs), 4/8pt spacing and radii.
9. Accessibility: keyboard order, table semantics, chart alternatives (data table or summary text), focus styles.

Keep labels short and use sentence case.
```

## Tips

- Use a 14px base for dense dashboards and a 16px base for marketing pages; say which you want.
- Ask for "realistic sample data for every table and chart" to make mock-ups convincing without real customer data.
- Follow up with "Write this as a React component using only semantic HTML and CSS variables" to get a starting build.
