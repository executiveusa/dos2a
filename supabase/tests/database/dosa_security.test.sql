-- dos A database-boundary verification.
-- Run with a privileged verification connection in a disposable or controlled environment.

\set ON_ERROR_STOP on

-- Required tables.
select to_regclass('dosa.leads') is not null as leads_exists,
       to_regclass('dosa.event_briefs') is not null as briefs_exist,
       to_regclass('dosa.intake_requests') is not null as intake_exists,
       to_regclass('dosa.audit_log') is not null as audit_exists;

-- RLS must be enabled and forced on every app table.
do $$
begin
  if exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid=c.relnamespace
    where n.nspname='dosa' and c.relkind='r'
      and (not c.relrowsecurity or not c.relforcerowsecurity)
  ) then
    raise exception 'dosa RLS contract failed';
  end if;
end $$;

-- anon/authenticated must not have direct table grants.
do $$
begin
  if exists (
    select 1 from information_schema.role_table_grants
    where table_schema='dosa' and grantee in ('anon','authenticated')
  ) then
    raise exception 'direct client table grant detected';
  end if;
end $$;

-- The public RPC must be server-only.
do $$
begin
  if exists (
    select 1 from information_schema.role_routine_grants
    where routine_schema='public' and routine_name='dosa_create_public_lead'
      and grantee in ('PUBLIC','anon','authenticated')
  ) then
    raise exception 'public lead RPC is executable by an unapproved role';
  end if;
  if not exists (
    select 1 from information_schema.role_routine_grants
    where routine_schema='public' and routine_name='dosa_create_public_lead'
      and grantee='service_role' and privilege_type='EXECUTE'
  ) then
    raise exception 'service_role execute grant missing';
  end if;
end $$;

-- Explicit deny policies: four commands per table.
do $$
declare expected_count integer := 16; actual_count integer;
begin
  select count(*) into actual_count
  from pg_policies
  where schemaname='dosa'
    and roles @> array['anon','authenticated']::name[]
    and cmd in ('SELECT','INSERT','UPDATE','DELETE');
  if actual_count <> expected_count then
    raise exception 'expected % explicit deny policies, found %', expected_count, actual_count;
  end if;
end $$;
