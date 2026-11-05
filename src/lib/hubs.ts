// Editorial intro copy for /industries/<slug>/ and /types/<slug>/ hubs. Qualitative only:
// no figures in this file (hubs.test.ts enforces it). Numbers on hub pages come from case frontmatter.
export interface HubCopy {
  /** Used in titles and FAQ questions: "<phrase> startups". */
  phrase: string;
  overview: string;
  money: string;
}

export const INDUSTRY_HUBS: Record<string, HubCopy> = {
  'creative-media': {
    phrase: 'AI creative and media',
    overview: 'These products turn prompts, clips and voice samples into images, video, audio and music. The group runs from solo-founder photo apps to venture-backed model companies, so the same page can show very different scales of business.',
    money: 'Tiered subscriptions dominate: ElevenLabs, HeyGen, Runway and Synthesia publish ladders that start free and end at custom enterprise deals. Lensa AI also sold one-off avatar packs alongside an annual plan.',
  },
  productivity: {
    phrase: 'AI productivity',
    overview: 'This is the broadest group on the site: meeting notetakers, voice dictation, document chat, presentation builders, spreadsheet helpers and general assistants. Many are small products that sit on top of third-party models, next to a few heavily funded companies.',
    money: 'Free tiers that lead to a monthly plan are the default, as with Cluely, PDF.ai and Talknotes. The exceptions are the instructive part: TypingMind sold one-time licences and had users bring their own API key, Lychee offered lifetime plans, Magai varies its plans only by usage volume, and Humane paired a hardware sale with a monthly subscription.',
  },
  'developer-tools': {
    phrase: 'AI developer tools',
    overview: 'These are AI coding agents, code editors, "vibe coding" app builders and the infrastructure beneath them. Buyers range from professional engineers to people who have never written code, which shapes both pricing and how durable revenue is likely to be.',
    money: 'Most sell individual subscriptions with a separate team price per user, as Cursor, Replit and Windsurf do. Emergent describes a mix of subscriptions, usage-based pricing and hosting fees. n8n pairs a free self-hosted edition with paid cloud plans, so the open-source product works as the funnel.',
  },
  'customer-support': {
    phrase: 'AI customer support',
    overview: 'These companies build chatbots and agents that answer customers using a business\'s own content. Small self-serve widgets and enterprise agent platforms sit in the same category but sell in very different ways.',
    money: 'Self-serve products sell plans: Chatbase has subscription tiers, My AskAI adds usage costs based on conversation volume, and SiteGPT has been paid-only with no free plan. At the enterprise end, Sierra charges for outcomes, meaning completed work rather than seats, without publishing its rates.',
  },
  'marketing-advertising': {
    phrase: 'AI marketing and advertising',
    overview: 'These tools write copy, generate ad creative, grow social accounts and chase search visibility. Most are SaaS products, and the group runs from solo projects to funded companies.',
    money: 'Pricing here varies more than in most groups. Jasper charges per seat and Arcads sells usage-based plans, while Leadmore AI uses refundable credits and FounderPal sold one-time payments. TryNearby is closer to a service, charging each restaurant a monthly fee for local creator videos.',
  },
  education: {
    phrase: 'AI education',
    overview: 'These products serve students, researchers and language learners, with tools for note-taking, academic writing, research search and spoken practice.',
    money: 'Consumer subscriptions are the visible model: Textero is freemium with paid subscriptions and Turbo AI sells a monthly student plan. Most other cases in this group do not disclose their pricing, so check each case before assuming a model applies to the whole category.',
  },
  'health-fitness': {
    phrase: 'AI health and fitness',
    overview: 'Two different markets share this page: consumer apps for nutrition, training and habits, and clinical software for doctors and health systems. Compare within those two markets rather than across them.',
    money: 'Consumer apps such as Hockey AI, PepAI and Wrestle AI sell monthly or discounted yearly subscriptions. On the clinical side, Freed sells tiered plans to clinicians, while OpenEvidence is free for verified US clinicians and earns its revenue from advertising.',
  },
  'beauty-lifestyle': {
    phrase: 'AI beauty and lifestyle',
    overview: 'These consumer apps deal with appearance, attraction and personal style. Public evidence is thin in this small group, so the labels matter as much as the figures.',
    money: 'The sourced examples are direct consumer payments: Umax sells a weekly subscription and Plinq charges per report. Fitted and Glam Up do not disclose pricing. Treat revenue claims here with care and read each figure\'s label.',
  },
  'careers-hr': {
    phrase: 'AI careers and HR',
    overview: 'This group covers job-application tools, professional headshots, workforce software and an expert marketplace. The buyers differ, from individual job seekers to employers, so compare like with like.',
    money: 'AiApply sells a monthly subscription and BetterPic sells one-off packages suited to a one-time need. Mercor works differently as a marketplace, and its figure is a gross run rate rather than net revenue, so it is not directly comparable with the subscription products here.',
  },
  'sales-lead-generation': {
    phrase: 'AI sales and lead generation',
    overview: 'These tools find prospects, enrich data and automate outreach, and some are pitched as AI sales agents. Compare them by what they automate, since the group mixes data tools, sending tools and AI agents.',
    money: 'Subscriptions are standard. Clay runs from a free plan through paid plans to custom enterprise contracts, and Gojiberry AI offers monthly and annual plans with a free trial. Instantly chose unlimited accounts over per-seat pricing, a positioning choice as much as a pricing one. Several others do not disclose prices.',
  },
  'legal-professional-services': {
    phrase: 'AI legal and professional services',
    overview: 'These companies sell to law firms, in-house teams and claimants. The group includes both enterprise platforms and small niche products.',
    money: 'Public pricing is rare in this group. EchoBase AI is the sourced example, charging enterprise clients a monthly fee. Harvey, Legora and EvenUp do not disclose pricing in our cases.',
  },
  'real-estate-home': {
    phrase: 'AI real estate and home',
    overview: 'These products restyle rooms and stage property photos with AI. There are only a few cases so far, but both show how a narrow visual job can be enough to support a business.',
    money: 'Both cases rely on subscriptions. Interior AI is paid-only after removing its free version because of abuse, and Virtual Staging AI sells monthly plans to people who list property.',
  },
  'search-assistants': {
    phrase: 'AI search and assistant',
    overview: 'These are answer engines and assistants that search and cite sources, on the open web or inside a company. They compete with far larger incumbents, so the revenue figures here deserve a close look at their labels and dates.',
    money: 'Perplexity combines a free tier, paid consumer plans and enterprise seats. Glean sells to companies, with consumption-based pricing or a per-user fee plus model usage, without publishing rates. Genspark does not disclose its pricing in our case.',
  },
  'finance-investment': {
    phrase: 'AI finance and investment research',
    overview: 'These tools help analysts at banks, investment firms and asset managers work through large sets of documents. This is a very small group on the site for now, so treat it as examples rather than a market view.',
    money: 'Hebbia sells annual seats, and its seat prices are a third-party estimate rather than a company list price. FrameSage does not disclose its pricing. Per-seat annual pricing is the only model we can document here.',
  },
  ecommerce: {
    phrase: 'AI e-commerce',
    overview: 'These tools help online sellers and retail brands with product research, product imagery and on-demand production. The companies here range widely in size.',
    money: 'Launch Fast sells monthly plans with no free tier, while Photoroom pairs a free tier with paid plans billed yearly. Lumoo and Six Atomic do not disclose pricing in our cases. Lumoo reports in euros, so it is listed apart from the US dollar order.',
  },
};

