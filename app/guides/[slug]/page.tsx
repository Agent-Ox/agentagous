import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Montserrat } from 'next/font/google';

import { GUIDES, GUIDE_COUNT, guideBySlug, bundleBySlug } from '../../../lib/guides';
import { guideBodyHtml, crosslinksFor, guideIndex, faqsFor, guideDates } from '../../../lib/guide-source';
import { graph, guideArticle, guideProduct, breadcrumbs, faqPage } from '../../../lib/jsonld';
import { C, GLOW, SITE_URL, splitLastWord, pad2 } from '../../../lib/design';
import BuyButton from '../../../components/BuyButton';
import StickyReveal from './StickyReveal';
import MenuButton from '../../../components/MenuButton';
import { guideCss } from './guide-css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

export const dynamic = 'error';           // static only; a stray dynamic API fails the build
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return {
    title: `${guide.title} — WTF Agents`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: 'WTF Agents',
      type: 'article',
    },
    other: { 'article:section': guide.category },
    twitter: { card: 'summary_large_image', title: guide.title, description: guide.description },
  };
}

function Counter({ label, n, total }: { label: string; n?: number; total?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ display: 'block', width: 40, height: 2, background: C.accent, flex: 'none' }} />
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: C.muted, lineHeight: 1 }}>
        {label}
        {n !== undefined && total !== undefined && (
          <>{' '}{pad2(n)} <span style={{ color: C.accent }}>/</span> {total}</>
        )}
      </span>
    </div>
  );
}

function Hook({ text }: { text: string }) {
  const [before, red, after] = text.split('*');
  return <>{before}<span style={{ color: C.accentBright, fontWeight: 700 }}>{red}</span>{after}</>;
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const html = guideBodyHtml(slug);
  const related = crosslinksFor(slug);
  const index = guideIndex(slug);
  const starter = bundleBySlug('starter-pack')!;
  const complete = bundleBySlug('complete-pack')!;
  const [head, last] = splitLastWord(guide.title);

  // The page is an Article and a Product at the same URL. FAQPage only when
  // the guide actually asks a question — see faqsFor.
  const { published, modified } = guideDates(slug);
  const faqs = faqsFor(slug);
  const ld = graph([
    guideArticle(guide, index, published, modified),
    guideProduct(guide),
    breadcrumbs([
      { name: 'WTF Agents', url: `${SITE_URL}/` },
      { name: 'Guides', url: `${SITE_URL}/#guides` },
      { name: guide.title, url: `${SITE_URL}/guides/${guide.slug}` },
    ]),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]);

  return (
    <div className={montserrat.className} style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: guideCss }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <div className="g-wrap" style={{ background: GLOW }}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="g-header">
          <Link href="/" className="g-wordmark">WTF AGENTS</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <nav className="g-nav">
              <Link href="/#guides">GUIDES</Link><span>·</span>
              <Link href="/companies">COMPANIES</Link><span>·</span>
              <Link href="/tools">TOOLS</Link>
            </nav>
            <MenuButton />
          </div>
        </header>

        <div className="g-columns">
          <main>
            {/* ── Hero ───────────────────────────────────────────── */}
            <section className="g-card g-hero" id="hero">
              <Counter label="Guide" n={index} total={GUIDE_COUNT} />
              <h1>
                {head} <span className="red">{last}</span>
              </h1>
              <p className="g-hook"><Hook text={guide.hook} /></p>
              <p className="g-sub">{guide.subtitle}</p>

              <div className="g-buys">
                <BuyButton slug={guide.slug} className="g-btn-primary">
                  Get the PDF guide · ${guide.price}
                </BuyButton>
                <BuyButton slug="starter-pack" className="g-btn-pill">
                  Starter Pack · ${starter.price}
                </BuyButton>
                <BuyButton slug="complete-pack" className="g-btn-pill">
                  Complete Pack · ${complete.price}
                </BuyButton>
              </div>
            </section>

            {/* ── The guide ──────────────────────────────────────── */}
            <article className="g-body" dangerouslySetInnerHTML={{ __html: html }} />

            {/* ── Closing ────────────────────────────────────────── */}
            <section className="g-card g-closing">
              <h2>Get the rest of the series</h2>
              <p>
                Every WTF Agents guide is written the same way — plain English, no hype,
                no jargon. ${guide.price} each, or take a bundle.
              </p>
              <div className="g-buys">
                <BuyButton slug="starter-pack" className="g-btn-pill">
                  Starter Pack · ${starter.price}
                </BuyButton>
                <BuyButton slug="complete-pack" className="g-btn-pill">
                  Complete Pack · ${complete.price}
                </BuyButton>
              </div>
            </section>

            {related.length > 0 && (
              <section className="g-deeper">
                <Counter label="Go deeper" />
                <div className="g-mini-grid">
                  {related.map(r => {
                    const [rh, rl] = splitLastWord(r.title);
                    return (
                      <Link key={r.slug} href={`/guides/${r.slug}`} className="g-card g-mini">
                        <h3>{rh} <span className="red">{rl}</span></h3>
                        <p>{r.description}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </main>

          {/* ── Sticky buy: rail on desktop, bar on mobile ───────── */}
          <aside className="g-rail" aria-label="Buy this guide">
            <div className="g-card g-rail-card">
              <Counter label="PDF" />
              <p className="g-rail-title">{guide.title}</p>
              <p className="g-rail-sub">{guide.capability} · {guide.bestFor}</p>
              <BuyButton slug={guide.slug} className="g-btn-primary g-btn-block">
                Get the PDF guide · ${guide.price}
              </BuyButton>
            </div>
          </aside>
        </div>

        <footer className="g-footer">
          <span className="g-wordmark">WTF AGENTS</span>
          <nav className="g-nav">
            <Link href="/#guides">GUIDES</Link>
            <Link href="/companies">COMPANIES</Link>
            <Link href="/tools">TOOLS</Link>
          </nav>
          <span className="g-copy">© 2026</span>
        </footer>
      </div>

      {/* Mobile bar, revealed once the hero is out of view. */}
      <StickyReveal />
      <div className="g-mobilebar" id="mobilebar">
        <BuyButton slug={guide.slug} className="g-btn-primary g-btn-block">
          Get the PDF guide · ${guide.price}
        </BuyButton>
      </div>
    </div>
  );
}
