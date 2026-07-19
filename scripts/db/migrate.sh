#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MIGRATIONS_DIR="${MIGRATIONS_DIR:-$ROOT_DIR/supabase/migrations}"
DB_URL="${DB_ADMIN_URL:-${DATABASE_URL:-}}"

if [[ -z "$DB_URL" ]]; then
  echo "ERROR: set DB_ADMIN_URL or DATABASE_URL" >&2
  exit 2
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "ERROR: psql is required" >&2
  exit 3
fi

mapfile -t migrations < <(find "$MIGRATIONS_DIR" -maxdepth 1 -type f -name '*.sql' | sort)

if [[ ${#migrations[@]} -eq 0 ]]; then
  echo "ERROR: no migration files found in $MIGRATIONS_DIR" >&2
  exit 4
fi

for migration in "${migrations[@]}"; do
  echo "Applying $(basename "$migration")"
  psql "$DB_URL" \
    --set=ON_ERROR_STOP=1 \
    --no-psqlrc \
    --file="$migration"
done

echo "Migration set applied successfully."
