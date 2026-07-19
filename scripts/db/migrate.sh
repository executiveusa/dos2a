#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MIGRATIONS_DIR="${MIGRATIONS_DIR:-$ROOT_DIR/supabase/migrations}"
DB_URL="${DB_ADMIN_URL:-${DATABASE_URL:-}}"

if [[ -z "$DB_URL" ]]; then
  echo "ERROR: set DB_ADMIN_URL or DATABASE_URL" >&2
  exit 2
fi

for binary in psql sha256sum; do
  if ! command -v "$binary" >/dev/null 2>&1; then
    echo "ERROR: $binary is required" >&2
    exit 3
  fi
done

mapfile -t migrations < <(find "$MIGRATIONS_DIR" -maxdepth 1 -type f -name '*.sql' | sort)

if [[ ${#migrations[@]} -eq 0 ]]; then
  echo "ERROR: no migration files found in $MIGRATIONS_DIR" >&2
  exit 4
fi

psql "$DB_URL" --set=ON_ERROR_STOP=1 --no-psqlrc <<'SQL'
create schema if not exists app_meta;
create table if not exists app_meta.schema_migrations (
  version text primary key,
  checksum text not null,
  applied_at timestamptz not null default now()
);
SQL

for migration in "${migrations[@]}"; do
  version="$(basename "$migration")"
  checksum="$(sha256sum "$migration" | awk '{print $1}')"

  if [[ ! "$version" =~ ^[A-Za-z0-9._-]+$ ]]; then
    echo "ERROR: unsafe migration filename: $version" >&2
    exit 5
  fi

  existing_checksum="$(psql "$DB_URL" --no-psqlrc -Atc "select checksum from app_meta.schema_migrations where version = '$version';")"

  if [[ -n "$existing_checksum" ]]; then
    if [[ "$existing_checksum" != "$checksum" ]]; then
      echo "ERROR: applied migration changed on disk: $version" >&2
      echo "database checksum: $existing_checksum" >&2
      echo "file checksum:     $checksum" >&2
      exit 6
    fi
    echo "Skipping already-applied migration $version"
    continue
  fi

  echo "Applying $version"
  psql "$DB_URL" \
    --set=ON_ERROR_STOP=1 \
    --no-psqlrc \
    --file="$migration"

  psql "$DB_URL" --set=ON_ERROR_STOP=1 --no-psqlrc \
    -c "insert into app_meta.schema_migrations(version, checksum) values ('$version', '$checksum');"
done

echo "Migration set applied successfully."
