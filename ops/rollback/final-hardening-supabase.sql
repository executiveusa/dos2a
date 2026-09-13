-- Roll back only the additive final-hardening database changes to the captured
-- baseline behavior at master dc8b5559d08fcde7c0df191fde48d22b1c441c41.
-- This does not delete customer rows or drop dos A tables.

begin;

-- Restore the prior explicit-deny policy mode from the baseline implementation.
do $$
declare t text;
begin
  foreach t in array array['leads','event_briefs','intake_requests','audit_log'] loop
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_select', t);
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_insert', t);
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_update', t);
    execute format('drop policy if exists %I on dosa.%I', t || '_deny_delete', t);
    execute format('create policy %I on dosa.%I for select to anon, authenticated using (false)', t || '_deny_select', t);
    execute format('create policy %I on dosa.%I for insert to anon, authenticated with check (false)', t || '_deny_insert', t);
    execute format('create policy %I on dosa.%I for update to anon, authenticated using (false) with check (false)', t || '_deny_update', t);
    execute format('create policy %I on dosa.%I for delete to anon, authenticated using (false)', t || '_deny_delete', t);
  end loop;
end $$;

-- Restore the baseline lead RPC without the final-hardening IP rate limit.
create or replace function public.dosa_create_public_lead(
  p_request_id text, p_idempotency_key text, p_payload_hash text,
  p_name text, p_email text, p_phone text, p_company text, p_locale text,
  p_event_type text, p_event_date date, p_location text, p_guest_count integer,
  p_needs text, p_source_ip_hash text default null
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public as $$
declare v_existing record; v_lead_id uuid;
begin
  if p_idempotency_key is not null then
    perform pg_advisory_xact_lock(hashtextextended('dosa:' || p_idempotency_key, 0));
    select ir.lead_id, ir.payload_hash into v_existing from dosa.intake_requests ir where ir.idempotency_key = p_idempotency_key;
    if found then
      if v_existing.payload_hash <> p_payload_hash then raise exception using errcode='22023', message='idempotency_conflict'; end if;
      return jsonb_build_object('leadId',v_existing.lead_id,'requestId',p_request_id,'duplicate',true);
    end if;
  end if;
  insert into dosa.leads(name,email,phone,company,locale,source_channel)
  values (p_name,nullif(p_email,''),nullif(p_phone,''),nullif(p_company,''),p_locale,'web') returning id into v_lead_id;
  insert into dosa.event_briefs(lead_id,event_type,event_date,location,guest_count,needs)
  values (v_lead_id,nullif(p_event_type,''),p_event_date,nullif(p_location,''),p_guest_count,p_needs);
  insert into dosa.intake_requests(request_id,idempotency_key,payload_hash,lead_id,source_ip_hash)
  values (p_request_id,nullif(p_idempotency_key,''),p_payload_hash,v_lead_id,nullif(p_source_ip_hash,''));
  insert into dosa.audit_log(action,entity_type,entity_id,request_id,metadata)
  values ('lead.created','lead',v_lead_id,p_request_id,jsonb_build_object('source','web'));
  return jsonb_build_object('leadId',v_lead_id,'requestId',p_request_id,'duplicate',false);
end; $$;

revoke all on function public.dosa_create_public_lead(text,text,text,text,text,text,text,text,text,date,text,integer,text,text) from public, anon, authenticated;
grant execute on function public.dosa_create_public_lead(text,text,text,text,text,text,text,text,text,date,text,integer,text,text) to service_role;

drop index if exists dosa.dosa_intake_source_ip_created_idx;
drop index if exists dosa.dosa_intake_requests_lead_idx;

commit;
