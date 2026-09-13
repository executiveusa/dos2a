-- dos A explicit deny-by-default RLS policies.
-- Direct browser/authenticated access to dosa.* remains forbidden.
-- Privileged writes are server-side only through the service_role-gated RPC.

do $$
declare t text;
begin
  foreach t in array array['leads','event_briefs','intake_requests','audit_log'] loop
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_select', t);
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_insert', t);
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_update', t);
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_delete', t);

    execute format(
      'create policy %I on dosa.%I for select to anon, authenticated using (false)',
      t || '_deny_select', t
    );
    execute format(
      'create policy %I on dosa.%I for insert to anon, authenticated with check (false)',
      t || '_deny_insert', t
    );
    execute format(
      'create policy %I on dosa.%I for update to anon, authenticated using (false) with check (false)',
      t || '_deny_update', t
    );
    execute format(
      'create policy %I on dosa.%I for delete to anon, authenticated using (false)',
      t || '_deny_delete', t
    );
  end loop;
end $$;
