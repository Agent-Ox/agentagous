import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { GUIDES, BUNDLES, GUIDE_COUNT, bundleBySlug } from '../lib/guides';

// Two weights, as measured off the reference — see DESIGN.md §4.
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

const C = {
  accent: '#E4484C',
  accentBright: '#E93E42',
  inkOnAccent: '#1A0507',
  canvas: '#0A0405',
  card: '#0A0506',
  stroke: 'rgba(228,72,76,.72)',
  strokeSoft: 'rgba(228,72,76,.28)',
  text: '#F7F7F7',
  body: '#B1B1B1',
  muted: '#928F8E',
  dim: '#6B6867',
};

/** The corner glow. One per screen, never behind text — DESIGN.md §1. */
const GLOW =
  'radial-gradient(60% 45% at 0% 0%, rgba(184,38,27,.55) 0%, rgba(184,38,27,.16) 38%, transparent 72%)';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'map', label: 'The Map' },
  { id: 'claude', label: 'Claude & Anthropic' },
  { id: 'work', label: 'Work Agents' },
  { id: 'personal', label: 'Personal Agents' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'practical', label: 'Practical' },
];

/** Splits a title so the last word can be set in accent — DESIGN.md §4. */
function splitLastWord(title: string): [string, string] {
  const i = title.trim().lastIndexOf(' ');
  if (i === -1) return ['', title];
  return [title.slice(0, i), title.slice(i + 1)];
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Card headline. Exactly one *starred* phrase renders in the accent — the same
 * one-red-phrase rule the hero and the PDFs follow (DESIGN.md §4). The build
 * rejects a hook that does not carry exactly two asterisks, so the split here
 * is always three parts.
 */
function Hook({ text }: { text: string }) {
  const [before, red, after] = text.split('*');
  return (
    <>
      {before}
      <span style={{ color: C.accentBright, fontWeight: 700 }}>{red}</span>
      {after}
    </>
  );
}

/** Outline pill — DESIGN.md §2. Transparent fill, accent hairline, no glow. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        border: `1px solid ${C.strokeSoft}`,
        borderRadius: 999,
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '.01em',
        color: C.muted,
        // Nowrap keeps a pill on one line; the row wraps instead, so the long
        // pairs stack cleanly rather than breaking mid-phrase.
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

/** Red rule + spaced caps, with the slash in accent — DESIGN.md §3. */
function Counter({ label, n, total }: { label: string; n?: number; total?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ display: 'block', width: 40, height: 2, background: C.accent, flex: 'none' }} />
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '.24em',
          textTransform: 'uppercase',
          color: C.muted,
          lineHeight: 1,
        }}
      >
        {label}
        {n !== undefined && total !== undefined && (
          <>
            {' '}
            {pad(n)} <span style={{ color: C.accent }}>/</span> {total}
          </>
        )}
      </span>
    </div>
  );
}

