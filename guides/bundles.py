#!/usr/bin/env python3
"""Single source of truth for the bundles.

Read by guides/render.py (closing CTA copy), build_bundles.py (the merged PDFs)
and guides/build_catalogue.py, which compiles this into
lib/guides.generated.ts so the store reads the same prices and titles.

`membership` decides which guides are included:
  'starter' — guides with `starter: true` in their front-matter
  'all'     — every guide, in catalogue order
"""

BUNDLES = [
    {
        'slug': 'starter-pack',
        'file': 'agentic-economy-starter-pack.pdf',
        'price': 29,
        'membership': 'starter',
        # store catalogue
        'title': 'The Agentic Economy Starter Pack',
        'description': 'The five guides that take you from "WTF is going on" to hiring your first agent.',
        # PDF cover
        'cover_title': 'The Agentic Economy',
        'cover_subtitle': 'Starter Pack',
        'blurb': 'Five guides that take you from "WTF is going on" to hiring your first agent. '
                 'No jargon. No hype. Just what is actually happening — and what to do about it.',
    },
    {
        'slug': 'complete-pack',
        'file': 'complete-wtf-agents-pack.pdf',
        'price': 49,
        'membership': 'all',
        'title': 'The Complete WTF Agents Pack',
        'description': 'Everything. The full picture of the agentic economy, the platforms, the AI, '
                       'and how to use it.',
        'cover_title': 'The Complete',
        'cover_subtitle': 'WTF Agents Pack',
        'blurb': 'Every WTF Agents guide in one file. The agentic economy, the platforms running it, '
                 'the AI behind it, and how to put it to work in your own business.',
    },
]


def by_slug(slug):
    for bundle in BUNDLES:
        if bundle['slug'] == slug:
            return bundle
    raise KeyError(f'unknown bundle: {slug}')


def includes(bundle, metas):
    """Guide slugs in a bundle, given the front-matter catalogue."""
    if bundle['membership'] == 'starter':
        return [s for s, m in metas.items() if m.get('starter')]
    return list(metas)
