---
title: "SiteGPT revenue: an indie founder's website chatbot"
slug: sitegpt
company: SiteGPT
founders: [Bhanu Teja Pachipulusu]
summary: "Bhanu Teja turned a side feature into SiteGPT, a chatbot trained on a company's website. SiteGPT revenue passed $10K MRR in its first month."
primaryKeyword: "sitegpt revenue"
secondaryKeywords: ["sitegpt founder", "sitegpt bhanu teja", "sitegpt mrr", "sitegpt case study"]
industry: customer-support
productType: SaaS
foundedYear: 2023
foundedDate: "March 2023"
teamSize: { display: "2 founders, 0 employees", label: founder-reported, sourceUrl: "https://www.starterstory.com/stories/sitegpt", sourceDate: "2023-10" }
pricing: { display: "Paid plans only from day one; no free plan", label: founder-reported, sourceUrl: "https://www.starterstory.com/stories/sitegpt", sourceDate: "2023-10" }
mrr: { value: 15000, display: "~$15K MRR", label: founder-reported, sourceUrl: "https://www.starterstory.com/stories/sitegpt", sourceDate: "2023-10" }
totalRevenue: { value: null, display: "Not disclosed", label: not-disclosed }
revenueRange: 10k-50k
metrics:
  - { name: "MRR within first month", value: "$10K+", label: founder-reported, sourceUrl: "https://www.starterstory.com/stories/sitegpt", sourceDate: "2023-10" }
  - { name: "MRR lost to churn in month two", value: "~$5K", label: founder-reported, sourceUrl: "https://www.starterstory.com/stories/sitegpt", sourceDate: "2023-10" }
  - { name: "Launch-day visitors", value: "~15K", label: founder-reported, sourceUrl: "https://www.starterstory.com/stories/sitegpt", sourceDate: "2023-10" }
tldr: "SiteGPT is a chatbot trained on a company's website, spun out by Bhanu Teja Pachipulusu from a feature prototype in his blogging product. It passed $10K MRR within its first month after a March 2023 launch, lost about $5K to churn in month two, and reached about $15K MRR by October 2023 (all founder-reported). It was run by two founders with no employees."
faq:
  - q: "How much MRR does SiteGPT make?"
    a: "About $15K MRR as of October 2023 (founder-reported, Starter Story). Total revenue is not disclosed."
  - q: "How fast did SiteGPT grow?"
    a: "It passed $10K MRR within its first month, then lost about $5K MRR to churn in month two (founder-reported)."
  - q: "What is SiteGPT built with?"
    a: "Remix on Cloudflare Workers, Fauna as the database, OpenAI for answers and Pinecone for vector search."
  - q: "Does SiteGPT have a free plan?"
    a: "No. It was paid-only from day one, priced high enough to cover unpredictable API costs."
sources:
  - { title: "How my AI side project grew to $15K MRR in just a few months", url: "https://www.starterstory.com/stories/sitegpt", publisher: "Starter Story", date: "2023-10" }
  - { title: "From side hustle to AI star: SiteGPT's rise to $15K MRR", url: "https://www.indiehackers.com/post/from-side-hustle-to-ai-star-sitegpts-rise-to-15k-mrr-ff15fee186", publisher: "Indie Hackers" }
published: 2026-11-02
updated: 2026-11-02
---

