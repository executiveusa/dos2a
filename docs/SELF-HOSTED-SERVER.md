# Self-Hosted Server Baseline

## Decision

The Sovereign AV Business OS is designed to run on owner-controlled infrastructure. Supabase is not required. PostgreSQL is the durable data dependency; application services, content services, agents, queues, backups, and observability are deployable on the owner's server when connection details are supplied later.

## What can be built before server connection

The repository can safely contain and verify:

- portable PostgreSQL migrations;
- tenant-aware data contracts;
- API/domain contracts;
- migration, backup, restore, and verification scripts;
- Docker-based local/dev infrastructure;
- CI database verification against stock PostgreSQL;
- application and agent service containers;
- reverse-proxy templates;
- health/readiness contracts;
- environment-variable contracts;
- backup/restore runbooks;
- deployment manifests that contain no real credentials.

No production database address, SSH credential, private key, provider key, or server secret belongs in Git.

## Minimum server capabilities

Recommended baseline:

- Linux host with Docker Engine + Compose v2, or equivalent container runtime;
- PostgreSQL 16+ on the host or a private database host;
- persistent encrypted storage for database and media;
- TLS termination through the owner's reverse proxy;
- outbound HTTPS for approved integrations;
- scheduled backup capability;
- centralized secret injection outside the repository;
- health monitoring and log retention.

The architecture does not require Kubernetes.

## Network boundary

Publicly reachable:

- web frontend;
- narrowly scoped public API endpoints such as quote/lead intake;
- approved webhook endpoints with signature verification.

Private/internal only:

- PostgreSQL;
- admin API;
- agent control plane;
- content-management administration;
- migration/maintenance credentials;
- backup storage;
- internal queues and observability endpoints.

## Database identities

Use separate credentials by responsibility:

1. `db_admin` — migrations, backup, restore. Never exposed to browser or ordinary application runtime.
2. `app_runtime` — least-privilege application CRUD through explicit schemas/functions.
3. `agent_runtime` — no direct broad SQL access; agents operate through governed application tools/APIs.
4. `backup_runtime` — read/backup permissions sufficient for automated backups, separated where operationally practical.

Phase 03 does not create these live identities because the real server is not connected yet.

## Local verification

Start a disposable PostgreSQL 16 database:

```bash
docker compose -f infra/postgres/docker-compose.dev.yml up -d
export DB_ADMIN_URL='postgresql://postgres:postgres@127.0.0.1:54329/dosa_os'
bash scripts/db/migrate.sh
psql "$DB_ADMIN_URL" --set=ON_ERROR_STOP=1 --file=scripts/db/verify_foundation.sql
```

Re-run the migration command. It must safely skip already-applied migrations whose checksums match.

## Migration safety

The migration runner records filename + SHA-256 in `app_meta.schema_migrations`.

Rules:

- never edit a migration after it has been applied to a real environment;
- checksum mismatch is a stop condition;
- create a new forward migration instead;
- take a verified backup immediately before production DDL;
- capture a rollback receipt and verification commands for every production migration;
- do not automatically apply production migrations merely because code merged.

## Backup

Example:

```bash
export DB_ADMIN_URL='postgresql://...'
export DB_BACKUP_DIR='/secure/backups/dosa-os'
bash scripts/db/backup.sh
```

The script creates a compressed SQL backup plus SHA-256 checksum and applies configurable retention.

Backups are not considered valid until restore has been tested into an isolated database.

## Restore

Restore is deliberately guarded:

```bash
export DB_ADMIN_URL='postgresql://isolated-restore-target/...'
RESTORE_CONFIRM=RESTORE_DOSA_OS \
  bash scripts/db/restore.sh /secure/backups/dosa-os/dosa-os-YYYYMMDDTHHMMSSZ.sql.gz
```

Never test restore by overwriting the only production database.

## Server connection handoff

When the owner is ready to connect the real server, collect only:

- server deployment method or SSH/agent access path;
- domain/reverse-proxy ownership;
- database location and whether PostgreSQL already exists;
- secret-management method;
- persistent volume paths;
- backup target;
- current firewall/private-network rules.

Then execute a separate high-risk infrastructure phase:

1. inventory the server without destructive changes;
2. create/verify backups;
3. create least-privilege identities;
4. apply migrations to an isolated/staging database first;
5. run verification and security checks;
6. deploy services behind private/public boundaries;
7. promote only after runtime evidence passes;
8. record rollback and recovery evidence.
