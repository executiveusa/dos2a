#!/usr/bin/env bash
set -euo pipefail
for d in icm/stages/[0-9][0-9]_*; do
  [ -d "$d" ] || continue
  state="$(awk -F': ' '/^state:/{print $2; exit}' "$d/STATUS.md" 2>/dev/null || true)"
  if [ "$state" != 'complete' ]; then echo "$d"; exit 0; fi
done
echo 'ALL_COMPLETE'
