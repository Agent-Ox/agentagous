/**
 * The tools the guides tell a reader to actually buy.
 *
 * Built from solo-stack.md (the seven seats), hire-agent.md and the platform
 * guides. Each `one_line` is taken or adapted from the guide text, never
 * invented. `affiliate_url` is preferred over `url` when present; both go out
 * through /go/<slug> so the click is logged.
 */
export type ToolCategory =
  | 'AI plans'
  | 'Voice'
  | 'Video'
  | 'Images & design'
  | 'Decks & docs'
  | 'Research'
  | 'Automation'
  | 'Company platforms';

export const TOOL_CATEGORIES: ToolCategory[] = [
  'AI plans',
  'Company platforms',
  'Voice',
  'Video',
  'Images & design',
  'Decks & docs',
  'Research',
  'Automation',
];

export type Tool = {
  slug: string;
  name: string;
  category: ToolCategory;
  /** ≤ 90 characters, from the guide text. */
  one_line: string;
  url: string;
  affiliate_url?: string;
  guide_slug?: string;
};

export const TOOLS: Tool[] = [
  // ── AI plans: the first thing the guides tell you to buy ───────────
  { slug: 'claude-pro', name: 'Claude Pro', category: 'AI plans', guide_slug: 'claude',
    one_line: 'The $20 plan that fills three seats — research, documents, code — and adds Cowork.',
    url: 'https://claude.ai/upgrade' },
  { slug: 'chatgpt-plus', name: 'ChatGPT Plus', category: 'AI plans', guide_slug: 'chatgpt-work',
    one_line: 'The $20 entry point, with all three model tiers selectable per task in Work.',
    url: 'https://chatgpt.com' },
  { slug: 'gemini', name: 'Google Gemini', category: 'AI plans', guide_slug: 'which-ai',
    one_line: 'Strongest where you already live in Search, Android and Workspace.',
    url: 'https://gemini.google.com' },

  // ── Company platforms ──────────────────────────────────────────────
  { slug: 'polsia', name: 'Polsia', category: 'Company platforms', guide_slug: 'polsia',
    one_line: 'Subscribe, describe an idea, and a fixed team of agents builds and runs it.',
    url: 'https://polsia.com' },
  { slug: 'nanocorp', name: 'NanoCorp', category: 'Company platforms', guide_slug: 'nanocorp',
    one_line: 'The rival that publishes what its companies actually earn. Honest, fast tests.',
    url: 'https://nanocorp.ai' },
  { slug: 'paperclip', name: 'Paperclip', category: 'Company platforms', guide_slug: 'paperclip',
    one_line: 'Own it yourself: roles, budgets and approvals for a team of agents, self-hosted.',
    url: 'https://paperclip.dev' },
  { slug: 'openclaw', name: 'OpenClaw', category: 'Company platforms', guide_slug: 'openclaw',
    one_line: 'The open-source personal agent you run on your own machine.',
    url: 'https://openclaw.ai' },

  // ── Voice ──────────────────────────────────────────────────────────
  { slug: 'elevenlabs', name: 'ElevenLabs', category: 'Voice', guide_slug: 'elevenlabs',
    one_line: 'The standard for synthetic speech. Starter is $6; Creator at $22 is the real tier.',
    url: 'https://elevenlabs.io' },

  // ── Video ──────────────────────────────────────────────────────────
  { slug: 'higgsfield', name: 'Higgsfield', category: 'Video', guide_slug: 'higgsfield',
    one_line: 'Fifty models behind one chat agent, and since September an open pay-per-use API.',
    url: 'https://higgsfield.ai' },
  { slug: 'runway', name: 'Runway', category: 'Video', guide_slug: 'runway',
    one_line: 'The VFX seat — the most control, for anyone whose video is the product.',
    url: 'https://runway.com' },
  { slug: 'heygen', name: 'HeyGen', category: 'Video', guide_slug: 'heygen',
    one_line: 'The presenter seat: script in, avatar out, dubbed into 175+ languages with lip-sync.',
    url: 'https://www.heygen.com' },
  { slug: 'synthesia', name: 'Synthesia', category: 'Video', guide_slug: 'solo-stack',
    one_line: 'The other avatar-video option named in the stack.',
    url: 'https://www.synthesia.io' },

  // ── Images & design ────────────────────────────────────────────────
  { slug: 'canva', name: 'Canva', category: 'Images & design', guide_slug: 'solo-stack',
    one_line: 'The default design tool for non-designers, with generation built in.',
    url: 'https://www.canva.com' },
  { slug: 'figma', name: 'Figma', category: 'Images & design', guide_slug: 'solo-stack',
    one_line: 'For anyone who wants precision rather than a template.',
    url: 'https://www.figma.com' },
  { slug: 'midjourney', name: 'Midjourney', category: 'Images & design', guide_slug: 'solo-stack',
    one_line: 'Still the quality benchmark for standalone image generation.',
    url: 'https://www.midjourney.com' },

  // ── Decks & docs ───────────────────────────────────────────────────
  { slug: 'gamma', name: 'Gamma', category: 'Decks & docs', guide_slug: 'solo-stack',
    one_line: 'A brief becomes a deck, a one-pager or a landing page. Its API is now GA.',
    url: 'https://gamma.app' },

  // ── Research ───────────────────────────────────────────────────────
  { slug: 'perplexity', name: 'Perplexity', category: 'Research', guide_slug: 'solo-stack',
    one_line: 'Sourced, current answers with citations. The specialist for the research seat.',
    url: 'https://www.perplexity.ai' },

  // ── Automation ─────────────────────────────────────────────────────
  { slug: 'zapier', name: 'Zapier', category: 'Automation', guide_slug: 'solo-stack',
    one_line: 'The easiest: when a form is submitted, classify it, route it, notify you.',
    url: 'https://zapier.com' },
  { slug: 'n8n', name: 'n8n', category: 'Automation', guide_slug: 'solo-stack',
    one_line: 'The same, open-source and self-hosted, for anyone who wants to own the workflow.',
    url: 'https://n8n.io' },
  { slug: 'lindy', name: 'Lindy', category: 'Automation', guide_slug: 'solo-stack',
    one_line: 'A level up: inbox triage, meeting follow-ups and CRM hygiene without a trigger.',
    url: 'https://www.lindy.ai' },
];

export const toolBySlug = (slug: string) => TOOLS.find(t => t.slug === slug);

/** Where a /go/<slug> click should land: the affiliate link when there is one. */
export const toolDestination = (t: Tool) => t.affiliate_url || t.url;

export function toolsByCategory(): { category: ToolCategory; items: Tool[] }[] {
  return TOOL_CATEGORIES.map(category => ({ category, items: TOOLS.filter(t => t.category === category) }))
    .filter(g => g.items.length > 0);
}
