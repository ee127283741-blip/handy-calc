---
title: "What is Claude Code? Anthropic's coding agent explained"
slug: claude-code
name: Claude Code
maker: Anthropic
type: Coding agent
summary: "What is Claude Code? It is Anthropic's agentic coding tool that reads your codebase, edits files and runs commands, in the terminal, IDE, desktop app or browser."
primaryKeyword: "what is claude code"
secondaryKeywords: ["claude code cli", "claude code install", "claude code pricing", "claude code vs codex"]
tldr: "Claude Code is Anthropic's agentic coding tool: it reads your codebase, edits files, runs commands and works with tools like git and GitHub. It runs in the terminal, in VS Code and JetBrains, in the Claude desktop app and on the web. It is included in paid Claude plans starting with Pro, or usable with an Anthropic Console account."
officialUrl: "https://code.claude.com/docs/en/overview"
pricing: { display: "Included in Claude Pro ($20/mo) and above; not in the free plan", sourceUrl: "https://claude.com/pricing", checked: 2026-11-02 }
relatedCases: [launch-fast]
faq:
  - q: "How do I install Claude Code?"
    a: "On macOS, Linux or WSL, run curl -fsSL https://claude.ai/install.sh | bash in a terminal; Windows has PowerShell and CMD installers, and Homebrew and WinGet packages exist. Then run claude inside a project folder."
  - q: "Is Claude Code free?"
    a: "No. Claude Code is included in paid Claude plans starting with Pro, or can be used with an Anthropic Console account; the free Claude plan does not include it."
  - q: "What can Claude Code do?"
    a: "Build features and fix bugs across files, write tests, resolve merge conflicts, create commits and pull requests, connect to tools through MCP, run on a schedule and run several agents in parallel."
  - q: "Can Claude Code run without my computer on?"
    a: "Yes. Claude Code on the web and cloud scheduled tasks run in the cloud, so they keep going when your computer is off."
sources:
  - { title: "Claude Code overview", url: "https://code.claude.com/docs/en/overview", publisher: "Anthropic", date: "2026-11" }
  - { title: "Claude plans and pricing", url: "https://claude.com/pricing", publisher: "Anthropic", date: "2026-11" }
published: 2026-11-02
updated: 2026-11-02
---

Claude Code is one of the tools that lets a non-programmer ship real software. Hasaam Bhatti, who built [Launch Fast](/cases/launch-fast/) with no coding background, now builds with Claude Code and Codex and even runs workshops on it. This page explains what Claude Code is and how it works.

## What is Claude Code?

Claude Code is "an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools," according to Anthropic's documentation ([Anthropic](https://code.claude.com/docs/en/overview)). You describe what you want in plain language, and Claude Code plans the approach, writes code across multiple files and checks that it works. It is powered by [Claude](/what-is/claude-ai/) models.

## Where does Claude Code run?

Each surface connects to the same engine, so your project settings and instructions carry over between them.

| Surface | How you use it |
|---|---|
| Terminal | Install the CLI, then run `claude` inside a project folder |
| VS Code and Cursor | Extension with inline diffs, plan review and history |
| JetBrains IDEs | Plugin for IntelliJ, PyCharm, WebStorm and others |
| Desktop app | The Code tab in the Claude app; run sessions side by side and schedule tasks |
| Web and mobile | claude.ai/code for long-running tasks, including repos you don't have locally |
| Slack, GitHub, GitLab | Mention @Claude with a bug report, or automate code review in CI |

On macOS, Linux and WSL, the recommended install is `curl -fsSL https://claude.ai/install.sh | bash`. Windows has PowerShell and CMD installers, and Homebrew and WinGet packages are available.

## What can Claude Code do?

Anthropic lists tasks from the tedious to the large: writing tests, fixing lint errors, resolving merge conflicts, updating dependencies, writing release notes, building features, and tracing bugs to their root cause. It works directly with git to stage changes, write commit messages, create branches and open pull requests.

It is also customisable. A `CLAUDE.md` file in your project gives it standing instructions (it can also read an existing `AGENTS.md`), skills package repeatable workflows, hooks run commands before or after its actions, and MCP connects it to tools like Google Drive, Jira and Slack. You can run several agents in parallel, schedule recurring tasks in the cloud, and build your own agents with the Agent SDK.

## How much does Claude Code cost?

Claude Code is included in paid Claude plans: Pro at $20 a month ($17 billed annually), Max at $100, Ultra at $200, and Team and Enterprise seats. It is not included in the free plan ([Anthropic pricing](https://claude.com/pricing), checked 2 November 2026). You can also use it with an Anthropic Console account and pay for API usage instead.

## How does Claude Code compare with Codex and Cursor?

[Codex](/what-is/codex/) is OpenAI's equivalent: a coding agent that runs in the terminal, an editor, the cloud and the ChatGPT app, included with ChatGPT plans. [Cursor](/what-is/cursor/) is a code editor with AI built in, rather than an agent you add to your own editor. In practice many builders mix them; Launch Fast's founder says he uses both Codex and Claude Code depending on the task.
