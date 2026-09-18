#!/usr/bin/env python3
"""Generate lib/guides.generated.ts from the content front-matter.

guides/content/<slug>.md is the source of truth for the catalogue. Run this
after adding, removing or editing a guide's front-matter:

    python3 guides/build_catalogue.py
"""
import os
import sys

import yaml

import bundles as BUNDLE_CONFIG
from render import DESCRIPTION_MAX

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
CONTENT_DIR = os.path.join(HERE, 'content')
OUT = os.path.join(REPO, 'lib', 'guides.generated.ts')

FIELDS = ['slug', 'title', 'description', 'price', 'badge', 'featured', 'category', 'file', 'starter']


def ts_str(v):
    return "'" + str(v).replace('\\', '\\\\').replace("'", "\\'") + "'"


def main():
    rows = []
    for fn in sorted(os.listdir(CONTENT_DIR)):
        if not fn.endswith('.md'):
            continue
        text = open(os.path.join(CONTENT_DIR, fn)).read()
        if not text.startswith('---'):
            sys.exit(f'{fn}: missing front-matter')
        meta = yaml.safe_load(text.split('---', 2)[1])
        missing = [f for f in FIELDS if f not in meta]
        if missing:
            sys.exit(f'{fn}: front-matter missing {missing}')
        if len(meta.get('description', '')) > DESCRIPTION_MAX:
            sys.exit(f"{fn}: description is {len(meta['description'])} characters, "
                     f"max {DESCRIPTION_MAX}")
        rows.append(meta)

    rows.sort(key=lambda m: m.get('order', 999))

    lines = [
        '// GENERATED FILE — do not edit by hand.',
        '// Source: guides/content/*.md front-matter.',
        '// Regenerate with: python3 guides/build_catalogue.py',
        '',
        "import type { Guide } from './guides';",
        '',
        'export const GENERATED_GUIDES: Guide[] = [',
    ]
    for m in rows:
        parts = [
            f"slug: {ts_str(m['slug'])}",
            f"title: {ts_str(m['title'])}",
            f"description: {ts_str(m['description'])}",
            f"price: {int(m['price'])}",
            f"badge: {ts_str(m['badge']) if m.get('badge') else 'null'}",
            f"featured: {'true' if m.get('featured') else 'false'}",
            f"category: {ts_str(m['category'])}",
            f"file: {ts_str(m['file'])}",
            f"starter: {'true' if m.get('starter') else 'false'}",
        ]
        if m.get('relatedTool'):
            parts.append(f"relatedTool: {ts_str(m['relatedTool'])}")
        lines.append('  { ' + ', '.join(parts) + ' },')
    lines.append('];')
    lines.append('')
    lines.append("import type { Bundle } from './guides';")
    lines.append('')
    lines.append('/** Bundle copy and prices. Membership is derived in guides.ts. */')
    lines.append("export const GENERATED_BUNDLES: Omit<Bundle, 'includes'>[] = [")
    metas = {m['slug']: m for m in rows}
    for b in BUNDLE_CONFIG.BUNDLES:
        b = BUNDLE_CONFIG.resolve(b, metas)
        lines.append('  { ' + ', '.join([
            f"slug: {ts_str(b['slug'])}",
            f"title: {ts_str(b['title'])}",
            f"description: {ts_str(b['description'])}",
            f"price: {int(b['price'])}",
            f"file: {ts_str(b['file'])}",
        ]) + ' },')
    lines.append('];')
    lines.append('')

    with open(OUT, 'w') as fh:
        fh.write('\n'.join(lines))
    print(f'wrote {os.path.relpath(OUT, REPO)} — {len(rows)} guides')


if __name__ == '__main__':
    main()
