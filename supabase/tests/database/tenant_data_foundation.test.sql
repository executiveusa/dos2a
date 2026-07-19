begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;

select plan(25);

select has_schema('app_core', 'app_core schema exists');
select has_schema('crm', 'crm schema exists');
select has_schema('comms', 'comms schema exists');
select has_schema('agent_audit', 'agent_audit schema exists');

select has_table('app_core', 'tenants', 'tenants table exists');
select has_table('app_core', 'tenant_memberships', 'tenant_memberships table exists');
select has_table('crm', 'companies', 'companies table exists');
select has_table('crm', 'contacts', 'contacts table exists');
select has_table('crm', 'lead_sources', 'lead_sources table exists');
select has_table('crm', 'leads', 'leads table exists');
select has_table('crm', 'event_briefs', 'event_briefs table exists');
select has_table('crm', 'services', 'services table exists');
select has_table('crm', 'lead_services', 'lead_services table exists');
select has_table('comms', 'conversations', 'conversations table exists');
select has_table('comms', 'messages', 'messages table exists');
select has_table('agent_audit', 'agent_identities', 'agent_identities table exists');
select has_table('agent_audit', 'audit_events', 'audit_events table exists');

select is(
  (
    select count(*)::integer
    from information_schema.columns
    where column_name = 'tenant_id'
      and table_schema in ('app_core', 'crm', 'comms', 'agent_audit')
      and table_name <> 'tenants'
  ),
  11,
  'all tenant-owned foundation tables carry tenant_id'
);

select col_is_pk('app_core', 'tenants', 'id', 'tenants.id is the primary key');

select is(
  (
    select count(*)::integer
    from pg_constraint
    where conname like '%same_tenant_fk'
  ),
  11,
  'same-tenant foreign keys protect cross-record tenant integrity'
);

select is(
  (
    select count(*)::integer
    from information_schema.table_privileges
    where table_schema in ('app_core', 'crm', 'comms', 'agent_audit')
      and grantee in ('anon', 'authenticated')
  ),
  0,
  'foundation migration grants no table access to anon/authenticated roles'
);

select is(
  (
    select count(*)::integer
    from information_schema.tables
    where table_schema = 'public'
      and table_name in (
        'tenants', 'tenant_memberships', 'companies', 'contacts', 'lead_sources', 'leads',
        'event_briefs', 'services', 'lead_services', 'conversations', 'messages',
        'agent_identities', 'audit_events'
      )
  ),
  0,
  'foundation tables are not created in public schema'
);

select is(
  (
    select count(*)::integer
    from pg_trigger t
    join pg_class c on c.oid = t.tgrelid
    join pg_namespace n on n.oid = c.relnamespace
    where not t.tgisinternal
      and t.tgname like '%_set_updated_at'
      and n.nspname in ('app_core', 'crm', 'comms', 'agent_audit')
  ),
  10,
  'updated_at triggers exist on mutable foundation entities'
);

select is(
  (
    select count(*)::integer
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'app_core'
      and t.relname = 'tenant_memberships'
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) like '%owner%admin%sales%operations%editor%viewer%'
  ),
  1,
  'tenant membership role constraint contains the approved foundation roles'
);

select is(
  (
    select count(*)::integer
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'crm'
      and t.relname = 'event_briefs'
      and c.contype = 'u'
      and pg_get_constraintdef(c.oid) like '%tenant_id%lead_id%'
  ),
  1,
  'one foundation event brief is constrained per tenant/lead'
);

select * from finish();
rollback;
