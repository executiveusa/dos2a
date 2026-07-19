#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MIGRATIONS_DIR="${MIGRATIONS_DIR:-$ROOT_DIR/supabase/migrations}"
DB_URL="${DB_ADMIN_URL:-${DATABASE_URL:-}}"

if [[ -z "$DB_URL" ]]; then
  echo "ERROR: set DB_ADMIN_URL or DATABASE_URL" >&2
  exit 2
fi

for binary in psql sha256sum awk; do
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

tmp_files=()
cleanup() {
  if [[ ${#tmp_files[@]} -gt 0 ]]; then
    rm -f "${tmp_files[@]}"
  fi
}
trap cleanup EXIT

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

  # The runner owns the transaction so the schema change and checksum receipt
  # commit atomically. A migration may contain only an optional outer BEGIN/COMMIT
  # wrapper; nested/manual transaction control is rejected.
  sanitized="$(mktemp)"
  tmp_files+=("$sanitized")

  if ! awk '
    {
      lines[NR] = $0
      trimmed = tolower($0)
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", trimmed)

      if (trimmed !~ /^$/ && trimmed !~ /^--/) {
        if (first_code == 0) first_code = NR
        last_code = NR
      }

      if (trimmed ~ /^begin;([[:space:]]*--.*)?$/) {
        tx_count++
        tx_line[tx_count] = NR
        tx_type[tx_count] = "begin"
      } else if (trimmed ~ /^commit;([[:space:]]*--.*)?$/) {
        tx_count++
        tx_line[tx_count] = NR
        tx_type[tx_count] = "commit"
      } else if (trimmed ~ /^(rollback|start[[:space:]]+transaction);([[:space:]]*--.*)?$/) {
        bad_tx = 1
      }
    }
    END {
      if (bad_tx) {
        print "ERROR: migration contains unsupported transaction control" > "/dev/stderr"
        exit 42
      }

      if (tx_count == 0) {
        for (i = 1; i <= NR; i++) print lines[i]
        exit 0
      }

      if (tx_count == 2 && tx_type[1] == "begin" && tx_type[2] == "commit" && tx_line[1] == first_code && tx_line[2] == last_code) {
        for (i = 1; i <= NR; i++) {
          if (i != tx_line[1] && i != tx_line[2]) print lines[i]
        }
        exit 0
      }

      print "ERROR: migration transaction control must be one optional outer BEGIN/COMMIT wrapper" > "/dev/stderr"
      exit 43
    }
  ' "$migration" > "$sanitized"; then
    echo "ERROR: unsafe transaction structure in $version" >&2
    exit 7
  fi

  echo "Applying $version"
  psql "$DB_URL" \
    --single-transaction \
    --set=ON_ERROR_STOP=1 \
    --no-psqlrc \
    --file="$sanitized" \
    --command="insert into app_meta.schema_migrations(version, checksum) values ('$version', '$checksum');"
done

echo "Migration set applied successfully."
