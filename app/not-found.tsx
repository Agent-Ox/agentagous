import Link from 'next/link';
import { Montserrat } from 'next/font/google';

import { C, GLOW } from '../lib/design';
import { GUIDE_COUNT } from '../lib/guides';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

export const metadata = { title: 'Not found — WTF Agents', robots: { index: false, follow: true } };

/**
 * Every real page ships its own header in the DESIGN.md style, which is why
 * the shared Nav component was removed — it returned null on all of them and
 * shipped a client bundle to do it. This is the one route with nothing of its
 * own, so it gets a small header here rather than a bare page.
 */
export default function NotFound() {
  return (
    <div className={montserrat.className} style={{ background: C.canvas, color: C.text, minHeight: '100vh' }}>
      <div style={{ background: GLOW, minHeight: '100vh', padding: '32px 8%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            href="/"
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.24em', color: C.text, textDecoration: 'none' }}
          >
            WTF AGENTS
          </Link>
          <nav style={{ display: 'flex', gap: 18, fontSize: 13, letterSpacing: '.12em', color: C.muted }}>
            <Link href="/#guides" style={{ color: 'inherit', textDecoration: 'none' }}>GUIDES</Link>
            <Link href="/companies" style={{ color: 'inherit', textDecoration: 'none' }}>COMPANIES</Link>
            <Link href="/tools" style={{ color: 'inherit', textDecoration: 'none' }}>TOOLS</Link>
          </nav>
        </header>

        <main style={{ maxWidth: 680, marginTop: 120 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span style={{ width: 40, height: 2, background: C.accent }} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.24em', color: C.muted }}>404</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.02em', margin: 0 }}>
            Nothing here. <span style={{ color: C.accentBright }}>Try the guides.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: C.body, marginTop: 22 }}>
            That page does not exist. All {GUIDE_COUNT} guides are free to read in full.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block', marginTop: 30, border: '1px solid rgba(228,72,76,.28)',
              borderRadius: 999, padding: '13px 26px', fontSize: 15, fontWeight: 700,
              letterSpacing: '.02em', color: C.text, textDecoration: 'none',
            }}
          >
            Browse the guides
          </Link>
        </main>
      </div>
    </div>
  );
}
