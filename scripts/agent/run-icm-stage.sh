#!/usr/bin/env bash
set -euo pipefail
stage="${1:-}"
[ -n "$stage" ] || { echo 'Usage: run-icm-stage.sh <00..19>' >&2; exit 2; }
dir="$(find icm/stages -maxdepth 1 -type d -name "${stage}_*" | head -n1)"
[ -n "$dir" ] || { echo "Unknown stage: $stage" >&2; exit 3; }
echo "ACTIVE_STAGE=$dir"
echo 'Read in this order:'
echo '1. EMERALD_TABLETS.md'
echo '2. AGENTS.md'
echo '3. TOKEN_SAVING_RULES.md'
echo '4. icm/CONTEXT.md'
echo '5. icm/config/project.json'
echo "6. $dir/CONTEXT.md"
echo 'Then load only relevant _config and required upstream outputs. Use JCodeMunch before broad code reads.'
