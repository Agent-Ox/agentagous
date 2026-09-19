import { C, CARD_SHADOW } from '../../../lib/design';

/** Success page styling — same tokens as every other page (DESIGN.md). */
export const successCss = `
body { background: ${C.canvas}; }

.s-wrap { padding: 32px 8% 0; background-repeat: no-repeat; background-size: 100% 900px;
  max-width: 1100px; margin: 0 auto; }
.s-header, .s-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.s-header { padding-bottom: 56px; }
.s-wordmark { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.text}; text-decoration: none; }
.s-nav { display: flex; align-items: center; gap: 14px; }
.s-nav a { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.muted}; text-decoration: none; }
.s-nav span { color: ${C.dim}; font-size: 13px; }
.s-copy { font-size: 13px; letter-spacing: .12em; color: ${C.dim}; }

.s-counter { display: flex; align-items: center; gap: 16px; font-size: 13px; font-weight: 700;
  letter-spacing: .24em; text-transform: uppercase; color: ${C.muted}; line-height: 1; }
.s-rule { display: block; width: 40px; height: 2px; background: ${C.accent}; flex: none; }

.s-card { position: relative; background: ${C.card}; border: 1.5px solid ${C.stroke};
  border-radius: 24px; box-shadow: ${CARD_SHADOW}; }
.red { color: ${C.accentBright}; }

.s-hero { padding: 40px; }
.s-hero h1 { font-size: 52px; line-height: 1.08; letter-spacing: -.02em; font-weight: 700; margin: 26px 0 16px; }
.s-lead { font-size: 20px; line-height: 1.45; color: ${C.text}; margin: 0 0 10px; font-weight: 700; }
.s-hero p, .s-upsell p { font-size: 16px; line-height: 1.6; color: ${C.body}; margin: 0 0 24px; max-width: 58ch; }
.s-small { font-size: 13px !important; color: ${C.muted} !important; margin: 14px 0 0 !important; }

.s-btn { display: inline-block; border: 1px solid ${C.strokeSoft}; border-radius: 999px;
  padding: 14px 28px; font-size: 15px; font-weight: 700; letter-spacing: .02em;
  color: ${C.text}; text-decoration: none; }
.s-btn-primary { background: ${C.accent}; color: ${C.inkOnAccent}; border-color: ${C.accent}; }

.s-upsell { padding: 32px; margin-top: 24px; }
.s-upsell h2 { font-size: 26px; font-weight: 700; letter-spacing: -.01em; margin: 24px 0 12px; }

.s-deeper { margin-top: 56px; }
.s-mini-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; margin-top: 24px; }
.s-mini { padding: 20px 22px; text-decoration: none; display: block; }
.s-mini h3 { font-size: 17px; font-weight: 700; color: ${C.text}; margin: 0 0 8px; letter-spacing: -.01em; }
.s-mini p { font-size: 14px; line-height: 1.55; color: ${C.body}; margin: 0; }

.s-footer { margin-top: 72px; padding: 32px 0 40px; border-top: 1px solid rgba(255,255,255,.06); }

@media (max-width: 900px) {
  .s-wrap { padding: 32px 6% 0; }
  .s-hero { padding: 28px; }
  .s-hero h1 { font-size: 34px; }
  .s-lead { font-size: 18px; }
  .s-upsell { padding: 24px; }
  .s-upsell h2 { font-size: 22px; }
  .s-mini-grid { grid-template-columns: minmax(0,1fr); }
  .s-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .s-btn { display: block; text-align: center; }
}
`;
