---
title: "What is Codex? OpenAI's coding agent explained"
slug: codex
name: Codex
maker: OpenAI
type: Coding agent
summary: "What is Codex? Codex is OpenAI's coding agent that works across the ChatGPT app, your editor, the terminal and the cloud, included with ChatGPT plans."
primaryKeyword: "what is codex"
secondaryKeywords: ["what is openai codex", "codex cli", "codex in chatgpt", "codex vs claude code"]
tldr: "Codex is OpenAI's coding agent: it takes on bugs, refactors and new features, runs many agents in parallel and can keep working in the cloud after you close your laptop. You can use it in the ChatGPT app, on the web, in an IDE extension and as a CLI installed with npm. OpenAI says Codex is included in ChatGPT plans, with more usage on Plus and Pro."
officialUrl: "https://openai.com/codex/"
pricing: { display: "Included in ChatGPT plans; limited on Free and Go, expanded on Plus, highest on Pro; Business seats for teams", sourceUrl: "https://openai.com/codex/", checked: 2026-11-02 }
relatedCases: [launch-fast, harvey]
faq:
  - q: "Is Codex free?"
    a: "Codex is included in ChatGPT plans. OpenAI's pricing page lists limited Codex access on Free and Go, expanded usage on Plus and longer sessions on Pro."
  - q: "How do I install the Codex CLI?"
    a: "OpenAI's Codex page gives the command npm i -g @openai/codex. You sign in with your ChatGPT account."
  - q: "Where can I use Codex?"
    a: "In the ChatGPT desktop and mobile apps, ChatGPT on the web, Codex Cloud, the Codex IDE extension and the Codex CLI."
  - q: "Which model does Codex use?"
    a: "OpenAI's docs say GPT-6.1 Terra is available in Codex on Plus, Pro, Business, Enterprise and Edu plans (checked November 2026)."
sources:
  - { title: "Codex", url: "https://openai.com/codex/", publisher: "OpenAI", date: "2026-11" }
  - { title: "Codex and ChatGPT docs", url: "https://learn.chatgpt.com/docs", publisher: "OpenAI", date: "2026-11" }
  - { title: "ChatGPT plans and pricing", url: "https://chatgpt.com/pricing/", publisher: "OpenAI", date: "2026-11" }
published: 2026-11-02
updated: 2026-11-02
---

Codex shows up in two cases in this library. The founder of [Launch Fast](/cases/launch-fast/) builds with Codex and Claude Code side by side, and an engineer at [Harvey](/cases/harvey/) is quoted on OpenAI's Codex page saying it cut early iteration time by 30–50% ([OpenAI](https://openai.com/codex/)). Here is what Codex is.

## What is Codex?

Codex is OpenAI's AI coding agent. OpenAI pitches it for "your toughest engineering problems, from hard-to-find bugs to complex refactors and new features" ([OpenAI](https://openai.com/codex/)). Unlike a chat assistant that suggests code, Codex works on your repository: it makes changes, runs many agents in parallel and uses computer and browser tools to verify its work until your requirements are met.

Codex is connected to your ChatGPT account. OpenAI's docs list GPT-6.1 Terra as available in Codex on Plus, Pro, Business, Enterprise and Edu plans ([OpenAI docs](https://learn.chatgpt.com/docs)).

## Where can you use Codex?

| Surface | How to start |
|---|---|
| ChatGPT app | Codex inside the ChatGPT desktop and mobile apps |
| Codex Cloud | Run tasks on the web; they keep going when you close your laptop |
| IDE extension | Use Codex inside your code editor |
| Codex CLI | Install with `npm i -g @openai/codex` |
| Code review | Automatically reviews pull requests and answers questions |
| Source | [OpenAI](https://openai.com/codex/), [OpenAI docs](https://learn.chatgpt.com/docs) |

OpenAI says all of these are "the same agent everywhere you code," connected by your ChatGPT account. Plugins add access to other tools.

## How much does Codex cost?

There is no separate Codex subscription. OpenAI says "Codex is included in your ChatGPT plan": Plus "includes Codex usage for focused coding sessions each week," Pro has higher limits for full workdays, and Business adds a shared workspace with admin controls ([OpenAI](https://openai.com/codex/), checked 2 November 2026). The free and Go plans include limited Codex access. Prices vary by country; see the [ChatGPT explainer](/what-is/chatgpt/) for what each plan includes.

## How does Codex compare with Claude Code?

[Claude Code](/what-is/claude-code/) is Anthropic's counterpart and the closest comparison. Both read your codebase, edit files, run commands, work with git, run in the terminal, an editor, a desktop app and the cloud, and can review pull requests. The biggest practical difference is the account: Codex comes with a ChatGPT plan, while Claude Code comes with a paid Claude plan. Codex can also start OpenAI's always-on [dots](/what-is/chatgpt-dots/) agents.

## Who should use Codex?

Anyone who already pays for ChatGPT and writes or maintains code. Non-programmers are using it too: the stories in this library show founders shipping real products with coding agents and AI editors instead of hiring engineers first.