export const TYPE_HUBS: Record<string, HubCopy> = {
  saas: {
    phrase: 'AI SaaS',
    overview: 'Subscription web software is by far the most common form in this library, from one-person products to companies with enterprise sales teams. Because the group spans so many markets, the industry pages are often the fairer comparison.',
    money: 'Recurring plans are the core, usually with free or trial entry and a team or enterprise tier on top. Usage is the common variation: credits, conversation volume or consumption, because serving AI models has a real cost per use. Sierra goes further by charging for completed work.',
  },
  app: {
    phrase: 'AI app',
    overview: 'This group covers mobile apps, desktop apps, browser extensions and a piece of hardware. Most of the sourced pricing here is a consumer subscription, so compare them on plan length as well as price.',
    money: 'Consumer subscriptions lead, often monthly with a discounted yearly option, as with Hockey AI, PepAI and Wrestle AI. Umax charges weekly and Flowfy uses in-app purchases. Humane is the outlier, combining a device sale with a monthly subscription.',
  },
  tool: {
    phrase: 'AI tool',
    overview: 'Single-purpose utilities do one job well. There is only a small number of these on the site, so this page shows examples rather than a pattern.',
    money: 'Formula Bot is the case filed here: a free monthly allowance of formula requests, then a low-priced monthly plan for unlimited use.',
  },
  service: {
    phrase: 'AI service',
    overview: 'These businesses sell a result or a marketplace, not software people operate themselves.',
    money: 'TryNearby charges each restaurant a fixed monthly fee for local creator videos. Mercor is a marketplace for AI experts, and its figure is a gross run rate rather than net revenue, so read the two cases differently.',
  },
  content: {
    phrase: 'AI content',
    overview: 'This group is reserved for newsletters, courses and media businesses built on AI. No case is filed here yet, because we only publish a case once there is a public, sourced number to cite.',
    money: 'Not disclosed: with no cases in this group yet, we have no sourced business models to report.',
  },
};
