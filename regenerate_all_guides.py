#!/usr/bin/env python3
"""Rebuild every guide PDF and both bundle PDFs.

Thin wrapper kept for muscle memory. The real work is in:
  guides/render.py          markdown -> PDF
  guides/build_catalogue.py front-matter -> lib/guides.generated.ts
  build_bundles.py          singles -> bundle PDFs
"""
import os
import subprocess
import sys

BASE = os.path.dirname(os.path.abspath(__file__))

for step in (['guides/render.py'], ['guides/build_catalogue.py'], ['build_bundles.py']):
    result = subprocess.run([sys.executable] + step, cwd=BASE)
    if result.returncode != 0:
        sys.exit(f'FAILED: {step[0]}')

print('\n✓ All guide PDFs, bundles and the catalogue are up to date.')
