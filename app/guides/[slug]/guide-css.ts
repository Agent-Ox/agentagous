import { C, CARD_SHADOW } from '../../../lib/design';

/**
 * Styles for the guide page. Written as a string rather than a CSS module
 * because the article body is injected as HTML by the dialect renderer, so its
 * elements cannot carry generated class names.
 *
 * Every value traces to DESIGN.md: headings white with a red rule, body zinc,
 * tables and glossary in hairline cards, one corner glow, no other decoration.
 */
export const guideCss = `
body { background: ${C.canvas}; }

/* The glow is capped: stretched over a 14,000px article it would tint the
   whole page instead of sitting in the corner (DESIGN.md §1). */
.g-wrap { padding: 32px 8% 0; background-repeat: no-repeat; background-size: 100% 1100px; }
.g-header, .g-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.g-header { padding-bottom: 48px; }
.g-wordmark { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.text}; text-decoration: none; }
.g-nav { display: flex; align-items: center; gap: 14px; }
.g-nav a { font-size: 13px; font-weight: 700; letter-spacing: .24em; color: ${C.muted}; text-decoration: none; }
.g-nav span { color: ${C.dim}; font-size: 13px; }
.g-copy { font-size: 13px; letter-spacing: .12em; color: ${C.dim}; }

.g-columns { display: grid; grid-template-columns: minmax(0,1fr) 300px; gap: 40px; align-items: start; }

.g-card {
  position: relative; background: ${C.card};
  border: 1.5px solid ${C.stroke}; border-radius: 24px; box-shadow: ${CARD_SHADOW};
}
.g-hero { padding: 40px; }
.g-hero h1 { font-size: 52px; line-height: 1.08; letter-spacing: -.02em; font-weight: 700; margin: 26px 0 18px; }
.red { color: ${C.accentBright}; }
.g-hook { font-size: 20px; line-height: 1.45; color: ${C.text}; margin: 0 0 14px; font-weight: 400; }
.g-sub { font-size: 16px; line-height: 1.6; color: ${C.body}; margin: 0 0 28px; max-width: 62ch; }

.g-buys { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.g-btn-primary {
  display: inline-block; background: ${C.accent}; color: ${C.inkOnAccent};
  border: none; border-radius: 999px; padding: 14px 26px;
  font: 700 15px/1 inherit; letter-spacing: .02em; cursor: pointer;
}
.g-btn-pill {
  display: inline-block; background: transparent; color: ${C.text};
  border: 1px solid ${C.strokeSoft}; border-radius: 999px; padding: 13px 22px;
  font: 700 14px/1 inherit; letter-spacing: .02em; cursor: pointer;
}
.g-btn-block { display: block; width: 100%; }
.g-buyform { display: inline-flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.g-buyform input {
  background: ${C.canvas}; border: 1px solid ${C.strokeSoft}; border-radius: 999px;
  padding: 12px 18px; color: ${C.text}; font: 400 14px/1 inherit; min-width: 200px;
}
.g-buyerr { color: ${C.accentBright}; font-size: 13px; width: 100%; }

/* ── the guide body ────────────────────────────────────────────────── */
.g-body { margin-top: 64px; max-width: 72ch; }
.g-body h2 {
  font-size: 28px; line-height: 1.2; letter-spacing: -.01em; font-weight: 700;
  color: ${C.text}; margin: 56px 0 0;
}
.g-body h2::after {
  content: ''; display: block; width: 100%; height: 2px;
  background: ${C.accent}; margin-top: 12px;
}
.g-body h2:first-child { margin-top: 0; }
.g-body h3 { font-size: 18px; line-height: 1.35; font-weight: 700; color: ${C.text}; margin: 34px 0 10px; }
.g-body p { font-size: 17px; line-height: 1.7; color: ${C.body}; margin: 0 0 18px; }
.g-body a { color: ${C.accentBright}; text-decoration: none; border-bottom: 1px solid ${C.strokeSoft}; }
.g-body strong { color: ${C.text}; font-weight: 700; }
.g-body .g-body-lead { font-size: 19px; line-height: 1.6; color: ${C.text}; font-weight: 700; margin: 22px 0 20px; }
.g-body .g-callout, .g-body blockquote {
  font-size: 17px; line-height: 1.6; color: ${C.text}; font-weight: 700;
  margin: 0 0 18px; padding-left: 16px; border-left: 2px solid ${C.accent};
}
.g-body .g-quote, .g-body .g-caveat { color: ${C.body}; font-style: italic; }
.g-body .g-step-num { font-size: 26px; font-weight: 700; color: ${C.accent}; margin: 24px 0 2px; }
.g-hr { border: 0; border-top: 1px solid rgba(255,255,255,.08); margin: 28px 0; }

.g-list { margin: 0 0 20px; padding: 0; list-style: none; }
.g-list li {
  position: relative; font-size: 17px; line-height: 1.7; color: ${C.body};
  padding-left: 24px; margin-bottom: 10px;
}
.g-list li::before { content: '→'; position: absolute; left: 0; color: ${C.accent}; }

/* Stat cards — number red, caption zinc (DESIGN.md §2) */
.g-stats { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin: 0 0 24px; }
.g-stat {
  background: ${C.card}; border: 1px solid ${C.hairline}; border-radius: 14px; padding: 18px 20px;
}
.g-stat-n { display: block; font-size: 26px; font-weight: 700; color: ${C.accentBright}; line-height: 1.15; }
.g-stat-l { display: block; font-size: 13px; line-height: 1.5; color: ${C.muted}; margin-top: 6px; }

/* Tables and glossary in hairline cards */
.g-tablewrap { overflow-x: auto; margin: 0 0 24px; }
.g-table {
  width: 100%; border-collapse: separate; border-spacing: 0;
  background: ${C.card}; border: 1px solid ${C.hairline}; border-radius: 14px; overflow: hidden;
  font-size: 14px;
}
.g-table th, .g-table td {
  text-align: left; padding: 12px 14px; vertical-align: top; line-height: 1.5;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.g-table thead th { color: ${C.accent}; font-weight: 700; background: rgba(228,72,76,.08); }
.g-table tbody th { color: ${C.accent}; font-weight: 700; }
.g-table td { color: ${C.body}; }
.g-table tr:last-child th, .g-table tr:last-child td { border-bottom: 0; }

.g-glossary { margin: 0 0 24px; display: grid; gap: 10px; }
.g-gl {
  background: ${C.card}; border: 1px solid ${C.hairline}; border-radius: 14px; padding: 14px 16px;
}
.g-gl dt { display: inline; font-weight: 700; color: ${C.text}; font-size: 15px; }
.g-gl dd { display: inline; margin: 0; color: ${C.body}; font-size: 15px; line-height: 1.6; }
.g-gl dd::before { content: ' — '; color: ${C.muted}; }

/* ── closing and go-deeper ─────────────────────────────────────────── */
.g-closing { padding: 32px; margin-top: 64px; }
.g-closing h2 { font-size: 24px; font-weight: 700; margin: 0 0 12px; letter-spacing: -.01em; }
.g-closing p { font-size: 16px; line-height: 1.6; color: ${C.body}; margin: 0 0 22px; max-width: 60ch; }
.g-deeper { margin-top: 64px; padding-bottom: 96px; }
.g-mini-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; margin-top: 26px; }
.g-mini { padding: 20px 22px; text-decoration: none; display: block; }
.g-mini h3 { font-size: 17px; font-weight: 700; color: ${C.text}; margin: 0 0 8px; letter-spacing: -.01em; }
.g-mini p { font-size: 14px; line-height: 1.55; color: ${C.body}; margin: 0; }

/* ── sticky buy rail ───────────────────────────────────────────────── */
.g-rail { position: sticky; top: 24px; }
.g-rail-card { padding: 24px; }
.g-rail-title { font-size: 17px; font-weight: 700; color: ${C.text}; margin: 18px 0 6px; line-height: 1.25; }
.g-rail-sub { font-size: 13px; color: ${C.muted}; margin: 0 0 20px; line-height: 1.5; }

.g-mobilebar { display: none; }

.g-footer { margin-top: 0; padding: 32px 0 40px; border-top: 1px solid rgba(255,255,255,.06); flex-wrap: wrap; }

@media (max-width: 1000px) {
  .g-wrap { padding: 32px 6% 0; }
  .g-columns { grid-template-columns: minmax(0,1fr); }
  .g-rail { display: none; }
  .g-hero { padding: 28px; }
  .g-hero h1 { font-size: 34px; }
  .g-hook { font-size: 18px; }
  .g-body { margin-top: 48px; }
  .g-body h2 { font-size: 23px; margin-top: 44px; }
  .g-stats, .g-mini-grid { grid-template-columns: minmax(0,1fr); }
  .g-header { flex-direction: column; align-items: flex-start; gap: 16px; }
  /* Sticky buy becomes a bottom bar, revealed once the hero is out of view. */
  .g-mobilebar {
    display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
    background: rgba(10,4,5,.94); border-top: 1px solid ${C.hairline};
    transform: translateY(110%); transition: transform .18s ease-out;
  }
  .g-mobilebar.show { transform: translateY(0); }
  .g-deeper { padding-bottom: 120px; }
}
`;
