-- dos A isolated Supabase lead-intake schema.
-- Shared infrastructure, isolated application namespace. No cross-app access.

create schema if not exists dosa;
revoke all on schema dosa from public, anon, authenticated;

create table if not exists dosa.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text,
  phone text,
  company text,
  locale text not null default 'es-MX' check (locale in ('es-MX','en')),
  source_channel text not null default 'web' check (source_channel in ('web','email_fallback','manual')),
  status text not null default 'new' check (status in ('new','contacted','qualified','proposal','won','lost','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists dosa.event_briefs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references dosa.leads(id) on delete cascade,
  event_type text,
  event_date date,
  location text,
  guest_count integer check (guest_count is null or guest_count between 1 and 1000000),
  needs text not null check (char_length(needs) between 10 and 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists dosa.intake_requests (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  idempotency_key text unique,
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  lead_id uuid not null references dosa.leads(id) on delete restrict,
  source_ip_hash text,
  created_at timestamptz not null default now()
);

create table if not exists dosa.audit_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  request_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists dosa_leads_created_idx on dosa.leads(created_at desc);
create index if not exists dosa_leads_status_idx on dosa.leads(status, created_at desc);
create index if not exists dosa_event_briefs_event_date_idx on dosa.event_briefs(event_date) where event_date is not null;
create index if not exists dosa_audit_created_idx on dosa.audit_log(created_at desc);

create or replace function dosa.touch_updated_at() returns trigger language plpgsql set search_path = pg_catalog as $$
begin new.updated_at = statement_timestamp(); return new; end; $$;

drop trigger if exists dosa_leads_touch_updated_at on dosa.leads;
create trigger dosa_leads_touch_updated_at before update on dosa.leads for each row execute function dosa.touch_updated_at();
drop trigger if exists dosa_event_briefs_touch_updated_at on dosa.event_briefs;
create trigger dosa_event_briefs_touch_updated_at before update on dosa.event_briefs for each row execute function dosa.touch_updated_at();

alter table dosa.leads enable row level security;
alter table dosa.leads force row level security;
alter table dosa.event_briefs enable row level security;
alter table dosa.event_briefs force row level security;
alter table dosa.intake_requests enable row level security;
alter table dosa.intake_requests force row level security;
alter table dosa.audit_log enable row level security;
alter table dosa.audit_log force row level security;

revoke all on all tables in schema dosa from public, anon, authenticated;
revoke all on all sequences in schema dosa from public, anon, authenticated;

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
