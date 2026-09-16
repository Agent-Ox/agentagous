// GENERATED FILE — do not edit by hand.
// Source: guides/content/*.md front-matter.
// Regenerate with: python3 guides/build_catalogue.py

import type { Guide } from './guides';

export const GENERATED_GUIDES: Guide[] = [
  { slug: 'agentic-economy', title: 'WTF is the Agentic Economy', description: 'The big picture. What actually happened in 2026, who the players are, what is real and what is hype. Start here.', price: 7, badge: '🌍 Start here', featured: true, category: 'foundation', file: 'wtf-is-the-agentic-economy.pdf', starter: true },
  { slug: 'ai-agent', title: 'WTF is an AI Agent', description: 'What an agent actually is, how it thinks, the main types, real examples, and the risks. The foundation for everything else in the series.', price: 7, badge: null, featured: false, category: 'foundation', file: 'wtf-is-an-ai-agent.pdf', starter: true },
  { slug: 'api', title: 'WTF is an API', description: 'The thing connecting everything in the agentic economy — explained simply, finally.', price: 7, badge: null, featured: false, category: 'foundation', file: 'wtf-is-an-api.pdf', starter: false },
  { slug: 'llm', title: 'WTF is an LLM', description: 'Large language models are the engine behind every AI company. Here\'s how they actually work.', price: 7, badge: null, featured: false, category: 'foundation', file: 'wtf-is-an-llm.pdf', starter: true },
  { slug: 'polsia', title: 'WTF is Polsia', description: 'The one-person startup that raised $30M to let AI run your company. What is real, what it costs, and who it is actually for.', price: 7, badge: '🔥 Most popular', featured: true, category: 'platforms', file: 'wtf-is-polsia.pdf', starter: false, relatedTool: 'polsia' },
  { slug: 'openclaw', title: 'WTF is OpenClaw', description: 'The open-source personal agent with millions of users. The wild origin story, the security warnings, and where it stands now.', price: 7, badge: null, featured: false, category: 'platforms', file: 'wtf-is-openclaw.pdf', starter: false, relatedTool: 'openclaw' },
  { slug: 'paperclip', title: 'WTF is Paperclip', description: 'The open-source app for managing a team of AI agents like a company: org chart, budgets, approvals. What it is, what it is not, and who should run it.', price: 7, badge: '🧑‍💼 Agent teams', featured: false, category: 'platforms', file: 'wtf-is-paperclip.pdf', starter: false },
  { slug: 'anthropic', title: 'WTF is Anthropic', description: 'The company behind Claude. Founding story, the safety mission, the trillion-dollar valuation, and why its model powers so much of the agentic economy.', price: 7, badge: null, featured: false, category: 'claude', file: 'wtf-is-anthropic.pdf', starter: false },
  { slug: 'claude', title: 'WTF is Claude', description: 'Anthropic\'s AI model. The family, the new Fable and Mythos tier, what it can do, and why it powers so many agents — including rivals\' products.', price: 7, badge: null, featured: false, category: 'claude', file: 'wtf-is-claude.pdf', starter: true },
  { slug: 'claude-code', title: 'WTF is Claude Code', description: 'The autonomous developer that changed Anthropic\'s trajectory. How it works, how it compares, and how non-developers are using it now.', price: 7, badge: null, featured: false, category: 'claude', file: 'wtf-is-claude-code.pdf', starter: false },
  { slug: 'cowork', title: 'WTF is Cowork', description: 'Claude Code was for developers. Cowork is for everyone else. What it does, what it costs, and how it changed the work-agent market.', price: 7, badge: null, featured: false, category: 'claude', file: 'wtf-is-cowork.pdf', starter: false },
  { slug: 'hire-agent', title: 'How to Hire an AI Agent for Your Business', description: 'The practical guide. Pick the task, pick the agent, write the brief, start read-only, measure honestly. No code, no prior AI experience.', price: 7, badge: '💼 Practical', featured: false, category: 'practical', file: 'how-to-hire-an-ai-agent.pdf', starter: true },
];

import type { Bundle } from './guides';

/** Bundle copy and prices. Membership is derived in guides.ts. */
export const GENERATED_BUNDLES: Omit<Bundle, 'includes'>[] = [
  { slug: 'starter-pack', title: 'The Agentic Economy Starter Pack', description: 'The five guides that take you from "WTF is going on" to hiring your first agent.', price: 29, file: 'agentic-economy-starter-pack.pdf' },
  { slug: 'complete-pack', title: 'The Complete WTF Agents Pack', description: 'Everything. The full picture of the agentic economy, the platforms, the AI, and how to use it.', price: 49, file: 'complete-wtf-agents-pack.pdf' },
];
