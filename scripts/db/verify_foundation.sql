\set ON_ERROR_STOP on

begin;

-- Structural presence checks.
do $$
declare
  required_table text;
  required_tables text[] := array[
    'app_core.tenants',
    'app_core.tenant_memberships',
    'crm.companies',
    'crm.contacts',
    'crm.lead_sources',
    'crm.leads',
    'crm.event_briefs',
    'crm.services',
    'crm.lead_services',
    'comms.conversations',
    'comms.messages',
    'agent_audit.agent_identities',
    'agent_audit.audit_events'
  ];
begin
  foreach required_table in array required_tables loop
    if to_regclass(required_table) is null then
      raise exception 'required table missing: %', required_table;
    end if;
  end loop;
end;
$$;

-- The new schemas must not be implicitly exposed to PUBLIC.
do $$
declare
  schema_name text;
begin
  foreach schema_name in array array['app_core','crm','comms','agent_audit'] loop
    if has_schema_privilege('public', schema_name, 'USAGE') then
      raise exception 'schema % unexpectedly grants USAGE to PUBLIC', schema_name;
    end if;
  end loop;
end;
$$;

-- Cross-tenant composite foreign keys must reject accidental association.
do $$
declare
  tenant_a uuid;
  tenant_b uuid;
  company_b uuid;
  rejected boolean := false;
begin
  insert into app_core.tenants (slug, name) values ('verify-a', 'Verify A') returning id into tenant_a;
  insert into app_core.tenants (slug, name) values ('verify-b', 'Verify B') returning id into tenant_b;
  insert into crm.companies (tenant_id, name) values (tenant_b, 'Company B') returning id into company_b;

  begin
    insert into crm.contacts (tenant_id, company_id, first_name)
    values (tenant_a, company_b, 'Cross Tenant');
  exception when foreign_key_violation then
    rejected := true;
  end;

  if not rejected then
    raise exception 'cross-tenant contact/company association was not rejected';
  end if;
end;
$$;

-- updated_at trigger must advance on update.
do $$
declare
  tenant_id uuid;
  before_ts timestamptz;
  after_ts timestamptz;
begin
  insert into app_core.tenants (slug, name)
  values ('verify-trigger', 'Verify Trigger')
  returning id, updated_at into tenant_id, before_ts;

  perform pg_sleep(0.01);
  update app_core.tenants set name = 'Verify Trigger Updated' where id = tenant_id;
  select updated_at into after_ts from app_core.tenants where id = tenant_id;

  if after_ts <= before_ts then
    raise exception 'updated_at trigger did not advance timestamp';
  end if;
end;
$$;

-- Required integrity constraints and indexes must exist.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'contacts_company_same_tenant_fk' and contype = 'f'
  ) then
    raise exception 'contacts_company_same_tenant_fk missing';
  end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname = 'crm' and indexname = 'leads_tenant_status_idx'
  ) then
    raise exception 'leads_tenant_status_idx missing';
  end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname = 'agent_audit' and indexname = 'audit_events_tenant_created_idx'
  ) then
    raise exception 'audit_events_tenant_created_idx missing';
  end if;
end;
$$;

rollback;

\echo 'Tenant data foundation verification passed.'
