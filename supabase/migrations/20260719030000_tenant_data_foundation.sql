-- Sovereign AV Business OS — tenant/data foundation
-- Additive only. No legacy marketplace tables are altered.
-- Portable PostgreSQL 16+ migration. These schemas are intentionally not exposed
-- to browser/API roles in this phase. Auth/RLS grants are a later bounded change.

begin;

set local lock_timeout = '5s';
set local statement_timeout = '60s';

create extension if not exists pgcrypto;

create schema if not exists app_core;
create schema if not exists crm;
create schema if not exists comms;
create schema if not exists agent_audit;

create or replace function app_core.touch_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.updated_at = statement_timestamp();
  return new;
end;
$$;

create table app_core.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 160),
  locale text not null default 'es-MX',
  timezone text not null default 'America/Mexico_City',
  currency text not null default 'MXN' check (currency ~ '^[A-Z]{3}$'),
  status text not null default 'active' check (status in ('active', 'suspended', 'archived')),
  created_by_user_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table app_core.tenant_memberships (
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner', 'admin', 'sales', 'operations', 'editor', 'viewer')),
  status text not null default 'active' check (status in ('active', 'invited', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (tenant_id, user_id)
);

create table crm.companies (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 240),
  domain text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id)
);

create table crm.contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  company_id uuid,
  first_name text,
  last_name text,
  email text,
  phone text,
  whatsapp text,
  locale text not null default 'es-MX',
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  constraint contacts_company_same_tenant_fk
    foreign key (tenant_id, company_id)
    references crm.companies(tenant_id, id)
);

create table crm.lead_sources (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  channel text not null default 'other' check (channel in ('website', 'whatsapp', 'phone', 'email', 'referral', 'social', 'partner', 'manual', 'other')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  unique (tenant_id, name)
);

create table crm.leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  primary_contact_id uuid,
  company_id uuid,
  source_id uuid,
  owner_user_id uuid,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'site_visit', 'proposal', 'won', 'lost', 'archived')),
  event_date date,
  venue text,
  city text,
  country_code text not null default 'MX' check (country_code ~ '^[A-Z]{2}$'),
  guest_count integer check (guest_count is null or guest_count >= 0),
  budget_min numeric(12,2) check (budget_min is null or budget_min >= 0),
  budget_max numeric(12,2) check (budget_max is null or budget_max >= 0),
  currency text not null default 'MXN' check (currency ~ '^[A-Z]{3}$'),
  next_action_at timestamptz,
  loss_reason text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  constraint leads_budget_order_chk check (budget_min is null or budget_max is null or budget_min <= budget_max),
  constraint leads_contact_same_tenant_fk
    foreign key (tenant_id, primary_contact_id)
    references crm.contacts(tenant_id, id),
  constraint leads_company_same_tenant_fk
    foreign key (tenant_id, company_id)
    references crm.companies(tenant_id, id),
  constraint leads_source_same_tenant_fk
    foreign key (tenant_id, source_id)
    references crm.lead_sources(tenant_id, id)
);

create table crm.event_briefs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  lead_id uuid not null,
  event_type text,
  event_date date,
  start_time time,
  end_time time,
  venue text,
  city text,
  guest_count integer check (guest_count is null or guest_count >= 0),
  indoor boolean,
  requirements jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  unique (tenant_id, lead_id),
  constraint event_briefs_lead_same_tenant_fk
    foreign key (tenant_id, lead_id)
    references crm.leads(tenant_id, id)
    on delete cascade
);

create table crm.services (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 160),
  category text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  unique (tenant_id, slug)
);

create table crm.lead_services (
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  lead_id uuid not null,
  service_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (tenant_id, lead_id, service_id),
  constraint lead_services_lead_same_tenant_fk
    foreign key (tenant_id, lead_id)
    references crm.leads(tenant_id, id)
    on delete cascade,
  constraint lead_services_service_same_tenant_fk
    foreign key (tenant_id, service_id)
    references crm.services(tenant_id, id)
    on delete cascade
);

