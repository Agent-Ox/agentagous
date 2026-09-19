import fs from 'fs';
import path from 'path';

import { C } from './design';

export const OG_SIZE = { width: 1200, height: 630 };

export const ogFont = (weight: 'Regular' | 'Bold') =>
  fs.readFileSync(path.join(process.cwd(), 'guides', 'fonts', `Montserrat-${weight}.ttf`));

export const ogFonts = () => [
  { name: 'Montserrat', data: ogFont('Regular'), weight: 400 as const, style: 'normal' as const },
  { name: 'Montserrat', data: ogFont('Bold'), weight: 700 as const, style: 'normal' as const },
];

/**
 * The social card for the three non-guide pages, in the same shape as the
 * guide cards: corner glow, counter rule, title with its last word in the
 * accent, standfirst beneath, wordmark and a right-hand note on the rule.
 *
 * Satori drops edge whitespace in flex children and needs display:flex stated
 * on anything with more than one child, so every wrapper below says so — see
 * the guide card for the same constraint.
 */
export function OgCard({
  counter,
  title,
  titleTail,
  standfirst,
  note,
}: {
  counter: string;
  title: string;
  titleTail: string;
  standfirst: string;
  note: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: C.canvas,
        position: 'relative',
        padding: 64,
        fontFamily: 'Montserrat',
        color: C.text,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -260,
          left: -260,
          width: 760,
          height: 760,
          borderRadius: 999,
          background:
            'radial-gradient(circle, rgba(184,38,27,0.55) 0%, rgba(184,38,27,0.16) 42%, rgba(10,4,5,0) 70%)',
          display: 'flex',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'auto' }}>
        <div style={{ width: 44, height: 3, background: C.accent, display: 'flex' }} />
        <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, letterSpacing: 6, color: C.muted }}>
          {counter}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', marginRight: 18 }}>{title}</div>
          <div style={{ display: 'flex', color: C.accentBright }}>{titleTail}</div>
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 26, color: C.body, display: 'flex' }}>
          {standfirst}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 48,
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 5,
          color: C.muted,
        }}
      >
        <div style={{ display: 'flex' }}>WTF AGENTS</div>
        <div style={{ display: 'flex', color: C.accent }}>{note}</div>
      </div>
    </div>
  );
}
