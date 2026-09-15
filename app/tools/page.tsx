import type { Metadata } from 'next';
import { affiliatesByCategory } from '../../lib/affiliates';
import { GUIDES } from '../../lib/guides';

export const metadata: Metadata = {
  title: 'Tools — WTF Agents',
  description: 'The platforms and tools actually running the agentic economy, and the guides that explain them.',
};

export default function ToolsPage() {
  const groups = affiliatesByCategory();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-16 max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            The tools behind the agentic economy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Tools
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            The platforms people actually use to run AI companies — and the guide that explains each one before you commit.
          </p>
        </div>

        {groups.map(group => (
          <div key={group.category} className="mb-10">
            <h2 className="text-xs font-bold text-orange-400 mb-4 tracking-wider uppercase">{group.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map(tool => {
                const guide = GUIDES.find(g => g.relatedTool === tool.slug);
                return (
                  <div key={tool.slug} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col">
                    <h3 className="font-semibold text-white text-sm mb-2">{tool.name}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">{tool.blurb}</p>
                    <div className="flex items-center justify-between gap-3 mt-auto">
                      {tool.url ? (
                        <a
                          href={`/go/${tool.slug}`}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="bg-orange-500 hover:bg-orange-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all"
                        >
                          Visit {tool.name} →
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-600 border border-zinc-800 px-3 py-2 rounded-lg">
                          Link coming soon
                        </span>
                      )}
                      {guide && (
                        <a href="/store" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors">
                          Read {guide.title} →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <p className="text-xs text-zinc-600 text-center mt-12">
          Some links on this page are affiliate links. It costs you nothing and helps keep WTF Agents free.
        </p>

      </section>

      <footer className="border-t border-zinc-800 px-6 py-6 text-center text-xs text-zinc-600">
        WTF Agents · <a href="/" className="text-orange-500 hover:text-orange-400">Back to the index</a>
      </footer>
    </div>
  );
}