create table comms.conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  lead_id uuid,
  contact_id uuid,
  channel text not null check (channel in ('website', 'whatsapp', 'phone', 'email', 'sms', 'internal', 'other')),
  external_thread_id text,
  status text not null default 'open' check (status in ('open', 'closed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  constraint conversations_lead_same_tenant_fk
    foreign key (tenant_id, lead_id)
    references crm.leads(tenant_id, id),
  constraint conversations_contact_same_tenant_fk
    foreign key (tenant_id, contact_id)
    references crm.contacts(tenant_id, id)
);

create table comms.messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  conversation_id uuid not null,
  direction text not null check (direction in ('inbound', 'outbound', 'internal')),
  sender_type text not null default 'human' check (sender_type in ('contact', 'user', 'agent', 'system', 'human')),
  sender_user_id uuid,
  body text not null,
  external_message_id text,
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (tenant_id, id),
  constraint messages_conversation_same_tenant_fk
    foreign key (tenant_id, conversation_id)
    references comms.conversations(tenant_id, id)
    on delete cascade
);

create table agent_audit.agent_identities (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  display_name text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, id),
  unique (tenant_id, slug)
);

create table agent_audit.audit_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references app_core.tenants(id) on delete cascade,
  actor_user_id uuid,
  actor_agent_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  request_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint audit_actor_agent_same_tenant_fk
    foreign key (tenant_id, actor_agent_id)
    references agent_audit.agent_identities(tenant_id, id)
);

create index tenant_memberships_user_idx on app_core.tenant_memberships(user_id, status);
create index companies_tenant_name_idx on crm.companies(tenant_id, name);
create index contacts_tenant_idx on crm.contacts(tenant_id);
create unique index contacts_tenant_email_unique_idx on crm.contacts(tenant_id, lower(email)) where email is not null;
create index leads_tenant_status_idx on crm.leads(tenant_id, status);
create index leads_tenant_event_date_idx on crm.leads(tenant_id, event_date) where event_date is not null;
create index leads_tenant_next_action_idx on crm.leads(tenant_id, next_action_at) where next_action_at is not null;
create index event_briefs_tenant_idx on crm.event_briefs(tenant_id);
create index services_tenant_active_idx on crm.services(tenant_id, active);
create index conversations_tenant_status_idx on comms.conversations(tenant_id, status);
create index messages_tenant_conversation_sent_idx on comms.messages(tenant_id, conversation_id, sent_at);
create index audit_events_tenant_created_idx on agent_audit.audit_events(tenant_id, created_at desc);
create index audit_events_request_idx on agent_audit.audit_events(request_id) where request_id is not null;

create trigger tenants_set_updated_at before update on app_core.tenants
for each row execute function app_core.touch_updated_at();
create trigger tenant_memberships_set_updated_at before update on app_core.tenant_memberships
for each row execute function app_core.touch_updated_at();
create trigger companies_set_updated_at before update on crm.companies
for each row execute function app_core.touch_updated_at();
create trigger contacts_set_updated_at before update on crm.contacts
for each row execute function app_core.touch_updated_at();
create trigger lead_sources_set_updated_at before update on crm.lead_sources
for each row execute function app_core.touch_updated_at();
create trigger leads_set_updated_at before update on crm.leads
for each row execute function app_core.touch_updated_at();
create trigger event_briefs_set_updated_at before update on crm.event_briefs
for each row execute function app_core.touch_updated_at();
create trigger services_set_updated_at before update on crm.services
for each row execute function app_core.touch_updated_at();
create trigger conversations_set_updated_at before update on comms.conversations
for each row execute function app_core.touch_updated_at();
create trigger agent_identities_set_updated_at before update on agent_audit.agent_identities
for each row execute function app_core.touch_updated_at();

comment on schema app_core is 'Sovereign AV core tenancy data. Do not expose before the dedicated auth/RLS phase.';
comment on schema crm is 'Sovereign AV CRM data. Do not expose before the dedicated auth/RLS phase.';
comment on schema comms is 'Sovereign AV communication records. Do not expose before the dedicated auth/RLS phase.';
comment on schema agent_audit is 'Sovereign AV agent identity and audit records. Do not expose before the dedicated auth/RLS phase.';

commit;
