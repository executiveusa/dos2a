#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DB_ADMIN_URL:-${DATABASE_URL:-}}"
BACKUP_DIR="${DB_BACKUP_DIR:-./backups}"
RETENTION_DAYS="${DB_BACKUP_RETENTION_DAYS:-14}"

if [[ -z "$DB_URL" ]]; then
  echo "ERROR: set DB_ADMIN_URL or DATABASE_URL" >&2
  exit 2
fi

for binary in pg_dump gzip sha256sum; do
  if ! command -v "$binary" >/dev/null 2>&1; then
    echo "ERROR: $binary is required" >&2
    exit 3
  fi
done

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR" || true

stamp="$(date -u +%Y%m%dT%H%M%SZ)"
base="$BACKUP_DIR/dosa-os-$stamp.sql.gz"

umask 077
pg_dump "$DB_URL" \
  --format=plain \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  | gzip -9 > "$base"

sha256sum "$base" > "$base.sha256"

find "$BACKUP_DIR" -type f \( -name 'dosa-os-*.sql.gz' -o -name 'dosa-os-*.sql.gz.sha256' \) \
  -mtime "+$RETENTION_DAYS" -delete

echo "Backup created: $base"
echo "Checksum: $base.sha256"
