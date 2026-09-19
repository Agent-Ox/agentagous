import { C, CARD_SHADOW } from '../lib/design';

/**
 * Styles for /companies and /tools. Same tokens as the guide pages — one glow
 * in the corner, cards defined by stroke and bloom rather than fill, the red
 * counter rule, and nothing else (DESIGN.md §6).
 */
export const directoryCss = `
body { background: ${C.canvas}; }

.d-wrap { padding: 32px 8% 0; background-repeat: no-repeat; background-size: 100% 1100px; }
.d-header, .d-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.d-header { padding-bottom: 48px; }
.d-wordmark { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.text}; text-decoration: none; }
.d-nav { display: flex; align-items: center; gap: 14px; }
.d-nav a { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.muted}; text-decoration: none; }
.d-nav span { color: ${C.dim}; font-size: 13px; }
.d-copy { font-size: 13px; letter-spacing: .12em; color: ${C.dim}; }

.d-counter { display: flex; align-items: center; gap: 16px; font-size: 13px; font-weight: 700;
  letter-spacing: .24em; text-transform: uppercase; color: ${C.muted}; line-height: 1; }
.d-rule { display: block; width: 40px; height: 2px; background: ${C.accent}; flex: none; }
.d-slash { color: ${C.accent}; }

.d-card { position: relative; background: ${C.card}; border: 1.5px solid ${C.stroke};
  border-radius: 24px; box-shadow: ${CARD_SHADOW}; }

.d-hero { padding: 40px; }
.d-hero h1 { font-size: 52px; line-height: 1.08; letter-spacing: -.02em; font-weight: 700; margin: 26px 0 16px; }
.d-hero p { font-size: 17px; line-height: 1.6; color: ${C.body}; margin: 0; max-width: 62ch; }
.red { color: ${C.accentBright}; }

.d-sect { margin-top: 72px; }
.d-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; margin-top: 24px; }
.d-tile { padding: 22px 24px; text-decoration: none; display: block; transition: border-color .15s ease; }
.d-tile:hover { border-color: ${C.accent}; }
.d-tile-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.d-tile h2 { font-size: 17px; font-weight: 700; color: ${C.text}; margin: 0; letter-spacing: -.01em; line-height: 1.25; }
.d-tile p { font-size: 14px; line-height: 1.55; color: ${C.body}; margin: 0; }
.d-note { margin-top: 10px !important; color: ${C.accentBright} !important; font-weight: 700; }

.d-pill { flex: none; border: 1px solid ${C.strokeSoft}; border-radius: 999px; padding: 4px 10px;
  font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: ${C.muted}; }
.d-pill-guide { color: ${C.inkOnAccent}; background: ${C.accent}; border-color: ${C.accent}; }

.d-footer { margin-top: 96px; padding: 32px 0 40px; border-top: 1px solid rgba(255,255,255,.06); flex-wrap: wrap; }

/* An anchor arriving from a guide should be obvious for a moment, then settle. */
.d-tile:target { border-color: ${C.accent}; animation: d-flash 1.8s ease-out 1; }
@keyframes d-flash {
  0%, 30% { box-shadow: 0 0 0 3px ${C.accent}, ${CARD_SHADOW}; }
  100% { box-shadow: ${CARD_SHADOW}; }
}
/* Anchors land under nothing, but leave room so the tile is not flush to the top. */
.d-tile { scroll-margin-top: 90px; }

@media (max-width: 1000px) {
  .d-wrap { padding: 32px 6% 0; }
  .d-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .d-hero { padding: 28px; }
  .d-hero h1 { font-size: 34px; }
  .d-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .d-sect { margin-top: 56px; }
}
@media (max-width: 640px) {
  .d-grid { grid-template-columns: minmax(0,1fr); }
}
`;
