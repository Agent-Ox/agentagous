import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { GUIDES, BUNDLES, GUIDE_COUNT, bundleBySlug } from '../lib/guides';
import BuyButton from '../components/BuyButton';
import { Card, Counter, BadgeTab, GuideCard, CATEGORIES } from '../components/cards';
import MenuButton from '../components/MenuButton';
import { graph, collectionPage, guideList, bundleProducts, offerSummary, breadcrumbs } from '../lib/jsonld';
import { SITE_URL } from '../lib/design';

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


/** Splits a title so the last word can be set in accent — DESIGN.md §4. */
function splitLastWord(title: string): [string, string] {
  const i = title.trim().lastIndexOf(' ');
  if (i === -1) return ['', title];
  return [title.slice(0, i), title.slice(i + 1)];
}








export default function Home() {
  const starter = bundleBySlug('starter-pack');
  const complete = bundleBySlug('complete-pack');
  const bundles = [starter, complete].filter(Boolean) as typeof BUNDLES;
  const indexOf = new Map(GUIDES.map((g, i) => [g.slug, i + 1]));

  // The homepage is the guide index and the shop front: an ItemList of every
  // guide, plus the two bundles as offers.
  const ld = graph([
    collectionPage(
      `${SITE_URL}/`,
      'WTF Agents — All the AI. 0% BS.',
      'Plain-English guides to the agentic economy. Read every guide free, or take the PDF for $7.',
    ),
    guideList(GUIDES),
    ...bundleProducts(),
    offerSummary(),
    breadcrumbs([{ name: 'WTF Agents', url: `${SITE_URL}/` }]),
  ]);

  return (
    <div
      className={montserrat.className}
      style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}
    >
      <style>{`
        body { background: ${C.canvas}; }
        .wtf-wrap { --pad-x: 8%; }
        .wtf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .wtf-bundles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .wtf-hero-h { font-size: 64px; }
        .wtf-sect { margin-top: 96px; }
        .wtf-btn {
          display: inline-block; border: 1px solid ${C.strokeSoft}; border-radius: 999px;
          padding: 13px 26px; font: 700 15px/1 inherit; letter-spacing: .02em;
          color: ${C.text}; background: transparent; cursor: pointer;
        }
        .g-buyerr { color: ${C.accentBright}; font-size: 13px; display: block; margin-top: 8px; }
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <nav className="wtf-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {[
              ['Guides', '/#guides'],
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
          <MenuButton />
          </div>
        </header>

        <main>
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
                  <BuyButton slug={b.slug} className="wtf-btn">Buy the {last.toLowerCase()}</BuyButton>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Guides by category ─────────────────────────────────── */}
        <div id="guides" />
        {CATEGORIES.map(cat => {
          const list = GUIDES.filter(g => g.category === cat.id);
          if (!list.length) return null;
          return (
            <section key={cat.id} className="wtf-sect">
              <Counter label={cat.label} />
              <div className="wtf-grid" style={{ marginTop: 28 }}>
                {list.map(g => (
                  <GuideCard key={g.slug} guide={g} index={indexOf.get(g.slug)!} />
                ))}
              </div>
            </section>
          );
        })}

        </main>

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
              ['Guides', '/#guides'],
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
