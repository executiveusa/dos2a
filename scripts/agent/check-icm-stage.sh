#!/usr/bin/env bash
set -euo pipefail
stage="${1:-}"
[ -n "$stage" ] || { echo 'Usage: check-icm-stage.sh <00..19>' >&2; exit 2; }
dir="$(find icm/stages -maxdepth 1 -type d -name "${stage}_*" | head -n1)"
[ -f "$dir/CONTEXT.md" ] && [ -f "$dir/STATUS.md" ] || { echo 'FAIL missing stage contract/status'; exit 3; }
bash -n scripts/agent/*.sh
python3 - <<'PY'
import json
json.load(open('icm/config/project.json'))
json.load(open('icm/config/stages.json'))
print('PASS json')
PY
echo "PASS $dir"
