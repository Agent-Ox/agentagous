import { SITE_URL } from '../../lib/design';

export const dynamic = 'force-static';

/**
 * Written by hand rather than through MetadataRoute.Robots, because that
 * helper cannot emit comments and the llms.txt pointer is a comment: there is
 * no standard directive for it, and the convention is a commented URL that a
 * crawler which cares can pick up.
 *
 * The AI crawlers were already allowed by the wildcard rule. Naming them says
 * so deliberately, which is the point — an unstated default reads the same as
 * an oversight. Google-Extended governs training rather than indexing, so it
 * is listed with the rest even though the answer is identical.
 *
 * /go/ is the outbound redirect layer and /buy/ starts a Stripe checkout:
 * every URL under either is a 302 to somewhere else, so there is nothing to
 * index, and a crawler walking /buy/ would open abandoned sessions.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Bingbot',
  'CCBot',
  'Applebot-Extended',
  'meta-externalagent',
];

const block = (agent: string) =>
  `User-agent: ${agent}\nAllow: /\nDisallow: /go/\nDisallow: /buy/`;

export function GET() {
  const body = [
    '# WTF Agents — plain-English guides to the agentic economy.',
    `# Plain-text index for language models: ${SITE_URL}/llms.txt`,
    `# Full text of every guide:             ${SITE_URL}/llms-full.txt`,
    '',
    block('*'),
    '',
    '# Named explicitly so the permission is on the record, not merely implied.',
    AI_CRAWLERS.map(block).join('\n\n'),
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
