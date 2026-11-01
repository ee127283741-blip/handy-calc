export const SITE_NAME = 'ProofedPrompts';
export const SITE_TAGLINE = 'Copy-ready AI prompts for design, video, images and writing, plus practical AI tutorials.';

export interface Subtopic { slug: string; name: string; description: string }
export interface KeyQuestion { q: string; a: string; href: string }
export interface Category {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string[];
  subtopics: Subtopic[];
  keyQuestions: KeyQuestion[];
  related: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'ai-costs',
    name: 'AI Plans & Costs',
    title: 'AI Plans & Costs: Subscriptions, API Pricing and Tokens',
    description: 'Understand AI subscription plans, API token pricing and monthly budgets, with official, dated price sources.',
    intro: [
      'AI pricing comes in two shapes: flat monthly subscriptions per person, and pay-as-you-go API pricing per million tokens. Which one is cheaper depends on how much text you send and how many people need access.',
      'The guides here link to official, dated price lists so you can budget with numbers you can check.',
    ],
    subtopics: [
      { slug: 'api-pricing', name: 'API pricing', description: 'What GPT, Claude and Gemini APIs cost per request, per day and per month.' },
      { slug: 'subscription-plans', name: 'Subscription plans', description: 'Monthly AI plans compared on price, limits and what you actually get.' },
      { slug: 'token-math', name: 'Token math', description: 'How text turns into tokens and how tokens turn into a bill.' },
      { slug: 'budgeting', name: 'Budgeting', description: 'Setting and tracking a realistic monthly AI budget for a team.' },
    ],
    keyQuestions: [
      { q: 'How much does an AI API cost per month?', a: 'Multiply monthly tokens by the per-million-token price for input and output separately.', href: '/guides/how-many-words-is-a-token/' },
      { q: 'Is a subscription cheaper than the API?', a: 'For light, occasional use the API is often cheaper; heavy daily users usually save with a plan.', href: '/guides/chatgpt-plus-vs-claude-pro-vs-google-ai-pro/' },
      { q: 'How many words is a token?', a: 'Roughly three quarters of an English word, but it varies by model and text.', href: '/guides/how-many-words-is-a-token/' },
    ],
    related: ['ai-tools', 'ai-business'],
  },
  {
    slug: 'ai-business',
    name: 'AI for Business',
    title: 'AI for Business: ROI, Rollout and Policies',
    description: 'Work out whether an AI rollout pays for itself, roll it out in stages and write simple usage rules.',
    intro: [
      'Before paying for AI seats across a team, it helps to know whether the time saved is worth more than the cost. This section covers the business case, how to roll AI out, and the policies that keep it safe.',
    ],
    subtopics: [
      { slug: 'roi', name: 'ROI & business case', description: 'Turning time saved into payback periods and net benefit you can show a manager.' },
      { slug: 'adoption', name: 'Adoption & rollout', description: 'Introducing AI tools to a team in stages, with training and clear expectations.' },
      { slug: 'governance', name: 'Policies & governance', description: 'Simple written rules for which AI tools staff may use and for what.' },
    ],
    keyQuestions: [
      { q: 'Does AI pay for itself in a small business?', a: 'Usually, if each person saves even an hour a month, but check with your own wage and usage numbers.', href: '/guides/ai-time-savings-small-business-roi/' },
      { q: 'Do we need a written AI policy?', a: 'Yes, even a one-page list of approved tools and data that must never be pasted in prevents most problems.', href: '/guides/ai-acceptable-use-policy-template/' },
    ],
    related: ['ai-costs', 'ai-privacy'],
  },
  {
    slug: 'ai-productivity',
    name: 'AI Productivity',
    title: 'AI Productivity Guides',
    description: 'Practical, tested advice for using AI tools in everyday office work.',
    intro: [
      'AI assistants are most useful for routine office work: drafting, summarising, tidying data and finding information. These guides focus on everyday tasks and on checking the results.',
    ],
    subtopics: [
      { slug: 'writing', name: 'Email & writing', description: 'Drafting, rewriting and proofreading emails and documents with AI.' },
      { slug: 'meetings', name: 'Meetings & notes', description: 'Summaries, action items and notes from meetings and calls.' },
      { slug: 'spreadsheets', name: 'Spreadsheets & data', description: 'Formulas, clean-up and quick analysis of spreadsheet data.' },
      { slug: 'research', name: 'Research', description: 'Using AI to find, compare and summarise information, and checking sources.' },
    ],
    keyQuestions: [
      { q: 'How long a document can I paste into an AI tool?', a: 'It depends on the context window, which is measured in tokens rather than words.', href: '/guides/how-many-words-is-a-token/' },
      { q: 'How much time does AI save on office tasks?', a: 'Drafting and summarising usually save the most time; see the worked example.', href: '/guides/ai-time-savings-small-business-roi/' },
    ],
    related: ['prompting', 'ai-tools'],
  },
  {
    slug: 'prompting',
    name: 'Prompting Tutorials',
    title: 'Prompting Tutorials: How to Write Prompts That Work',
    description: 'Step-by-step tutorials on writing clear AI prompts, with reusable templates and before-and-after examples.',
    intro: [
      'A good prompt says who the output is for, what it should contain and what format it should take. These tutorials teach those habits with worked examples you can adapt.',
      'For ready-made prompts, browse the prompt library; to expand a rough idea into a detailed brief, use Idea → Prompt.',
    ],
    subtopics: [
      { slug: 'prompt-basics', name: 'Prompt basics', description: 'The few habits that make AI answers more useful: context, constraints and examples.' },
      { slug: 'office-templates', name: 'Office templates', description: 'Fill-in-the-blank prompts for emails, reports, job ads and other office documents.' },
    ],
    keyQuestions: [
      { q: 'What makes a good AI prompt?', a: 'A clear task, the context the model cannot guess, the format you want and an example if you have one.', href: '/guides/how-to-write-a-good-ai-prompt/' },
      { q: 'Are there ready-made prompts I can copy?', a: 'Yes: the prompt library has detailed prompts with marked variables for design, video, images and writing.', href: '/prompts/' },
      { q: 'How do I turn a vague idea into a detailed prompt?', a: 'Describe the idea in a sentence, pick a category and style, and let Idea → Prompt expand it into a full spec.', href: '/idea-to-prompt/' },
    ],
    related: ['ai-productivity', 'ai-tools'],
  },
  {
    slug: 'ai-tools',
    name: 'Choosing AI Tools',
    title: 'Choosing AI Tools: Comparisons & Checklists',
    description: 'Compare AI chat assistants and plans, and evaluate tools before your team commits.',
    intro: [
      'ChatGPT, Claude and Gemini overlap a lot, and their plans change often. This section compares assistants and plans on price and features, and gives a checklist for evaluating any AI tool.',
    ],
    subtopics: [
      { slug: 'assistants-compared', name: 'Chat assistants compared', description: 'ChatGPT, Claude, Gemini and others side by side on price and features.' },
      { slug: 'plan-selection', name: 'Plan selection', description: 'Choosing between free, individual, team and API access for your usage.' },
      { slug: 'evaluation', name: 'Tool evaluation checklists', description: 'Questions to ask about cost, data handling and accuracy before adopting a tool.' },
    ],
    keyQuestions: [
      { q: 'Which AI subscription is worth it?', a: 'The paid plans are priced alike; choose on the features and limits you use most.', href: '/guides/chatgpt-plus-vs-claude-pro-vs-google-ai-pro/' },
      { q: 'Should my team use a plan or the API?', a: 'Compare your expected monthly usage against per-seat prices; light users are often cheaper on the API.', href: '/guides/chatgpt-plus-vs-claude-pro-vs-google-ai-pro/' },
    ],
    related: ['ai-costs', 'ai-privacy'],
  },
  {
    slug: 'ai-privacy',
    name: 'AI Privacy & Safety at Work',
    title: 'AI Privacy & Safety at Work',
    description: 'Keep company and customer data safe with AI tools, and check AI output before you rely on it.',
    intro: [
      'Using AI at work means deciding what data you can paste in and how to check what comes back. This section covers privacy settings, handling sensitive data and verifying AI output.',
    ],
    subtopics: [
      { slug: 'privacy-settings', name: 'Data privacy settings', description: 'Where to find and set training, history and retention options in common AI tools.' },
      { slug: 'sensitive-data', name: 'Sensitive data handling', description: 'What not to paste into AI tools, and safer ways to work with personal or confidential data.' },
      { slug: 'accuracy', name: 'Accuracy & checking output', description: 'Spotting mistakes and made-up facts, and building a quick review step.' },
    ],
    keyQuestions: [
      { q: 'Do business AI plans train on my data?', a: 'Business and API plans generally exclude your data from training by default; check each provider.', href: '/guides/chatgpt-plus-vs-claude-pro-vs-google-ai-pro/' },
      { q: 'Should I count checking time in AI ROI?', a: 'Yes. Reviewing output takes time and belongs in any honest estimate.', href: '/guides/ai-time-savings-small-business-roi/' },
      { q: 'Is it safe to paste company data into ChatGPT?', a: 'Only on a plan with training turned off, and never passwords, personal data or anything under NDA.', href: '/guides/is-it-safe-to-put-company-data-in-chatgpt/' },
    ],
    related: ['ai-business', 'ai-tools'],
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [string, ...string[]];
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug)!;

