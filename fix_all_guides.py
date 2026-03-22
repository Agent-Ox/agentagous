#!/usr/bin/env python3
"""
Run this script from ~/agentagous to regenerate all 6 affected PDF guides
with fixed tables — no more splitting across pages, no more text overflow.
"""
import subprocess
import sys

scripts = [
    'generate_guide_1.py',
    'generate_guide_2.py',
    'generate_guide_3.py',
    'generate_guide_4.py',
    'generate_guide_5.py',
    'generate_guide_6.py',
]

fixes = [
    # Fix 1: Add KeepTogether to imports
    (
        'from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak, Table, TableStyle',
        'from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak, Table, TableStyle, KeepTogether'
    ),
    # Fix 2: Increase padding in all content tables
    (
        "    ('PADDING', (0,0), (-1,-1), 6),",
        "    ('PADDING', (0,0), (-1,-1), 8),\n    ('WORDWRAP', (0,0), (-1,-1), 1),"
    ),
    (
        "    ('PADDING', (0,0), (-1,-1), 5),",
        "    ('PADDING', (0,0), (-1,-1), 8),\n    ('WORDWRAP', (0,0), (-1,-1), 1),"
    ),
    # Fix 3: Reduce font size in dense tables to prevent overflow
    (
        "    ('FONTSIZE', (0,0), (-1,-1), 9),",
        "    ('FONTSIZE', (0,0), (-1,-1), 8.5),"
    ),
]

import os
base = os.path.expanduser('~/agentagous')

for script in scripts:
    path = os.path.join(base, script)
    if not os.path.exists(path):
        print(f'SKIP (not found): {script}')
        continue

    content = open(path).read()
    original = content

    for old, new in fixes:
        content = content.replace(old, new)

    # Fix 4: Wrap all content tables (not the QR table) in KeepTogether
    # Find tables that are assigned to 't' and wrap them
    import re

    # Pattern: find "story.append(t)" that follows a Table block and wrap with KeepTogether
    content = content.replace(
        'story.append(t)\nstory.append(Spacer',
        'story.append(KeepTogether([t]))\nstory.append(Spacer'
    )

    if content != original:
        open(path, 'w').write(content)
        print(f'Patched: {script}')
    else:
        print(f'No changes needed: {script}')

print('\nNow regenerating all PDFs...\n')

for script in scripts:
    path = os.path.join(base, script)
    if not os.path.exists(path):
        continue
    result = subprocess.run(
        [sys.executable, script],
        cwd=base,
        capture_output=True,
        text=True
    )
    if result.returncode == 0:
        print(result.stdout.strip())
    else:
        print(f'ERROR in {script}:')
        print(result.stderr[-500:])

print('\nAll done. Commit with:')
print('cd ~/agentagous && git add . && git commit -m "fix table overflow and page split in all PDF guides" && git push origin main')
