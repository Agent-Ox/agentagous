/**
 * Every company, product and standard named across the guides.
 *
 * Built from whos-who.md — which is the map the guides themselves use — then
 * swept against the other 22. Each `one_line` is taken or adapted from the
 * guide text, never invented: if the guides do not describe something, it is
 * not here. `guide_slug` is set only where a full guide covers it.
 *
 * Layer order is the order the layers are shown on /companies, and matches the
 * stack the guides describe: models at the bottom, picks and shovels beneath
 * everything.
 */
export type Layer =
  | 'Labs & models'
  | 'Work agents'
  | 'Coding agents'
  | 'Personal agents'
  | 'Company platforms'
  | 'Enterprise'
  | 'Plumbing'
  | 'Picks & shovels';

export const LAYERS: Layer[] = [
  'Labs & models',
  'Work agents',
  'Coding agents',
  'Personal agents',
  'Company platforms',
  'Enterprise',
  'Plumbing',
  'Picks & shovels',
];

export type Company = {
  slug: string;
  name: string;
  layer: Layer;
  /** ≤ 90 characters, from the guide text. */
  one_line: string;
  url: string;
  guide_slug?: string;
};

export const COMPANIES: Company[] = [
  // ── Labs & models ──────────────────────────────────────────────────
  { slug: 'anthropic', name: 'Anthropic', layer: 'Labs & models', guide_slug: 'anthropic',
    one_line: 'Safety-founded lab, now the most valuable private company on earth.',
    url: 'https://www.anthropic.com' },
  { slug: 'claude', name: 'Claude', layer: 'Labs & models', guide_slug: 'claude',
    one_line: 'Anthropic’s model family: Fable, Opus, Sonnet, Haiku, and the restricted Mythos.',
    url: 'https://claude.ai' },
  { slug: 'openai', name: 'OpenAI', layer: 'Labs & models',
    one_line: 'ChatGPT is still the product most people have used. Its reach is its weapon.',
    url: 'https://openai.com' },
  { slug: 'google-deepmind', name: 'Google DeepMind', layer: 'Labs & models',
    one_line: 'Gemini, Jules and Auto Browse. Owns Search, Android and Workspace; invented A2A.',
    url: 'https://deepmind.google' },
  { slug: 'meta', name: 'Meta', layer: 'Labs & models',
    one_line: 'A new model family and a personal agent of the same name, delivered in WhatsApp.',
    url: 'https://ai.meta.com' },
  { slug: 'xai', name: 'xAI', layer: 'Labs & models',
    one_line: 'Elon Musk’s lab, now inside SpaceX alongside Cursor. Makes Grok and Grok Bot.',
    url: 'https://x.ai' },
  { slug: 'spacex', name: 'SpaceX', layer: 'Labs & models',
    one_line: 'Acquired xAI in February and the coding tool Cursor in June.',
    url: 'https://www.spacex.com' },
  { slug: 'microsoft', name: 'Microsoft', layer: 'Labs & models',
    one_line: 'Not a frontier lab but the biggest distributor: Copilot Cowork, Studio, Foundry.',
    url: 'https://www.microsoft.com/ai' },
  { slug: 'mistral', name: 'Mistral', layer: 'Labs & models',
    one_line: 'France’s lab. Europe’s answer to US and Chinese dependence.',
    url: 'https://mistral.ai' },
  { slug: 'deepseek', name: 'DeepSeek', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'The cheap-to-train breakthrough that made this a two-continent race. Open, MIT.',
    url: 'https://www.deepseek.com' },
  { slug: 'alibaba-qwen', name: 'Alibaba — Qwen', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'The most-downloaded open models in the world. Over a billion downloads.',
    url: 'https://qwen.ai' },
  { slug: 'moonshot-kimi', name: 'Moonshot AI — Kimi', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'Competes on coding quality and shipping speed. K3 was the largest open model.',
    url: 'https://www.moonshot.cn' },
  { slug: 'zhipu-glm', name: 'Zhipu — GLM', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'Leads the Chinese field on independent coding and agent leaderboards.',
    url: 'https://z.ai' },
  { slug: 'minimax', name: 'MiniMax', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'Part of a deep Chinese field, competing on efficient models.',
    url: 'https://www.minimax.io' },
  { slug: 'tencent-hunyuan', name: 'Tencent Hunyuan', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'A platform owner with enormous AI-exposed market value behind its model line.',
    url: 'https://hunyuan.tencent.com' },
  { slug: 'bytedance', name: 'ByteDance', layer: 'Labs & models', guide_slug: 'china-ai',
    one_line: 'The other Chinese platform owner with a frontier model programme.',
    url: 'https://www.bytedance.com' },

  // ── Work agents ────────────────────────────────────────────────────
  { slug: 'cowork', name: 'Cowork', layer: 'Work agents', guide_slug: 'cowork',
    one_line: 'Claude working in your files, apps and its own browser. In every paid plan.',
    url: 'https://claude.ai' },
  { slug: 'chatgpt-work', name: 'ChatGPT Work', layer: 'Work agents', guide_slug: 'chatgpt-work',
    one_line: 'Give it an outcome; it returns finished spreadsheets, decks and web apps.',
    url: 'https://chatgpt.com' },
  { slug: 'copilot-cowork', name: 'Copilot Cowork', layer: 'Work agents',
    one_line: 'Cowork inside Microsoft 365, across Outlook, Teams, SharePoint and Excel.',
    url: 'https://copilot.microsoft.com' },
  { slug: 'grok-bot', name: 'Grok Bot', layer: 'Work agents', guide_slug: 'grok-bot',
    one_line: 'A team of named agents sharing one cloud computer, working while you sleep.',
    url: 'https://x.ai' },
  { slug: 'microsoft-scout', name: 'Microsoft Scout', layer: 'Work agents',
    one_line: 'An always-on personal agent inside Copilot, in limited release.',
    url: 'https://copilot.microsoft.com' },
  { slug: 'gemini-agent', name: 'Gemini Agent', layer: 'Work agents',
    one_line: 'Where Google’s browser agent went after Project Mariner was folded in.',
    url: 'https://gemini.google.com' },

  // ── Coding agents ──────────────────────────────────────────────────
  { slug: 'claude-code', name: 'Claude Code', layer: 'Coding agents', guide_slug: 'claude-code',
    one_line: 'The autonomous developer. The fastest-adopted developer tool of its generation.',
    url: 'https://claude.ai/code' },
  { slug: 'codex', name: 'Codex', layer: 'Coding agents', guide_slug: 'codex',
    one_line: 'OpenAI’s coding agent, now a tab inside the ChatGPT desktop app.',
    url: 'https://chatgpt.com/codex' },
  { slug: 'devin', name: 'Devin', layer: 'Coding agents',
    one_line: 'The original “AI software engineer”, cloud-hosted, cut from $500 to $20 a month.',
    url: 'https://devin.ai' },
  { slug: 'cognition', name: 'Cognition', layer: 'Coding agents',
    one_line: 'The company behind Devin.',
    url: 'https://cognition.ai' },
  { slug: 'jules', name: 'Jules', layer: 'Coding agents',
    one_line: 'Google’s free cloud coding agent, running on Gemini.',
    url: 'https://jules.google' },
  { slug: 'cursor', name: 'Cursor', layer: 'Coding agents',
    one_line: 'The AI-first code editor, bought by SpaceX and now the vehicle for Grok Bot.',
    url: 'https://cursor.com' },
  { slug: 'github-copilot', name: 'GitHub Copilot', layer: 'Coding agents',
    one_line: 'The largest install base in coding AI, becoming an agent inside GitHub itself.',
    url: 'https://github.com/features/copilot' },

  // ── Personal agents ────────────────────────────────────────────────
  { slug: 'openclaw', name: 'OpenClaw', layer: 'Personal agents', guide_slug: 'openclaw',
    one_line: 'Open-source, self-hosted, millions of users. The reference personal agent.',
    url: 'https://openclaw.ai' },
  { slug: 'meta-muse', name: 'Meta Muse', layer: 'Personal agents', guide_slug: 'meta-muse',
    one_line: 'Books, buys, negotiates and fills in forms. Free tier, inside WhatsApp.',
    url: 'https://ai.meta.com' },
  { slug: 'hermes-agent', name: 'Hermes Agent', layer: 'Personal agents',
    one_line: 'The credible open-source number two: self-improving memory, hireable into Paperclip.',
    url: 'https://nousresearch.com' },
  { slug: 'nous-research', name: 'Nous Research', layer: 'Personal agents',
    one_line: 'The lab behind Hermes Agent.',
    url: 'https://nousresearch.com' },
  { slug: 'manus', name: 'Manus', layer: 'Personal agents',
    one_line: 'The Chinese general-purpose agent Meta agreed to buy before Beijing blocked it.',
    url: 'https://manus.im' },

  { slug: 'higgsfield', name: 'Higgsfield', layer: 'Personal agents', guide_slug: 'higgsfield',
    one_line: 'Fifty video and image models behind one chat agent. $5.4bn, and an open API.',
    url: 'https://higgsfield.ai' },

  { slug: 'runway', name: 'Runway', layer: 'Personal agents', guide_slug: 'runway',
    one_line: 'Trains its own video models and sells control. Now betting on world models.',
    url: 'https://runway.com' },

  { slug: 'heygen', name: 'HeyGen', layer: 'Personal agents', guide_slug: 'heygen',
    one_line: 'Digital presenters from two minutes of webcam footage, dubbed into 175+ languages.',
    url: 'https://www.heygen.com' },

  { slug: 'elevenlabs', name: 'ElevenLabs', layer: 'Personal agents', guide_slug: 'elevenlabs',
    one_line: 'The voice layer. Cloning, dubbing, and the phone agents at Klarna and Revolut.',
    url: 'https://elevenlabs.io' },

  // ── Company platforms ──────────────────────────────────────────────
  { slug: 'polsia', name: 'Polsia', layer: 'Company platforms', guide_slug: 'polsia',
    one_line: 'Describe an idea and a fixed team of agents builds and runs the company.',
    url: 'https://polsia.com' },
  { slug: 'nanocorp', name: 'NanoCorp', layer: 'Company platforms', guide_slug: 'nanocorp',
    one_line: 'Publishes the live revenue of every company on the platform. The honest numbers.',
    url: 'https://nanocorp.ai' },
  { slug: 'cofounder-co', name: 'Cofounder.co', layer: 'Company platforms',
    one_line: 'Company-in-a-box with departments and a human gate in front of anything risky.',
    url: 'https://cofounder.co' },
  { slug: 'paperclip', name: 'Paperclip', layer: 'Company platforms', guide_slug: 'paperclip',
    one_line: 'Open-source org chart for agents: roles, budgets, approvals, self-hosted.',
    url: 'https://paperclip.dev' },

  // ── Enterprise ─────────────────────────────────────────────────────
  { slug: 'salesforce-agentforce', name: 'Salesforce Agentforce', layer: 'Enterprise',
    one_line: 'The enterprise incumbent’s agent platform, priced per conversation.',
    url: 'https://www.salesforce.com/agentforce' },
  { slug: 'servicenow', name: 'ServiceNow AI Control Tower', layer: 'Enterprise',
    one_line: 'Governed agents for IT and HR workflows; AI contract value past a billion dollars.',
    url: 'https://www.servicenow.com' },
  { slug: 'sap-joule', name: 'SAP Joule', layer: 'Enterprise',
    one_line: 'Agents inside the ERP most large companies already run.',
    url: 'https://www.sap.com' },
  { slug: 'workday-illuminate', name: 'Workday Illuminate', layer: 'Enterprise',
    one_line: 'Agents inside the HR system, and a toll on outside agents reaching its data.',
    url: 'https://www.workday.com' },
  { slug: 'uipath', name: 'UiPath', layer: 'Enterprise',
    one_line: 'The enterprise back-office automation specialist, now with agent steps.',
    url: 'https://www.uipath.com' },
  { slug: 'copilot-studio', name: 'Microsoft Copilot Studio', layer: 'Enterprise',
    one_line: 'Hosts hundreds of thousands of custom agents built inside Microsoft 365.',
    url: 'https://copilotstudio.microsoft.com' },

  // ── Plumbing ───────────────────────────────────────────────────────
  { slug: 'mcp', name: 'MCP — Model Context Protocol', layer: 'Plumbing', guide_slug: 'api',
    one_line: 'The universal plug between agents and tools. Invented by Anthropic, now neutral.',
    url: 'https://modelcontextprotocol.io' },
  { slug: 'a2a', name: 'A2A — Agent2Agent', layer: 'Plumbing', guide_slug: 'api',
    one_line: 'Google’s standard for agents from different companies talking to each other.',
    url: 'https://a2aproject.github.io/A2A/' },
  { slug: 'agentic-ai-foundation', name: 'Agentic AI Foundation', layer: 'Plumbing',
    one_line: 'The Linux Foundation body that owns MCP and A2A. Rivals agreeing to share.',
    url: 'https://agentics.foundation' },
  { slug: 'stripe', name: 'Stripe', layer: 'Plumbing',
    one_line: 'The payment rails under agentic commerce. Agents that can pay run through it.',
    url: 'https://stripe.com' },
  { slug: 'cloudflare', name: 'Cloudflare', layer: 'Plumbing',
    one_line: 'Runs agents at the edge, where a lot of them are hosted.',
    url: 'https://www.cloudflare.com' },
  { slug: 'vercel', name: 'Vercel', layer: 'Plumbing',
    one_line: 'Where agents are deployed. Eve is its framework for durable agents.',
    url: 'https://vercel.com' },
  { slug: 'zapier', name: 'Zapier', layer: 'Plumbing', guide_slug: 'solo-stack',
    one_line: 'The easiest automation layer: connect apps, run workflows, now with agent steps.',
    url: 'https://zapier.com' },
  { slug: 'n8n', name: 'n8n', layer: 'Plumbing', guide_slug: 'solo-stack',
    one_line: 'The same as Zapier, open-source and self-hosted, for anyone who wants to own it.',
    url: 'https://n8n.io' },

  // ── Picks & shovels ────────────────────────────────────────────────
  { slug: 'nvidia', name: 'Nvidia', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'The chips. Every frontier model was trained and is served on its hardware.',
    url: 'https://www.nvidia.com' },
  { slug: 'aws', name: 'AWS', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'Rents the chips, power and buildings, and serves every major model via Bedrock.',
    url: 'https://aws.amazon.com' },
  { slug: 'google-cloud', name: 'Google Cloud', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'Vertex AI serves the models; the fastest-growing of the big clouds.',
    url: 'https://cloud.google.com' },
  { slug: 'azure', name: 'Microsoft Azure', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'Foundry serves every major model, and orders it cannot fill for want of power.',
    url: 'https://azure.microsoft.com' },
  { slug: 'oracle', name: 'Oracle', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'The fourth hyperscaler, with a backlog anchored by one enormous AI contract.',
    url: 'https://www.oracle.com' },
  { slug: 'hugging-face', name: 'Hugging Face', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'The hub where open weights are published. Nvidia agreed to buy it for $12.93bn.',
    url: 'https://huggingface.co' },
  { slug: 'github', name: 'GitHub', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'Where the code lives and where agents commit it.',
    url: 'https://github.com' },
  { slug: 'groq', name: 'Groq', layer: 'Picks & shovels', guide_slug: 'picks-and-shovels',
    one_line: 'Low-latency inference chips. Nvidia bought its assets and people for ~$20bn.',
    url: 'https://groq.com' },
  { slug: 'huawei', name: 'Huawei Ascend', layer: 'Picks & shovels', guide_slug: 'china-ai',
    one_line: 'The chips Beijing is steering its labs toward, at the price of a slower cycle.',
    url: 'https://www.hisilicon.com' },
];

export const companyBySlug = (slug: string) => COMPANIES.find(c => c.slug === slug);

export function companiesByLayer(): { layer: Layer; items: Company[] }[] {
  return LAYERS.map(layer => ({ layer, items: COMPANIES.filter(c => c.layer === layer) }))
    .filter(g => g.items.length > 0);
}
