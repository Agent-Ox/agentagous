import Link from 'next/link';
import { Montserrat } from 'next/font/google';

import { C, GLOW, CARD_SHADOW, pad2 } from '../lib/design';
import { directoryCss } from './directory-css';
import MenuButton from './MenuButton';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

export type Tile = {
  slug: string;
  name: string;
  one_line: string;
  /** Where the tile goes. */
  href: string;
  /** Right-hand pill: "Guide" for an internal page, "Visit" for an outbound. */
  pill: string;
  /** Extra line under the one-liner, e.g. Polsia's live count. */
  note?: string;
  external?: boolean;
};

export function Counter({ label, n, total, unit }: { label?: string; n: number; total: number; unit: string }) {
  return (
    <div className="d-counter">
      <span className="d-rule" />
      <span>
        {n} {label} <span className="d-slash">/</span> {total} {unit}
      </span>
    </div>
  );
}

/**
 * Shared shell for /companies and /tools: header, hero card, then groups of
 * tiles. Both pages are the same object with different data, so they share one
 * implementation rather than drifting apart.
 */
export default function DirectoryPage({
  counter,
  title,
  titleTail,
  standfirst,
  groups,
  jsonLd,
}: {
  counter: React.ReactNode;
  title: string;
  titleTail: string;
  standfirst: string;
  groups: { label: string; items: Tile[] }[];
  /** Serialised schema.org graph for this directory. */
  jsonLd?: string;
}) {
  return (
    <div className={montserrat.className} style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: directoryCss }} />
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}

      <div className="d-wrap" style={{ background: GLOW }}>
        <header className="d-header">
          <Link href="/" className="d-wordmark">WTF AGENTS</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <nav className="d-nav">
              <Link href="/#guides">GUIDES</Link><span>·</span>
              <Link href="/companies">COMPANIES</Link><span>·</span>
              <Link href="/tools">TOOLS</Link>
            </nav>
            <MenuButton />
          </div>
        </header>

        <main>
        <section className="d-card d-hero" style={{ boxShadow: CARD_SHADOW }}>
          {counter}
          <h1>{title} <span className="red">{titleTail}</span></h1>
          <p>{standfirst}</p>
        </section>

        {groups.map(group => (
          <section key={group.label} className="d-sect">
            <div className="d-counter">
              <span className="d-rule" />
              <span>{group.label.toUpperCase()}</span>
            </div>
            <div className="d-grid">
              {group.items.map(t => {
                const inner = (
                  <>
                    <div className="d-tile-head">
                      <h2>{t.name}</h2>
                      <span className={'d-pill' + (t.pill === 'Guide' ? ' d-pill-guide' : '')}>{t.pill}</span>
                    </div>
                    <p>{t.one_line}</p>
                    {t.note && <p className="d-note">{t.note}</p>}
                  </>
                );
                return t.external ? (
                  <a key={t.slug} id={t.slug} href={t.href} className="d-card d-tile" rel="nofollow sponsored">
                    {inner}
                  </a>
                ) : (
                  <Link key={t.slug} id={t.slug} href={t.href} className="d-card d-tile">
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        </main>

        <footer className="d-footer">
          <span className="d-wordmark">WTF AGENTS</span>
          <nav className="d-nav">
            <Link href="/#guides">GUIDES</Link>
            <Link href="/companies">COMPANIES</Link>
            <Link href="/tools">TOOLS</Link>
          </nav>
          <span className="d-copy">© 2026</span>
        </footer>
      </div>
    </div>
  );
}

export { pad2 };
