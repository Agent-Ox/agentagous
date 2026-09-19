import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Montserrat } from 'next/font/google';

import { BUNDLES, GUIDES, bundleBySlug, guideBySlug, bundleSaving } from '../../../lib/guides';
import { BUNDLE_STATS } from '../../../lib/bundle-stats.generated';
import { C, GLOW, SITE_URL, splitLastWord } from '../../../lib/design';
import { Card, Counter, Button, GuideCard, CATEGORIES } from '../../../components/cards';
import { graph, breadcrumbs, collectionPage } from '../../../lib/jsonld';
import MenuButton from '../../../components/MenuButton';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

export const dynamic = 'error';
export const dynamicParams = false;

export function generateStaticParams() {
  return BUNDLES.map(b => ({ slug: b.slug }));
}

const pagesFor = (slug: string) => BUNDLE_STATS.find(s => s.slug === slug)?.pages;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bundle = bundleBySlug(slug);
  if (!bundle) return {};
  const url = `${SITE_URL}/bundles/${bundle.slug}`;
  const description = `${bundle.description} ${bundle.includes.length} guides in one PDF, $${bundle.price}.`;
  return {
    title: `${bundle.title} — WTF Agents`,
    description,
    alternates: { canonical: url },
    openGraph: { title: bundle.title, description, url, siteName: 'WTF Agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: bundle.title, description },
  };
}

export default async function BundlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = bundleBySlug(slug);
  if (!bundle) notFound();

  const other = BUNDLES.find(b => b.slug !== bundle.slug);
  const pages = pagesFor(bundle.slug);
  const saving = bundleSaving(bundle);
  const included = bundle.includes.map(s => guideBySlug(s)!).filter(Boolean);
  const indexOf = new Map(GUIDES.map((g, i) => [g.slug, i + 1]));
  const [head, last] = splitLastWord(bundle.title);
  const url = `${SITE_URL}/bundles/${bundle.slug}`;

  const ld = graph([
    collectionPage(url, bundle.title, bundle.description),
    {
      '@type': 'Product',
      '@id': `${url}#product`,
      name: bundle.title,
      description: bundle.description,
      image: `${url}/opengraph-image`,
      brand: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        url,
        price: String(bundle.price),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${SITE_URL}/#organization` },
      },
    },
    breadcrumbs([
      { name: 'WTF Agents', url: `${SITE_URL}/` },
      { name: bundle.title, url },
    ]),
  ]);

  return (
    <div className={montserrat.className} style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <style>{`
        .b-wrap { --pad-x: 8%; padding: 32px var(--pad-x) 96px; }
        .b-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 56px; }
        .b-nav { display: flex; gap: 18px; font-size: 13px; letter-spacing: .12em; color: ${C.muted}; }
        .b-nav a { color: inherit; text-decoration: none; }
        .b-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .b-sect { margin-top: 56px; }
        @media (max-width: 720px) { .b-wrap { --pad-x: 6%; } .b-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="b-wrap" style={{ background: GLOW }}>
        <header className="b-head">
          <Link href="/" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.24em', color: C.text, textDecoration: 'none' }}>
            WTF AGENTS
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <nav className="b-nav">
              <Link href="/#guides">GUIDES</Link>
              <Link href="/companies">COMPANIES</Link>
              <Link href="/tools">TOOLS</Link>
            </nav>
            <MenuButton />
          </div>
        </header>

        <main>
          <Card style={{ padding: 40 }}>
            <Counter label="Bundle" />
            <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.02em', margin: '22px 0 0' }}>
              {head} <span style={{ color: C.accentBright }}>{last}</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: C.body, margin: '20px 0 0', maxWidth: 680 }}>
              {bundle.description}
            </p>
            <p style={{ fontSize: 15, letterSpacing: '.06em', color: C.muted, margin: '22px 0 0' }}>
              {bundle.includes.length} guides{pages ? ` · ${pages} pages` : ''} · one PDF
              {saving > 0 && <> · ${saving} less than buying them separately</>}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 30 }}>
              <Button href={`/buy/${bundle.slug}`} primary nofollow>
                Get the {last.toLowerCase()} · ${bundle.price}
              </Button>
              <span style={{ fontSize: 14, color: C.dim }}>Instant download. One payment.</span>
            </div>
          </Card>

          {CATEGORIES.map(cat => {
            const list = included.filter(g => g.category === cat.id);
            if (!list.length) return null;
            return (
              <section key={cat.id} className="b-sect">
                <Counter label={cat.label} />
                <div className="b-grid" style={{ marginTop: 28 }}>
                  {list.map(g => (
                    <GuideCard key={g.slug} guide={g} index={indexOf.get(g.slug)!} />
                  ))}
                </div>
              </section>
            );
          })}

          {other && (
            <section className="b-sect">
              <Counter label="The other bundle" />
              <Card style={{ padding: 32, marginTop: 28 }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.01em', margin: '0 0 12px' }}>
                  {other.title}
                </h2>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: C.body, margin: '0 0 8px', maxWidth: 680 }}>
                  {other.description}
                </p>
                <p style={{ fontSize: 14, letterSpacing: '.06em', color: C.muted, margin: '0 0 22px' }}>
                  {other.includes.length} guides
                  {pagesFor(other.slug) ? ` · ${pagesFor(other.slug)} pages` : ''} · ${other.price}
                </p>
                <Button href={`/bundles/${other.slug}`}>See the {splitLastWord(other.title)[1].toLowerCase()}</Button>
              </Card>
            </section>
          )}
        </main>

        <footer
          style={{
            marginTop: 96,
            paddingTop: 28,
            borderTop: `1px solid rgba(255,255,255,.08)`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.24em', color: C.muted }}>WTF AGENTS</span>
          <nav className="b-nav">
            <Link href="/#guides">GUIDES</Link>
            <Link href="/companies">COMPANIES</Link>
            <Link href="/tools">TOOLS</Link>
          </nav>
          <span style={{ fontSize: 13, letterSpacing: '.12em', color: C.dim }}>© 2026</span>
        </footer>
      </div>
    </div>
  );
}
