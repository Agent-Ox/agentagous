#!/usr/bin/env python3
import os
import re

base = os.path.expanduser('~/agentagous')

# ── 1. UPDATE store-checkout/route.ts ─────────────────────────────────────
route_path = os.path.join(base, 'app/api/store-checkout/route.ts')
content = open(route_path).read()
old = "  'complete-pack': process.env.STRIPE_PRICE_COMPLETE_PACK!,"
new = "  'complete-pack': process.env.STRIPE_PRICE_COMPLETE_PACK!,\n  'cowork': process.env.STRIPE_PRICE_COWORK!,"
if 'cowork' not in content:
    content = content.replace(old, new)
    open(route_path, 'w').write(content)
    print('✓ store-checkout/route.ts updated')
else:
    print('SKIP store-checkout/route.ts (already has cowork)')

# ── 2. UPDATE store/page.tsx ───────────────────────────────────────────────
store_path = os.path.join(base, 'app/store/page.tsx')
content = open(store_path).read()
changed = False

if "slug: 'cowork'" not in content:
    old_guide = "  { slug: 'hire-agent', title: 'How to Hire an AI Agent for Your Business'"
    new_guide = "  { slug: 'cowork', title: 'WTF is Cowork', description: 'Claude Code was for developers. Cowork is for everyone else. The Anthropic product that wiped $285B off enterprise software stocks — and what it actually does.', price: 7, badge: '🆕 New', featured: true, category: 'claude' },\n  { slug: 'hire-agent', title: 'How to Hire an AI Agent for Your Business'"
    content = content.replace(old_guide, new_guide)
    changed = True

old_claude_pack = "{ slug: 'claude-pack', title: 'The Claude & Anthropic Pack', description: 'WTF is Anthropic + WTF is Claude + WTF is Claude Code. The complete guide to the AI lab changing everything.', price: 29, saves: 6, includes: 3 },"
new_claude_pack = "{ slug: 'claude-pack', title: 'The Claude & Anthropic Pack', description: 'WTF is Anthropic + WTF is Claude + WTF is Claude Code + WTF is Cowork. The complete guide to the AI lab changing everything.', price: 29, saves: 7, includes: 4 },"
if old_claude_pack in content:
    content = content.replace(old_claude_pack, new_claude_pack)
    changed = True

old_complete = "{ slug: 'complete-pack', title: 'The Complete WTF Agents Pack', description: 'All 11 guides. Everything. The full picture of the agentic economy, the platforms, the AI, and how to use it.', price: 49, saves: 28, includes: 11 },"
new_complete = "{ slug: 'complete-pack', title: 'The Complete WTF Agents Pack', description: 'All 12 guides. Everything. The full picture of the agentic economy, the platforms, the AI, and how to use it.', price: 49, saves: 35, includes: 12 },"
if old_complete in content:
    content = content.replace(old_complete, new_complete)
    changed = True

if changed:
    open(store_path, 'w').write(content)
    print('✓ store/page.tsx updated')
else:
    print('SKIP store/page.tsx (already up to date)')

# ── 3. UPDATE all 11 PDF scripts — add Cowork to read-next ────────────────
cowork_line = "    ('WTF is Cowork', 'Claude Code was for developers. Cowork is for everyone else. The product that wiped $285B off enterprise software stocks.', 'wtfagents.com/store'),\n"

for i in range(1, 12):
    script = f'generate_guide_{i}.py'
    path = os.path.join(base, script)
    if not os.path.exists(path):
        print(f'SKIP (not found): {script}')
        continue
    content = open(path).read()
    if 'WTF is Cowork' in content:
        print(f'SKIP (already has Cowork): {script}')
        continue
    # Add Cowork before the closing ] of next_guides list
    updated = re.sub(
        r"(\n]\s*\nfor title, desc, url in next_guides:)",
        "\n" + cowork_line + r"]\nfor title, desc, url in next_guides:",
        content,
        count=1
    )
    if updated != content:
        open(path, 'w').write(updated)
        print(f'✓ {script} updated')
    else:
        print(f'WARN could not patch: {script}')

print('\n✓ All updates complete. Now run: python3 regenerate_all_guides.py')
