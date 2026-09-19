import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

import { GUIDES, GUIDE_COUNT, guideBySlug } from '../../../lib/guides';
import { C, splitLastWord, pad2 } from '../../../lib/design';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'WTF Agents guide';
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}

const font = (weight: 'Regular' | 'Bold') =>
  fs.readFileSync(path.join(process.cwd(), 'guides', 'fonts', `Montserrat-${weight}.ttf`));

/**
 * The hero card, rendered at 1200×630 for social cards. Same tokens as the
 * page, so a shared link looks like the page it opens — one corner glow, the
 * counter, the title with its last word in the accent, the hook beneath.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return new Response('Not found', { status: 404 });

  const index = GUIDES.findIndex(g => g.slug === slug) + 1;
  const [head, last] = splitLastWord(guide.title);
  // Flex children drop edge whitespace in Satori, so the space that separates
  // the hook's plain and red halves has to survive as a non-breaking one.
  const [rawBefore, hRed, rawAfter] = guide.hook.split('*');
  const hBefore = rawBefore.replace(/ $/, '\u00a0');
  const hAfter = rawAfter.replace(/^ /, '\u00a0');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          background: C.canvas, position: 'relative', padding: 64,
          fontFamily: 'Montserrat', color: C.text,
        }}
      >
        {/* The corner glow, as a soft radial in the top-left. */}
        <div
          style={{
            position: 'absolute', top: -260, left: -260, width: 760, height: 760,
            borderRadius: 999, background:
              'radial-gradient(circle, rgba(184,38,27,0.55) 0%, rgba(184,38,27,0.16) 42%, rgba(10,4,5,0) 70%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'auto' }}>
          <div style={{ width: 44, height: 3, background: C.accent, display: 'flex' }} />
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, letterSpacing: 6, color: C.muted }}>
            {`GUIDE ${pad2(index)} / ${GUIDE_COUNT}`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', marginRight: 16 }}>{head}</div>
            <div style={{ display: 'flex', color: C.accentBright }}>{last}</div>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, marginTop: 26, color: C.body, display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>{hBefore}</div>
            <div style={{ display: 'flex', color: C.accentBright, fontWeight: 700 }}>{hRed}</div>
            <div style={{ display: 'flex' }}>{hAfter}</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 48, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)',
            fontSize: 20, fontWeight: 700, letterSpacing: 5, color: C.muted,
          }}
        >
          <div style={{ display: 'flex' }}>WTF AGENTS</div>
          <div style={{ display: 'flex', color: C.accent }}>{`$${guide.price} · PDF`}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Montserrat', data: font('Regular'), weight: 400, style: 'normal' },
        { name: 'Montserrat', data: font('Bold'), weight: 700, style: 'normal' },
      ],
    },
  );
}
