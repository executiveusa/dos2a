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
BACKUP_DIR="$(cd "$BACKUP_DIR" && pwd -P)"

stamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup_name="dosa-os-$stamp.sql.gz"
base="$BACKUP_DIR/$backup_name"

umask 077
# Preserve ACL/grant statements so an exact recovery also restores the
# server-only security boundary (for example service_role-only RPC access).
# Ownership remains excluded so restores are portable across hosts.
pg_dump "$DB_URL" \
  --format=plain \
  --no-owner \
  --clean \
  --if-exists \
  | gzip -9 > "$base"

(
  cd "$BACKUP_DIR"
  sha256sum "$backup_name" > "$backup_name.sha256"
)

find "$BACKUP_DIR" -type f \( -name 'dosa-os-*.sql.gz' -o -name 'dosa-os-*.sql.gz.sha256' \) \
  -mtime "+$RETENTION_DAYS" -delete

echo "Backup created: $base"
echo "Checksum: $base.sha256"