export interface PromptCategory { slug: string; name: string; description: string; intro: string }

/** Prompt library categories, at /prompts/<slug>/. */
export const PROMPT_CATEGORIES: PromptCategory[] = [
  { slug: 'web-design', name: 'Web Design', description: 'Prompts for websites, landing pages, UI screens and brand identity, with palettes, type and layout spelled out.', intro: 'Design prompts work best when they read like a brief: who the page is for, what it must do, and the exact colours, fonts and spacing to use. Each prompt here gives the model that structure and leaves the specifics to your variables.' },
  { slug: 'visual-effects', name: 'Visual Effects', description: 'Prompts for CSS and WebGL visual effects: gradients, glass, grain, glow, particles and shaders.', intro: 'Visual effects are easy to overdo. These prompts ask for a specific effect, a performance budget and a fallback for older devices and reduced-motion users, so the result is usable on a real site.' },
  { slug: 'interaction', name: 'Interaction', description: 'Prompts for interactive UI patterns: hover states, forms, drag and drop, menus and micro-interactions.', intro: 'Interaction prompts need states: default, hover, focus, active, disabled, loading and error. Each prompt here lists them, plus keyboard and screen-reader behaviour, so the model does not skip the hard parts.' },
  { slug: 'motion', name: 'Motion & Animation', description: 'Prompts for UI motion, logo animation and scroll-driven sequences with exact durations and easings.', intro: 'Good motion prompts give numbers: durations in milliseconds, easing curves, stagger delays and what happens when the user prefers reduced motion. These prompts make those decisions explicit.' },
  { slug: 'video-editing', name: 'Video Editing', description: 'Prompts for planning and editing videos: edit decision lists, captions, b-roll, pacing and repurposing.', intro: 'An AI model cannot watch your footage, but it can plan the edit, write captions, structure a script and suggest where cuts and b-roll go. These prompts turn a rough idea or transcript into a concrete edit plan.' },
  { slug: 'camera-moves', name: 'Camera Moves', description: 'Prompts for AI video generators and shot planning: dolly, orbit, crane, push-in and handheld moves with timing.', intro: 'AI video tools respond to film language. These prompts name the move, the lens, the speed and the start and end frames, so tools such as Runway, Sora, Veo or Kling produce the shot you pictured.' },
  { slug: 'image-generation', name: 'Image Generation', description: 'Prompts for product shots, portraits, illustrations and scenes, with composition, lens, light and negative prompts.', intro: 'Image models reward specific nouns and photographic terms. Each prompt here fixes subject, composition, lens, lighting, palette and aspect ratio, and includes a negative prompt for the usual artefacts.' },
  { slug: 'writing', name: 'Writing', description: 'Prompts for copywriting, emails, articles, product descriptions and social posts in a set voice and length.', intro: 'Writing prompts fail when they leave out the reader. These prompts always state audience, voice, structure, length and the single action you want the reader to take.' },
  { slug: 'industry', name: 'Industry', description: 'Prompts for specific industries: restaurants, real estate, healthcare clinics, law firms, retail and more.', intro: 'Industry prompts bake in what matters in that trade: regulations to respect, terms customers use and the documents people actually need. Fill in the variables and check facts before you publish.' },
];
export const PROMPT_CATEGORY_SLUGS = PROMPT_CATEGORIES.map((c) => c.slug) as [string, ...string[]];
export const getPromptCategory = (slug: string) => PROMPT_CATEGORIES.find((c) => c.slug === slug)!;
