#!/usr/bin/env python3
import subprocess
import sys
import os

base = os.path.expanduser('~/agentagous')
scripts = [f'generate_guide_{i}.py' for i in range(1, 13)]

for script in scripts:
    path = os.path.join(base, script)
    if not os.path.exists(path):
        print(f'SKIP (not found): {script}')
        continue
    result = subprocess.run([sys.executable, script], cwd=base, capture_output=True, text=True)
    if result.returncode == 0:
        print(result.stdout.strip())
    else:
        print(f'ERROR in {script}:')
        print(result.stderr[-300:])

print('\n✓ All PDFs regenerated.')
