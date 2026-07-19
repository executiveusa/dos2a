set lock_timeout = '5s';
set statement_timeout = '60s';

create schema if not exists bookings;
create schema if not exists proposals;
create schema if not exists projects;

create table if not exists crm.intake_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete restrict,
  request_id text not null,
  idempotency_key text,
  payload_hash text not null check (payload_hash ~ '^[0-9a-f]{64}$'),
  source_channel text not null default 'web' check (source_channel in ('web','la_genio','owner','import')),
  status text not null default 'processing' check (status in ('processing','completed','failed')),
  lead_id uuid,
  failure_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (tenant_id, request_id),
  constraint intake_request_completion_state check ((status='completed' and lead_id is not null and completed_at is not null and failure_code is null) or (status='failed' and lead_id is null and failure_code is not null) or (status='processing' and completed_at is null and failure_code is null)),
  constraint intake_request_lead_fk foreign key (tenant_id, lead_id) references crm.leads(tenant_id, id) on delete restrict
);
create unique index if not exists intake_requests_tenant_idempotency_uidx on crm.intake_requests(tenant_id,idempotency_key) where idempotency_key is not null;

create table if not exists app_core.outbox_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete restrict,
  topic text not null,
  aggregate_type text not null,
  aggregate_id uuid not null,
  idempotency_key text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','processing','delivered','dead')),
  attempts integer not null default 0 check (attempts>=0),
  available_at timestamptz not null default now(), locked_at timestamptz, locked_by text,
  delivered_at timestamptz, last_error text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (tenant_id,topic,idempotency_key),
  constraint outbox_delivery_state check ((status='delivered' and delivered_at is not null) or (status<>'delivered' and delivered_at is null))
);
create index if not exists outbox_pending_idx on app_core.outbox_events(status,available_at,created_at) where status in ('pending','processing');

create table if not exists bookings.calendar_slots (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references app_core.tenants(id) on delete restrict,
  lead_id uuid, slot_type text not null check (slot_type in ('discovery_call','technical_visit','event')),
  status text not null default 'tentative' check (status in ('tentative','confirmed','cancelled','completed')),
  starts_at timestamptz not null, ends_at timestamptz not null, timezone text not null,
  hold_expires_at timestamptz, resource_keys text[] not null default '{}'::text[], provider text, provider_event_id text, notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique (tenant_id,id),
  constraint booking_time_order check (ends_at>starts_at),
  constraint booking_tentative_expiry check (status<>'tentative' or hold_expires_at is not null),
  constraint booking_hold_before_start check (hold_expires_at is null or hold_expires_at<=starts_at),
  constraint booking_lead_fk foreign key (tenant_id,lead_id) references crm.leads(tenant_id,id) on delete restrict
);
create index if not exists calendar_slots_tenant_time_idx on bookings.calendar_slots(tenant_id,starts_at,ends_at) where status in ('tentative','confirmed');
create index if not exists calendar_slots_resource_gin_idx on bookings.calendar_slots using gin(resource_keys);

create or replace function bookings.reject_resource_overlap() returns trigger language plpgsql as $$
declare resource text;
begin
  if new.status not in ('tentative','confirmed') or coalesce(array_length(new.resource_keys,1),0)=0 then return new; end if;
  new.resource_keys:=array(select distinct trim(value) from unnest(new.resource_keys) value where trim(value)<>'' order by 1);
  foreach resource in array new.resource_keys loop perform pg_advisory_xact_lock(hashtextextended(new.tenant_id::text||':'||resource,0)); end loop;
  if exists(select 1 from bookings.calendar_slots existing where existing.tenant_id=new.tenant_id and existing.id<>new.id and existing.status in ('tentative','confirmed') and existing.resource_keys&&new.resource_keys and tstzrange(existing.starts_at,existing.ends_at,'[)')&&tstzrange(new.starts_at,new.ends_at,'[)')) then raise exception using errcode='23P01',message='booking resource conflict'; end if;
  return new;
end;$$;
drop trigger if exists calendar_slots_resource_overlap on bookings.calendar_slots;
create trigger calendar_slots_resource_overlap before insert or update of tenant_id,starts_at,ends_at,status,resource_keys on bookings.calendar_slots for each row execute function bookings.reject_resource_overlap();

create table if not exists proposals.proposals (
 id uuid primary key default gen_random_uuid(), tenant_id uuid not null references app_core.tenants(id) on delete restrict, lead_id uuid not null,
 status text not null default 'draft' check(status in ('draft','pending_approval','approved','sent','accepted','rejected','expired','superseded')),
 currency char(3) not null default 'MXN', current_version integer not null default 1 check(current_version>0), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(tenant_id,id),
 constraint proposal_lead_fk foreign key(tenant_id,lead_id) references crm.leads(tenant_id,id) on delete restrict
);
create table if not exists proposals.proposal_versions (
 id uuid primary key default gen_random_uuid(), tenant_id uuid not null, proposal_id uuid not null, version integer not null check(version>0),
 subtotal_minor bigint not null check(subtotal_minor>=0), tax_minor bigint not null default 0 check(tax_minor>=0), total_minor bigint not null check(total_minor>=0), currency char(3) not null, snapshot jsonb not null, created_by_actor text not null, created_at timestamptz not null default now(), unique(tenant_id,proposal_id,version), unique(tenant_id,id),
 constraint proposal_version_parent_fk foreign key(tenant_id,proposal_id) references proposals.proposals(tenant_id,id) on delete cascade,
 constraint proposal_total_math check(total_minor=subtotal_minor+tax_minor)
);
create table if not exists proposals.proposal_approvals (
 id uuid primary key default gen_random_uuid(), tenant_id uuid not null, proposal_id uuid not null, proposal_version_id uuid not null,
 approved_by_user_id uuid not null, decision text not null check(decision in ('approved','rejected')), note text, decided_at timestamptz not null default now(),
 constraint approval_proposal_fk foreign key(tenant_id,proposal_id) references proposals.proposals(tenant_id,id) on delete cascade,
 constraint approval_version_fk foreign key(tenant_id,proposal_version_id) references proposals.proposal_versions(tenant_id,id) on delete restrict
);
create table if not exists projects.projects (
 id uuid primary key default gen_random_uuid(), tenant_id uuid not null references app_core.tenants(id) on delete restrict, lead_id uuid not null,
 source_proposal_id uuid not null, source_proposal_version_id uuid not null,
 status text not null default 'confirmed' check(status in ('confirmed','planning','active','completed','cancelled')),
 confirmed_total_minor bigint not null check(confirmed_total_minor>=0), currency char(3) not null, event_date date, venue text, proposal_snapshot jsonb not null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(tenant_id,id), unique(tenant_id,source_proposal_id),
 constraint project_lead_fk foreign key(tenant_id,lead_id) references crm.leads(tenant_id,id) on delete restrict,
 constraint project_proposal_fk foreign key(tenant_id,source_proposal_id) references proposals.proposals(tenant_id,id) on delete restrict,
 constraint project_proposal_version_fk foreign key(tenant_id,source_proposal_version_id) references proposals.proposal_versions(tenant_id,id) on delete restrict
);

comment on table crm.intake_requests is 'Idempotent receipts for public/assistant lead intake; provider delivery never defines lead durability.';
comment on table app_core.outbox_events is 'Transactional outbox for provider-neutral notification/integration delivery.';
comment on table proposals.proposal_approvals is 'Human approval evidence; agents may request approval but may not fabricate an owner decision.';
