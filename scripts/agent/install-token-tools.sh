#!/usr/bin/env bash
set -euo pipefail

# Reviewed immutable/versioned tool pins. Update only through a reviewed PR.
JCODEMUNCH_VERSION="1.97.0"
RTK_REV="39583cf22b0a73ef78f935d8ada1c87a9a10e852"
RTK_VERSION="0.42.0"
CAVEMAN_REV="63a91ecadbf4c4719a4602a5abb00883f9966034"
SCROLL_WORLD_REV="2912048246d057cdfe134dfc0b4dfb7e6a12f30e"
CODEBASE_TO_COURSE_REV="ff8837ecf8e9f6ce9874ffa42e42633394a52a00"

echo '== dos A pinned token-tool bootstrap =='

require() {
  command -v "$1" >/dev/null 2>&1 || { echo "ERROR: $1 is required" >&2; exit "$2"; }
}

fetch_pinned_repo() {
  local repo="$1" rev="$2" dest="$3"
  git init -q "$dest"
  git -C "$dest" remote add origin "$repo"
  git -C "$dest" fetch -q --depth 1 origin "$rev"
  git -C "$dest" checkout -q --detach FETCH_HEAD
  local actual
  actual="$(git -C "$dest" rev-parse HEAD)"
  [ "$actual" = "$rev" ] || { echo "ERROR: pin mismatch for $repo: $actual != $rev" >&2; exit 9; }
}

install_skill_everywhere() {
  local source_dir="$1" name="$2" rev="$3"
  [ -f "$source_dir/SKILL.md" ] || { echo "ERROR: missing SKILL.md for $name" >&2; exit 10; }
  local base
  for base in "$HOME/.claude/skills" "$HOME/.codex/skills" "$HOME/.agents/skills" "$HOME/.hermes/skills"; do
    mkdir -p "$base"
    rm -rf "$base/$name"
    cp -R "$source_dir" "$base/$name"
    printf '%s\n' "$rev" > "$base/$name/.dosa-source-rev"
  done
}

# JCodeMunch: exact published package version; no bare system pip.
if ! jcodemunch-mcp --version 2>/dev/null | grep -Fq "$JCODEMUNCH_VERSION"; then
  if command -v pipx >/dev/null 2>&1; then
    pipx install --force "jcodemunch-mcp==$JCODEMUNCH_VERSION"
  elif command -v uv >/dev/null 2>&1; then
    uv tool install --force "jcodemunch-mcp==$JCODEMUNCH_VERSION"
  else
    echo 'ERROR: install pipx or uv first; refusing bare system pip' >&2
    exit 2
  fi
fi
jcodemunch-mcp --version | grep -F "$JCODEMUNCH_VERSION"
jcodemunch-mcp init --yes --claude-md global --hooks --index --audit

# RTK: exact reviewed release commit, Cargo.lock honored.
if ! command -v rtk >/dev/null 2>&1 || ! rtk --version 2>/dev/null | grep -Fq "$RTK_VERSION" || ! rtk gain >/dev/null 2>&1; then
  require cargo 3
  cargo install --force --locked --git https://github.com/rtk-ai/rtk --rev "$RTK_REV"
fi
rtk --version | grep -F "$RTK_VERSION"
rtk gain >/dev/null
rtk init -g --auto-patch || rtk init -g --no-patch
if command -v hermes >/dev/null 2>&1; then rtk init --agent hermes || true; fi

# Skills: fetch immutable commits and copy data only. Do not execute mutable remote installers.
require git 4
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fetch_pinned_repo https://github.com/JuliusBrussee/caveman.git "$CAVEMAN_REV" "$tmp/caveman"
install_skill_everywhere "$tmp/caveman/skills/caveman" caveman "$CAVEMAN_REV"
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/caveman"
printf '{\n  "defaultMode": "lite"\n}\n' > "${XDG_CONFIG_HOME:-$HOME/.config}/caveman/config.json"

fetch_pinned_repo https://github.com/oso95/scroll-world.git "$SCROLL_WORLD_REV" "$tmp/scroll-world"
install_skill_everywhere "$tmp/scroll-world/skills/scroll-world" scroll-world "$SCROLL_WORLD_REV"

fetch_pinned_repo https://github.com/zarazhangrui/codebase-to-course.git "$CODEBASE_TO_COURSE_REV" "$tmp/codebase-to-course"
install_skill_everywhere "$tmp/codebase-to-course" codebase-to-course "$CODEBASE_TO_COURSE_REV"

echo 'Bootstrap complete. Run scripts/agent/verify-token-tools.sh.'
