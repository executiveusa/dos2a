# Design: add-tenant-data-foundation

## Database strategy

Use a dedicated owner-controlled PostgreSQL/Supabase project for the Sovereign AV Business OS when the owner confirms the target organization. The repository migration is the source-controlled schema contract.

Do not mutate the legacy root Prisma marketplace schema. The new migration is additive and independent.

## Foundation tables

### Identity / tenancy

- `tenants`
- `profiles`
- `tenant_memberships`

### CRM

- `contacts`
- `companies`
- `lead_sources`
- `leads`
- `event_briefs`
- `services`
- `lead_services`

### Communications

- `conversations`
- `messages`

### Governance

- `agent_identities`
- `audit_events`

Booking, proposals, projects, approvals, vendors, crew, assets, content, backups, and exports are introduced in later bounded migrations.

## Tenant isolation

All tenant-owned records include `tenant_id` with a foreign key to `tenants(id)` and an index suitable for tenant filtering.

Authenticated access is evaluated through membership helper functions in a schema-qualified, non-exposed `private` schema:

- `private.is_tenant_member(uuid)`
- `private.has_tenant_role(uuid, text[])`

The helpers are `security definer`, use a fixed search path, and expose only boolean authorization decisions. Application code never receives database credentials through these helpers.

## Roles

Initial membership roles:

- `owner`
- `admin`
- `sales`
- `operations`
- `editor`
- `viewer`

Role policy intent:

- owner/admin: tenant administration and destructive business-record actions where permitted;
- sales: CRM/contact/lead/event-brief/conversation write access;
- operations: operational read/write access needed for event handoff later;
- editor: content-related capability later; read access to selected CRM context only when required;
- viewer: read-only business visibility.

No role authorizes production deployment, secret access, unrestricted SQL, or agent permission changes.

## Bootstrap rule

Tenant creation and initial owner membership are server-side onboarding operations using a privileged, audited path. Ordinary authenticated browser clients do not receive a generic policy that can create arbitrary tenants or elevate membership roles.

## Audit rule

`audit_events` is append-only from the application perspective. Ordinary authenticated browser roles receive read access only when role policy allows; writes occur through trusted server-side operations/service role or later narrowly scoped RPCs.

## RLS policy principles

- enable RLS on every exposed business table;
- no public/anonymous business-record policies in this foundation;
- use membership helpers instead of trusting user-editable JWT metadata;
- tenant owners/admins can manage memberships, but ordinary members cannot self-elevate;
- tenant deletion is not exposed through an authenticated RLS delete policy;
- `UPDATE` policies are paired with appropriate `SELECT` policies;
- indexes exist for `tenant_id`, membership user lookup, status/date fields used by common queries.

## Data minimization

Contacts store only business-operational information needed for inquiry/client workflows. Sensitive secrets, payment credentials, private API keys, and model-provider keys are not stored in CRM tables.

## Migration safety

- migration file is additive;
- no DROP/ALTER against legacy marketplace tables;
- no production apply in this PR;
- test on a local/dev Supabase database before live apply;
- capture a separate live-database rollback/backup receipt immediately before any future production migration.

## Testing

Use Supabase CLI/pgTAP-compatible SQL tests to assert:

- required table existence;
- primary tenant/membership constraints;
- RLS policy inventory for high-value tables;
- helper-function existence/security-definer attributes;
- absence of a tenant delete policy for ordinary authenticated users.

Behavioral cross-tenant tests are required before any application uses the schema in production. They are not considered proven merely because policy definitions exist.

## Future integration

The first runtime consumer should be the lead/CRM revenue circuit. The public website submits to a server-side endpoint, which validates input, resolves the tenant server-side, writes one durable lead/contact/event-brief transaction, creates an audit event, and triggers owner notification. The browser must never be trusted to choose an arbitrary `tenant_id`.
