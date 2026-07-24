-- dos A database-boundary verification.
-- Run with a privileged verification connection in a disposable or controlled environment.

\set ON_ERROR_STOP on

-- Required table set must be exact for this V1 schema.
do $$
declare actual text[];
begin
  select array_agg(c.relname order by c.relname) into actual
  from pg_class c
  join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='dosa' and c.relkind='r';
  if actual is distinct from array['audit_log','event_briefs','intake_requests','leads']::text[] then
    raise exception 'unexpected dosa table set: %', actual;
  end if;
end $$;

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

-- Exact restrictive deny matrix for every client role + CRUD command.
do $$
declare
  t text;
  cmd text;
  policy_name text;
  rec record;
begin
  foreach t in array array['audit_log','event_briefs','intake_requests','leads'] loop
    foreach cmd in array array['SELECT','INSERT','UPDATE','DELETE'] loop
      policy_name := t || '_deny_' || lower(cmd);
      select * into rec
      from pg_policies
      where schemaname='dosa' and tablename=t and policyname=policy_name;

      if not found then
        raise exception 'missing deny policy %.%', t, policy_name;
      end if;
      if rec.cmd <> cmd then
        raise exception 'wrong command for %: %', policy_name, rec.cmd;
      end if;
      if rec.permissive <> 'RESTRICTIVE' then
        raise exception 'policy % is not restrictive: %', policy_name, rec.permissive;
      end if;
      if not (rec.roles @> array['anon','authenticated']::name[] and cardinality(rec.roles)=2) then
        raise exception 'wrong roles for %: %', policy_name, rec.roles;
      end if;

      if cmd in ('SELECT','DELETE') then
        if rec.qual is distinct from 'false' or rec.with_check is not null then
          raise exception 'wrong predicate for %: qual %, with_check %', policy_name, rec.qual, rec.with_check;
        end if;
      elsif cmd='INSERT' then
        if rec.qual is not null or rec.with_check is distinct from 'false' then
          raise exception 'wrong predicate for %: qual %, with_check %', policy_name, rec.qual, rec.with_check;
        end if;
      elsif cmd='UPDATE' then
        if rec.qual is distinct from 'false' or rec.with_check is distinct from 'false' then
          raise exception 'wrong predicate for %: qual %, with_check %', policy_name, rec.qual, rec.with_check;
        end if;
      end if;
    end loop;
  end loop;

  if (select count(*) from pg_policies where schemaname='dosa') <> 16 then
    raise exception 'unexpected extra/missing dosa policies';
  end if;
end $$;
