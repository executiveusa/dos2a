#!/usr/bin/env bash
set -euo pipefail

DB_URL="${DB_ADMIN_URL:-${DATABASE_URL:-}}"
BACKUP_FILE="${1:-}"
CONFIRM="${RESTORE_CONFIRM:-}"

if [[ -z "$DB_URL" ]]; then
  echo "ERROR: set DB_ADMIN_URL or DATABASE_URL" >&2
  exit 2
fi

if [[ -z "$BACKUP_FILE" || ! -f "$BACKUP_FILE" ]]; then
  echo "Usage: RESTORE_CONFIRM=RESTORE_DOSA_OS $0 path/to/backup.sql.gz" >&2
  exit 3
fi

if [[ "$CONFIRM" != "RESTORE_DOSA_OS" ]]; then
  echo "ERROR: restore is destructive. Set RESTORE_CONFIRM=RESTORE_DOSA_OS explicitly." >&2
  exit 4
fi

for binary in gzip psql sha256sum; do
  if ! command -v "$binary" >/dev/null 2>&1; then
    echo "ERROR: $binary is required" >&2
    exit 5
  fi
done

BACKUP_DIR="$(cd "$(dirname "$BACKUP_FILE")" && pwd -P)"
BACKUP_NAME="$(basename "$BACKUP_FILE")"
BACKUP_FILE="$BACKUP_DIR/$BACKUP_NAME"
CHECKSUM_FILE="$BACKUP_FILE.sha256"

if [[ -f "$CHECKSUM_FILE" ]]; then
  (
    cd "$BACKUP_DIR"
    sha256sum --check "$BACKUP_NAME.sha256"
  )
else
  echo "WARNING: no checksum file found at $CHECKSUM_FILE" >&2
fi

echo "Restoring $BACKUP_FILE"
gzip -dc "$BACKUP_FILE" | psql "$DB_URL" \
  --single-transaction \
  --set=ON_ERROR_STOP=1 \
  --no-psqlrc

echo "Restore completed. Run verification before accepting traffic."
