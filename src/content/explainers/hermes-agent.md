---
title: "What is Hermes Agent? Nous Research's open-source agent"
slug: hermes-agent
name: Hermes Agent
maker: Nous Research
type: Autonomous agent
summary: "What is Hermes Agent? It is Nous Research's free, open-source AI agent that remembers you, writes its own skills and runs in your terminal or chat apps with any model."
primaryKeyword: "what is hermes agent"
secondaryKeywords: ["hermes agent", "hermes agent install", "hermes agent github", "nous research hermes"]
tldr: "Hermes Agent is a free, MIT-licensed AI agent from Nous Research with the tagline 'The agent that grows with you'. It keeps memory across sessions, creates and improves its own skills, and talks to you through the terminal, Telegram, Discord, Slack, WhatsApp or Signal. You bring the model, from providers like OpenRouter or OpenAI or your own endpoint."
officialUrl: "https://hermes-agent.nousresearch.com/"
pricing: { display: "Free and open source (MIT); you pay for whichever model provider you use", sourceUrl: "https://github.com/nousresearch/hermes-agent", checked: 2026-11-02 }
relatedCases: []
faq:
  - q: "Is Hermes Agent free?"
    a: "Yes. Hermes Agent is open source under the MIT license. You pay only for the model provider you connect, unless you run a model on your own endpoint."
  - q: "Is Hermes Agent a model?"
    a: "No. Hermes Agent is an agent program that uses models. Nous Research also makes a separate series of Hermes language models, which is why the names are often confused."
  - q: "How do I install Hermes Agent?"
    a: "On Linux, macOS or WSL2, run curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash; there is also a PowerShell installer for Windows."
  - q: "Which apps can Hermes Agent talk through?"
    a: "Telegram, Discord, Slack, WhatsApp, Signal and the command line, all from a single gateway process."
sources:
  - { title: "NousResearch/hermes-agent", url: "https://github.com/nousresearch/hermes-agent", publisher: "GitHub", date: "2026-11" }
  - { title: "Hermes Agent", url: "https://hermes-agent.nousresearch.com/", publisher: "Nous Research", date: "2026-11" }
published: 2026-11-02
updated: 2026-11-02
---

Hermes Agent's GitHub repository had 259.6k stars when we checked on 2 November 2026 ([GitHub](https://github.com/nousresearch/hermes-agent)). It is an open-source alternative to managed agents like [ChatGPT dots](/what-is/chatgpt-dots/): instead of a subscription, you run it yourself and choose the model.

## What is Hermes Agent?

Hermes Agent is a free, open-source AI agent made by Nous Research, released under the MIT license. Its tagline is "The agent that grows with you." It is not a language model; it is the program around one, in the same family as [Claude Code](/what-is/claude-code/) and other agent harnesses. Nous Research also publishes Hermes models, which is a common source of confusion.

## What makes Hermes Agent different?

Its learning loop. The project describes "a closed learning loop": the agent curates its own memory, creates new skills after complex tasks and improves those skills as it uses them. It can search past sessions and builds a model of you as a user over time. Skills follow the open agentskills.io standard, so they are portable.

| Feature | What it does |
|---|---|
| Memory | Agent-curated memory and search across past sessions |
| Skills | Creates skills from experience and refines them during use |
| Chat apps | Telegram, Discord, Slack, WhatsApp, Signal and CLI from one gateway |
| Terminal | Full terminal interface with streaming tool output |
| Automation | Built-in scheduled tasks and subagents |
| Where it runs | Local, Docker, SSH, Modal, Daytona or Vercel Sandbox backends |
| Source | [GitHub](https://github.com/nousresearch/hermes-agent) |

## Which models can Hermes Agent use?

Any you like. The project supports Nous Portal, OpenRouter, OpenAI, your own endpoint and many other providers, and you can switch with the `hermes model` command. That flexibility is the main reason developers choose it over agents tied to one company's models, including open models such as [DeepSeek](/what-is/deepseek/).

## How do you install Hermes Agent?

On Linux, macOS or WSL2, the project's install command is `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`; a PowerShell installer covers native Windows. The software is free, but you pay your model provider for usage, and an agent that runs continuously can use a lot of tokens, so set limits.

## Should you use Hermes Agent or a managed agent?

Choose Hermes Agent if you want control: your own hosting, your choice of model, open-source code you can inspect and memory that stays with you. Choose a managed product like ChatGPT dots if you want an agent that works inside tools you already pay for, without setting anything up.