/** Tab anchored flush to the card's top-right, rounded on its free corners. */
function BadgeTab({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        position: 'absolute',
        // Pulled out by the stroke width so the tab sits on the card's outer
        // edge and covers the stroke, as it does in the reference.
        top: -1.5,
        right: -1.5,
        background: C.accent,
        color: C.inkOnAccent,
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '.08em',
        padding: '10px 22px 12px',
        // Top-right follows the card corner; the two free corners are rounded.
        borderRadius: '0 24px 22px 22px',
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: C.card,
        border: `1.5px solid ${C.stroke}`,
        borderRadius: 24,
        // Stroke plus bloom. The reference card reads as a lit edge, not a
        // hairline: an outer halo and a faint inner one, no fill gradient.
        boxShadow: '0 0 22px rgba(228,72,76,.30), inset 0 0 22px rgba(228,72,76,.05)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        border: `1px solid ${C.strokeSoft}`,
        borderRadius: 999,
        padding: '13px 26px',
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '.02em',
        color: C.text,
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const starter = bundleBySlug('starter-pack');
  const complete = bundleBySlug('complete-pack');
  const bundles = [starter, complete].filter(Boolean) as typeof BUNDLES;
  const indexOf = new Map(GUIDES.map((g, i) => [g.slug, i + 1]));

  return (
    <div
      className={montserrat.className}
      style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}
    >
      {/* The site-wide Nav lives in layout.tsx, which this pilot must not touch.
          Hiding it here keeps the change inside page.tsx and leaves every other
          route exactly as it was. */}
      <style>{`
        body > header { display: none !important; }
        body { background: ${C.canvas}; }
        .wtf-wrap { --pad-x: 8%; }
        .wtf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .wtf-bundles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .wtf-hero-h { font-size: 64px; }
        .wtf-sect { margin-top: 96px; }
        @media (max-width: 900px) {
          .wtf-grid, .wtf-bundles { grid-template-columns: 1fr; }
          .wtf-hero-h { font-size: 38px; }
          .wtf-sect { margin-top: 64px; }
          .wtf-wrap { --pad-x: 6%; }
          /* The header stacks rather than dropping the nav. */
          .wtf-header { flex-direction: column; align-items: flex-start !important; gap: 18px; }
          .wtf-nav-links { gap: 10px !important; }
        }
      `}</style>

      {/* One glow, top-left corner, behind nothing but empty canvas. */}
      <div
        className="wtf-wrap"
        style={{
          background: GLOW,
          paddingLeft: 'var(--pad-x)',
          paddingRight: 'var(--pad-x)',
          paddingTop: 32,
          paddingBottom: 96,
        }}
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <header
          className="wtf-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 64,
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.24em',
              color: C.text,
              textDecoration: 'none',
            }}
          >
            WTF AGENTS
          </Link>
          <nav className="wtf-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {[
              ['Guides', '/store'],
              ['Companies', '/companies'],
              ['Tools', '/tools'],
            ].map(([label, href], i) => (
              <span key={href} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {i > 0 && <span style={{ color: C.dim, fontSize: 13 }}>·</span>}
                <Link
                  href={href}
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '.24em',
                    color: C.muted,
                    textDecoration: 'none',
                  }}
                >
                  {label.toUpperCase()}
                </Link>
              </span>
            ))}
          </nav>
        </header>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <Card style={{ padding: 40 }}>
          <Counter label={`${GUIDE_COUNT} Guides`} />
          <h1
            className="wtf-hero-h"
            style={{
              fontWeight: 700,
              letterSpacing: '-.02em',
              lineHeight: 1.08,
              margin: '28px 0 20px',
            }}
          >
            All the AI.
            <br />
            <span style={{ color: C.accentBright }}>0% BS.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: C.body, margin: 0, maxWidth: 560 }}>
            Plain-English guides to the agentic economy.
          </p>
        </Card>

        {/* ── Bundles ────────────────────────────────────────────── */}
        <section className="wtf-sect">
          <Counter label="Bundles" />
          <div className="wtf-bundles" style={{ marginTop: 28 }}>
            {bundles.map(b => {
              const [head, last] = splitLastWord(b.title);
              return (
                <Card key={b.slug} style={{ padding: 32, paddingTop: 36 }}>
                  <BadgeTab>${b.price}</BadgeTab>
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: '-.01em',
                      lineHeight: 1.2,
                      margin: '0 0 14px',
                      maxWidth: '78%',
                    }}
                  >
                    {head}{' '}
                    <span style={{ color: C.accentBright }}>{last}</span>
                  </h2>
                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: C.body,
                      margin: '0 0 28px',
                    }}
                  >
                    {b.description}
                  </p>
                  <Button href="/store">Buy the {last.toLowerCase()}</Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Guides by category ─────────────────────────────────── */}
        {CATEGORIES.map(cat => {
          const list = GUIDES.filter(g => g.category === cat.id);
          if (!list.length) return null;
          return (
            <section key={cat.id} className="wtf-sect">
              <Counter label={cat.label} />
              <div className="wtf-grid" style={{ marginTop: 28 }}>
                {list.map(g => {
                  const [head, last] = splitLastWord(g.title);
                  return (
                    <Card key={g.slug} style={{ padding: 28, paddingTop: 32, display: 'flex', flexDirection: 'column' }}>
                      <BadgeTab>${g.price}</BadgeTab>
                      <div style={{ marginBottom: 18 }}>
                        <Counter label="Guide" n={indexOf.get(g.slug)!} total={GUIDE_COUNT} />
                      </div>
                      <h3
                        style={{
                          fontSize: 22,
                          fontWeight: 700,
                          letterSpacing: '-.01em',
                          lineHeight: 1.2,
                          margin: '0 0 12px',
                          maxWidth: '82%',
                        }}
                      >
                        {head}{' '}
                        <span style={{ color: C.accentBright }}>{last}</span>
                      </h3>
                      <p
                        style={{
                          fontSize: 17,
                          lineHeight: 1.55,
                          color: C.body,
                          margin: '0 0 20px',
                          flex: 1,
                        }}
                      >
                        <Hook text={g.hook} />
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
                        <Pill>{g.bestFor}</Pill>
                        <Pill>{g.capability}</Pill>
                      </div>
                      <div>
                        <Button href={`/guides/${g.slug}`}>Read the guide</Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer
          style={{
            marginTop: 96,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.24em', color: C.text }}>
            WTF AGENTS
          </span>
          <nav style={{ display: 'flex', gap: 22 }}>
            {[
              ['Guides', '/store'],
              ['Companies', '/companies'],
              ['Tools', '/tools'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 13,
                  letterSpacing: '.12em',
                  color: C.muted,
                  textDecoration: 'none',
                }}
              >
                {label.toUpperCase()}
              </Link>
            ))}
          </nav>
          <span style={{ fontSize: 13, letterSpacing: '.12em', color: C.dim }}>© 2026</span>
        </footer>
      </div>
    </div>
  );
}
