#!/usr/bin/env bash
set -euo pipefail
fail=0
check(){ local label="$1"; shift; if "$@" >/dev/null 2>&1; then printf 'PASS  %s\n' "$label"; else printf 'FAIL  %s\n' "$label"; fail=1; fi; }
check git git --version
check node node --version
check jcodemunch-version bash -lc 'jcodemunch-mcp --version | grep -Fq 1.97.0'
check rtk-version bash -lc 'rtk --version | grep -Fq 0.42.0'
check rtk-correct-package rtk gain
rtk init --show || true
cfg="${XDG_CONFIG_HOME:-$HOME/.config}/caveman/config.json"
if [ -f "$cfg" ] && grep -q '"defaultMode"[[:space:]]*:[[:space:]]*"lite"' "$cfg"; then echo 'PASS  caveman-lite'; else echo 'FAIL  caveman-lite'; fail=1; fi
check_skill(){
  local name="$1" rev="$2" base
  for base in "$HOME/.claude/skills" "$HOME/.codex/skills" "$HOME/.agents/skills" "$HOME/.hermes/skills"; do
    if [ -f "$base/$name/SKILL.md" ] && [ "$(cat "$base/$name/.dosa-source-rev" 2>/dev/null || true)" = "$rev" ]; then
      printf 'PASS  %s @ %s\n' "$base/$name" "$rev"
    else
      printf 'FAIL  %s expected pin %s\n' "$base/$name" "$rev"
      fail=1
    fi
  done
}
check_skill caveman 63a91ecadbf4c4719a4602a5abb00883f9966034
check_skill scroll-world 2912048246d057cdfe134dfc0b4dfb7e6a12f30e
check_skill codebase-to-course ff8837ecf8e9f6ce9874ffa42e42633394a52a00
exit "$fail"
