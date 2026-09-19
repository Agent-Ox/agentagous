import Link from 'next/link';

import { C, CARD_SHADOW, splitLastWord, pad2 } from '../lib/design';
import { Guide, GUIDE_COUNT } from '../lib/guides';

export { CATEGORIES } from '../lib/categories';

/**
 * The card vocabulary from DESIGN.md, shared by the homepage and the bundle
 * pages so a guide card looks the same wherever it is shown. These lived in
 * app/page.tsx; they moved here when /bundles needed the same tile rather than
 * a second copy of it.
 */

/** The starred phrase renders in the accent — DESIGN.md §4. */
export function Hook({ text }: { text: string }) {
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
export function Pill({ children }: { children: React.ReactNode }) {
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
export function Counter({ label, n, total }: { label: string; n?: number; total?: number }) {
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
            {pad2(n)} <span style={{ color: C.accent }}>/</span> {total}
          </>
        )}
      </span>
    </div>
  );
}

/** Tab anchored flush to the card's top-right, rounded on its free corners. */
export function BadgeTab({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: C.accent,
        color: C.inkOnAccent,
        fontSize: 15,
        fontWeight: 700,
        padding: '8px 18px',
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 18,
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
  );
}

export function Card({
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
        boxShadow: CARD_SHADOW,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Button({
  href,
  children,
  primary,
  nofollow,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  nofollow?: boolean;
}) {
  const style: React.CSSProperties = {
    display: 'inline-block',
    border: `1px solid ${primary ? C.accent : C.strokeSoft}`,
    background: primary ? C.accent : 'transparent',
    borderRadius: 999,
    padding: '13px 26px',
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: '.02em',
    color: primary ? C.inkOnAccent : C.text,
    textDecoration: 'none',
  };

  // /buy/ is a redirect into Stripe, so it is an anchor and not prefetched.
  return nofollow ? (
    <a href={href} style={style} rel="nofollow">
      {children}
    </a>
  ) : (
    <Link href={href} style={style}>
      {children}
    </Link>
  );
}

/** One guide, as a tile. The same object on the homepage and the bundle pages. */
export function GuideCard({ guide, index }: { guide: Guide; index: number }) {
  const [head, last] = splitLastWord(guide.title);
  return (
    <Card style={{ padding: 28, paddingTop: 32, display: 'flex', flexDirection: 'column' }}>
      <BadgeTab>${guide.price}</BadgeTab>
      <div style={{ marginBottom: 18 }}>
        <Counter label="Guide" n={index} total={GUIDE_COUNT} />
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
        {head} <span style={{ color: C.accentBright }}>{last}</span>
      </h3>
      <p style={{ fontSize: 17, lineHeight: 1.55, color: C.body, margin: '0 0 20px', flex: 1 }}>
        <Hook text={guide.hook} />
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
        <Pill>{guide.bestFor}</Pill>
        <Pill>{guide.capability}</Pill>
      </div>
      <div>
        <Button href={`/guides/${guide.slug}`}>Read the guide</Button>
      </div>
    </Card>
  );
}

