#!/usr/bin/env bash
set -euo pipefail
fail=0
check(){ local label="$1"; shift; if "$@" >/dev/null 2>&1; then printf 'PASS  %s\n' "$label"; else printf 'FAIL  %s\n' "$label"; fail=1; fi; }
check git git --version
check node node --version
check jcodemunch jcodemunch-mcp --version
check rtk-correct-package rtk gain
rtk init --show || true
cfg="${XDG_CONFIG_HOME:-$HOME/.config}/caveman/config.json"
if [ -f "$cfg" ] && grep -q '"defaultMode"[[:space:]]*:[[:space:]]*"lite"' "$cfg"; then echo 'PASS  caveman-lite'; else echo 'FAIL  caveman-lite'; fail=1; fi
exit "$fail"
