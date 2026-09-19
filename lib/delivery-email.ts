import { C } from './design';
import { upsellFor } from './upsell';

/**
 * The delivery email.
 *
 * Simple HTML: tables, inline styles, no external CSS and no images — which is
 * what survives Gmail, Outlook and Apple Mail. Same palette and type as the
 * site, with a web-safe stack behind Montserrat because no client will load a
 * webfont. The plain-text part is kept and sent alongside, so a client that
 * refuses HTML still gets a working link.
 */
export function deliveryEmail({
  title,
  slug,
  description,
  downloadUrl,
  upsellUrl,
}: {
  title: string;
  slug: string;
  description: string;
  downloadUrl: string;
  upsellUrl: string;
}): { html: string; text: string } {
  const offer = upsellFor(slug);
  const font = `Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif`;

  const upsellBlock = offer
    ? `
      <tr><td style="height:16px;line-height:16px;">&nbsp;</td></tr>
      <tr><td style="background:${C.card};border:1px solid ${C.hairline};border-radius:16px;padding:24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="font:700 12px/1 ${font};letter-spacing:2.5px;text-transform:uppercase;color:${C.muted};padding-bottom:14px;">
            One step up
          </td></tr>
          <tr><td style="font:700 20px/1.3 ${font};color:${C.text};padding-bottom:10px;">
            ${escapeHtml(offer.headline)}
          </td></tr>
          <tr><td style="font:400 15px/1.6 ${font};color:${C.body};padding-bottom:18px;">
            ${escapeHtml(offer.body)}
          </td></tr>
          <tr><td>
            <a href="${upsellUrl}" style="display:inline-block;background:${C.accent};color:${C.inkOnAccent};font:700 14px/1 ${font};text-decoration:none;padding:13px 24px;border-radius:999px;">
              Upgrade for $${offer.price}
            </a>
          </td></tr>
        </table>
      </td></tr>`
    : '';

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:${C.canvas};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.canvas};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;">

        <tr><td style="font:700 13px/1 ${font};letter-spacing:3px;color:${C.text};padding-bottom:28px;">
          WTF&nbsp;AGENTS
        </td></tr>

        <tr><td style="background:${C.card};border:1px solid ${C.stroke};border-radius:20px;padding:32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr><td style="font:700 12px/1 ${font};letter-spacing:2.5px;text-transform:uppercase;color:${C.muted};padding-bottom:16px;">
              Your download
            </td></tr>
            <tr><td style="font:700 30px/1.15 ${font};color:${C.text};padding-bottom:14px;">
              You&rsquo;re <span style="color:${C.accentBright};">in.</span>
            </td></tr>
            <tr><td style="font:400 15px/1.6 ${font};color:${C.body};padding-bottom:6px;">
              Thanks for buying <strong style="color:${C.text};">${escapeHtml(title)}</strong>.
            </td></tr>
            <tr><td style="font:400 15px/1.6 ${font};color:${C.body};padding-bottom:22px;">
              ${escapeHtml(description)}
            </td></tr>
            <tr><td>
              <a href="${downloadUrl}" style="display:inline-block;background:${C.accent};color:${C.inkOnAccent};font:700 15px/1 ${font};text-decoration:none;padding:14px 28px;border-radius:999px;">
                Download the PDF
              </a>
            </td></tr>
            <tr><td style="font:400 13px/1.6 ${font};color:${C.muted};padding-top:16px;">
              That link stays valid, so keep this email if you want the PDF again later.
            </td></tr>
          </table>
        </td></tr>
${upsellBlock}

        <tr><td style="font:400 13px/1.6 ${font};color:${C.muted};padding-top:28px;">
          Any problems, just reply to this email and I&rsquo;ll sort it out.<br>&mdash; Ox
        </td></tr>
        <tr><td style="font:400 12px/1.6 ${font};color:${C.dim};padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);margin-top:20px;">
          WTF Agents &middot; <a href="https://wtfagents.com" style="color:${C.muted};text-decoration:none;">wtfagents.com</a>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = `Thanks for buying ${title}.

Download it here:
${downloadUrl}

That link stays valid, so save this email if you want to grab the PDF again later.
${offer ? `\n${offer.headline} — ${offer.body}\n${upsellUrl}\n` : ''}
Any problems, just reply to this email and I'll sort it out.

— Ox
WTF Agents · wtfagents.com`;

  return { html, text };
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