SiteGPT began as a feature, not a company. In March 2023 Bhanu Teja Pachipulusu was running Feather, a blogging platform at around $4K MRR, and wondered whether his customers could chat with their own blogs. The feature looked too big to keep inside Feather, so he launched it on its own. Within a month SiteGPT passed $10K MRR, more than Feather had reached in a year ([founder-reported, Starter Story](https://www.starterstory.com/stories/sitegpt)).

## How did a blogging tool feature become SiteGPT?

Pachipulusu's Twitter timeline was full of AI content in March 2023, and he looked for a way to use it for Feather customers. Every one of them had a blog, so he started building a way for readers to chat with it. As he worked, he realised anyone with a website could use the same thing, and he spun it out.

SiteGPT is an AI chatbot platform: a business adds its website link, and SiteGPT creates a chatbot trained on all the content on that site. At launch that was the only feature. The plan was to improve it later, and only if people used it.

## What did it take to build SiteGPT in three weeks?

He built a bare-minimum version in two to three weeks and found the chat platform much harder than expected, with few resources available at the time, so he built everything from scratch. He also felt time pressure: every day he delayed the launch, he saw a similar product appear.

| Part | What SiteGPT used at launch |
|---|---|
| App framework | Remix |
| Hosting | Cloudflare Workers |
| Database | Fauna |
| AI | OpenAI |
| Vector search | Pinecone |
| Payments | Paddle |

Cloudflare and Fauna cost nothing extra because Feather already used them. The bills he worried about were OpenAI and Pinecone, so he priced SiteGPT a little high to avoid a surprise. He offered no free plan, because he knew he lacked the skills to convert free users into paying customers.

## How did one launch week bring 40,000 visitors?

Pachipulusu had about 10,000 Twitter followers and had built all his products in public for three and a half years. He teased the launch for days, then launched with a tweet on 30 March 2023. It took off. His first customers arrived within an hour, and about 15,000 people visited on launch day ([founder-reported, Starter Story](https://www.starterstory.com/stories/sitegpt)).

The week stacked up from there. A Show HN post reached the front page of Hacker News on 2 April. On 5 April he launched on Product Hunt with no planning and finished as the number one product of the day and number four of the week. Traffic passed 40,000 visitors in under a week. It was not all good news: after Hacker News, someone attacked both SiteGPT and Feather, and a Twitter friend had to show him how to detect and stop the attacks.

## How much revenue did SiteGPT make after the hype?

SiteGPT crossed $10K MRR in less than a month, then lost about $5K MRR to churn the next month, almost 50% of customers ([founder-reported, Starter Story](https://www.starterstory.com/stories/sitegpt)). Five months later it was hovering around $15K MRR, run by two founders with no employees. Total revenue is not disclosed.

| When (2023) | Milestone |
|---|---|
| March | Feature prototype inside Feather, then spun out |
| 30 March | Launch tweet; about 15,000 visitors on day one |
| Early April | Hacker News front page; number one on Product Hunt |
| First month | $10K+ MRR |
| Second month | About $5K MRR lost to churn |
| October | About $15K MRR |
| Source | [founder-reported, Starter Story](https://www.starterstory.com/stories/sitegpt) |

> "I quickly realized that the hype can get you only so far and now it’s time to try and find the real customers." — Bhanu Teja Pachipulusu ([founder-reported, Starter Story](https://www.starterstory.com/stories/sitegpt))

After the launch hype faded, signups started coming from real businesses with the problem SiteGPT solves. In October 2023 he said he was still searching for product-market fit.

## How does SiteGPT compare with Chatbase and My AskAI?

SiteGPT and [Chatbase](/cases/chatbase/) launched weeks apart in 2023 with nearly the same promise, a chatbot trained on your content, and both rode a viral tweet. The results show how much timing mattered. Chatbase went first and reached $64,000 MRR by May 2023 ([founder-reported, Indie Hackers](https://www.indiehackers.com/post/how-a-college-student-reached-64-000-mo-in-6-months-by-being-an-ai-first-mover-ba7981f6e1)). SiteGPT, launched in late March into a market already filling up, hit $10K MRR fast and then saw half its customers churn.

[My AskAI](/cases/my-askai/) took the third route. Instead of a chatbot on the website, it plugged into help desks like Intercom and Zendesk, and grew slowly through Google search rather than one big launch. Put side by side, the three cases suggest that a viral launch buys attention, but retention comes from a narrow buyer with a painful, recurring problem.

[Recall](/cases/recall/) is another small AI product that went viral, then had to fix retention after the launch spike faded.

## What can founders learn from SiteGPT?

- **Watch your own product for spin-offs.** SiteGPT was a Feather feature that turned out to be the bigger business.
- **Build in public before you need it.** Three and a half years of public building gave the launch tweet an audience.
- **Expect the launch spike to churn.** Half of SiteGPT's first-month customers left; real buyers came after the hype.
- **Price for unknown costs.** Paid-only plans set a little high protected the margin when API bills were unpredictable.
