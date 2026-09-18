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
        'description': 'The {n} guides that take you from "WTF is going on" to launching your '
                       'first AI-run company.',
        # PDF cover
        'cover_title': 'The Agentic Economy',
        'cover_subtitle': 'Starter Pack',
        'blurb': '{n} guides that take you from "WTF is going on" to launching your first '
                 'AI-run company. No jargon. No hype. Just what is actually happening — '
                 'and what to do about it.',
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


#: Copy fields where `{n}` stands for the bundle's guide count.
COUNTED_FIELDS = ('description', 'blurb')


def resolve(bundle, metas):
    """A copy of `bundle` with `{n}` replaced by the real guide count.

    Bundle copy must never hardcode how many guides are in a bundle: membership
    is derived from the `starter` flag in each guide's front-matter, so a single
    front-matter change can move the count. Anything that shows the copy to a
    reader — the store listing and the PDF cover blurb — resolves it here first,
    against the same catalogue that decides membership.
    """
    count = str(len(includes(bundle, metas)))
    resolved = dict(bundle)
    for field in COUNTED_FIELDS:
        if field in resolved:
            resolved[field] = resolved[field].replace('{n}', count)
    return resolved
