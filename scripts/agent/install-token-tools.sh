#!/usr/bin/env bash
set -euo pipefail

echo '== dos A token-tool bootstrap =='

if ! command -v jcodemunch-mcp >/dev/null 2>&1; then
  if command -v pipx >/dev/null 2>&1; then pipx install jcodemunch-mcp
  elif command -v uv >/dev/null 2>&1; then uv tool install jcodemunch-mcp
  else echo 'ERROR: install pipx or uv; refusing bare system pip' >&2; exit 2; fi
fi
jcodemunch-mcp init --yes --claude-md global --hooks --index --audit

if ! command -v rtk >/dev/null 2>&1 || ! rtk gain >/dev/null 2>&1; then
  command -v cargo >/dev/null 2>&1 || { echo 'ERROR: cargo required to install official rtk-ai/rtk' >&2; exit 3; }
  cargo install --git https://github.com/rtk-ai/rtk
fi
rtk gain >/dev/null
rtk init -g --auto-patch || rtk init -g --no-patch
if command -v hermes >/dev/null 2>&1; then rtk init --agent hermes || true; fi

if command -v git >/dev/null 2>&1 && command -v node >/dev/null 2>&1; then
  tmp="$(mktemp -d)"
  git clone --depth 1 https://github.com/JuliusBrussee/caveman.git "$tmp/caveman"
  node "$tmp/caveman/bin/install.js" --all --non-interactive
  rm -rf "$tmp"
  mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/caveman"
  printf '{\n  "defaultMode": "lite"\n}\n' > "${XDG_CONFIG_HOME:-$HOME/.config}/caveman/config.json"
fi

if command -v npx >/dev/null 2>&1; then
  npx --yes skills add oso95/scroll-world -g -y || true
fi

echo 'Bootstrap complete. Run scripts/agent/verify-token-tools.sh.'
