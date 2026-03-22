'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const GUIDE_INFO: Record<string, { title: string; file: string; description: string }> = {
  'openclaw': { title: 'WTF is OpenClaw', file: 'wtf-is-openclaw.pdf', description: 'Your guide to the OpenClaw agentic platform.' },
  'agentic-economy': { title: 'WTF is the Agentic Economy', file: 'wtf-is-the-agentic-economy.pdf', description: 'The big picture guide to what is happening right now.' },
  'polsia': { title: 'WTF is Polsia', file: 'wtf-is-polsia.pdf', description: 'Everything you need to know about Polsia.' },
  'paperclip': { title: 'WTF is Paperclip', file: 'wtf-is-paperclip.pdf', description: 'Your guide to the Paperclip platform.' },
  'api': { title: 'WTF is an API', file: 'wtf-is-an-api.pdf', description: 'APIs explained for normal humans.' },
  'hire-agent': { title: 'How to Hire an AI Agent for Your Business', file: 'how-to-hire-an-ai-agent.pdf', description: 'A practical guide for business owners.' },
  'anthropic': { title: 'WTF is Anthropic', file: 'wtf-is-anthropic.pdf', description: 'The company building the AI that is changing everything.' },
  'claude': { title: 'WTF is Claude', file: 'wtf-is-claude.pdf', description: 'Your guide to Claude — the AI agent behind the agentic economy.' },
  'claude-code': { title: 'WTF is Claude Code', file: 'wtf-is-claude-code.pdf', description: 'How Claude Code is changing software development.' },
  'ai-agent': { title: 'WTF is an AI Agent', file: 'wtf-is-an-ai-agent.pdf', description: 'AI agents explained for normal humans.' },
  'llm': { title: 'WTF is an LLM', file: 'wtf-is-an-llm.pdf', description: 'Large language models explained simply.' },
  'starter-pack': { title: 'The Agentic Economy Starter Pack', file: 'agentic-economy-starter-pack.pdf', description: 'All 6 agentic economy guides in one.' },
  'claude-pack': { title: 'The Claude & Anthropic Pack', file: 'claude-anthropic-pack.pdf', description: 'All 5 Claude and Anthropic guides in one.' },
  'complete-pack': { title: 'The Complete WTF Agents Pack', file: 'complete-wtf-agents-pack.pdf', description: 'All 11 guides — the complete collection.' },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const guide = searchParams.get('guide') || '';
  const sessionId = searchParams.get('session_id') || '';
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) setVerified(true);
  }, [sessionId]);

  const info = GUIDE_INFO[guide];

  if (!info) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-3xl font-bold text-white mb-3">Purchase complete!</h1>
          <p className="text-zinc-400 mb-8">Check your email for your download link. If you have any issues, contact ox@wtfagents.com</p>
          <a href="/store" className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Back to Store →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📥</div>
        <h1 className="text-3xl font-bold text-white mb-3">You're in.</h1>
        <p className="text-zinc-400 mb-2">Thanks for buying <span className="text-orange-400 font-semibold">{info.title}</span>.</p>
        <p className="text-zinc-500 text-sm mb-8">{info.description}</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <a
            href={`/guides/${info.file}`}
            download
            className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all w-full mb-3"
          >
            <span>⬇</span>
            Download {info.title}
          </a>
          <p className="text-xs text-zinc-600">PDF · Save this page or bookmark it — this link works anytime.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/store" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Browse more guides
          </a>
          <a href="/" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-all">
            Back to WTF Agents
          </a>
        </div>
      </div>
    </div>
  );
}

export default function StoreSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
