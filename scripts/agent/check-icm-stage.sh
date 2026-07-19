#!/usr/bin/env bash
set -euo pipefail
stage="${1:-}"
[ -n "$stage" ] || { echo 'Usage: check-icm-stage.sh <00..19>' >&2; exit 2; }
dir="$(find icm/stages -maxdepth 1 -type d -name "${stage}_*" | head -n1)"
[ -n "$dir" ] && [ -f "$dir/CONTEXT.md" ] && [ -f "$dir/STATUS.md" ] || { echo 'FAIL missing stage contract/status'; exit 3; }
bash -n scripts/agent/*.sh
python3 - "$stage" "$dir" <<'PY'
import json, pathlib, sys
stage, d = sys.argv[1], pathlib.Path(sys.argv[2])
json.load(open('icm/config/project.json'))
json.load(open('icm/config/stages.json'))
json.load(open('icm/_config/tooling/PINS.json'))
status = {}
for line in (d/'STATUS.md').read_text().splitlines():
    if ':' in line:
        k,v=line.split(':',1); status[k.strip()]=v.strip()
if status.get('state') != 'complete':
    print(f'PASS {stage}: evidence gate deferred while state={status.get("state","unknown")}')
    raise SystemExit(0)

def require_json(rel, required_true=()):
    p=d/rel
    assert p.is_file(), f'missing required evidence: {p}'
    data=json.loads(p.read_text())
    for key in required_true:
        assert data.get(key) is True, f'{p}: {key} must be true'

if stage == '09':
    require_json('output/prompt-injection-tests.json', ('prompt_injection_passed',))
    require_json('output/private-data-boundary.json', ('private_data_boundary_passed',))
elif stage == '10':
    require_json('output/human-approval-tests.json', ('approval_enforcement_passed',))
elif stage == '18':
    require_json('output/rollback-verification.json', ('rollback_proven',))
    require_json('output/review-findings.json', ('no_valid_unresolved_findings',))
    require_json('output/post-deploy-e2e.json', ('production_e2e_passed',))
elif stage == '19':
    require_json('output/screenshot-governance.json', ('approved', 'redacted', 'consent_checked'))
print(f'PASS {stage}: completion evidence')
PY
echo "PASS $dir"
