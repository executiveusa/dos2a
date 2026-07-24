set lock_timeout = '5s';
set statement_timeout = '60s';

alter table proposals.proposal_versions
  add constraint proposal_versions_parent_identity_uniq unique (tenant_id, proposal_id, id);

alter table proposals.proposal_approvals
  drop constraint approval_version_fk;
alter table proposals.proposal_approvals
  add constraint approval_version_matches_proposal_fk
  foreign key (tenant_id, proposal_id, proposal_version_id)
  references proposals.proposal_versions(tenant_id, proposal_id, id)
  on delete restrict;

alter table proposals.proposal_approvals
  add constraint approval_actor_same_tenant_fk
  foreign key (tenant_id, approved_by_user_id)
  references app_core.tenant_memberships(tenant_id, user_id)
  on delete restrict;

alter table projects.projects
  drop constraint project_proposal_version_fk;
alter table projects.projects
  add constraint project_version_matches_proposal_fk
  foreign key (tenant_id, source_proposal_id, source_proposal_version_id)
  references proposals.proposal_versions(tenant_id, proposal_id, id)
  on delete restrict;

create or replace function bookings.reject_resource_overlap() returns trigger language plpgsql as $$
declare resource text;
begin
  if new.status not in ('tentative','confirmed') or coalesce(array_length(new.resource_keys,1),0)=0 then return new; end if;
  new.resource_keys:=array(select distinct trim(value) from unnest(new.resource_keys) value where trim(value)<>'' order by 1);
  foreach resource in array new.resource_keys loop perform pg_advisory_xact_lock(hashtextextended(new.tenant_id::text||':'||resource,0)); end loop;
  if exists(
    select 1
    from bookings.calendar_slots existing
    where existing.tenant_id=new.tenant_id
      and existing.id<>new.id
      and existing.status in ('tentative','confirmed')
      and (existing.status<>'tentative' or existing.hold_expires_at>now())
      and existing.resource_keys&&new.resource_keys
      and tstzrange(existing.starts_at,existing.ends_at,'[)')&&tstzrange(new.starts_at,new.ends_at,'[)')
  ) then
    raise exception using errcode='23P01',message='booking resource conflict';
  end if;
  return new;
end;$$;

create or replace function proposals.reject_proposal_version_mutation() returns trigger language plpgsql as $$
begin
  raise exception using errcode='55000', message='proposal versions are immutable; create a new version instead';
end;$$;

drop trigger if exists proposal_versions_immutable on proposals.proposal_versions;
create trigger proposal_versions_immutable
before update or delete on proposals.proposal_versions
for each row execute function proposals.reject_proposal_version_mutation();

comment on constraint approval_version_matches_proposal_fk on proposals.proposal_approvals is 'Prevents an approval from naming a version that belongs to another proposal.';
comment on constraint project_version_matches_proposal_fk on projects.projects is 'Prevents project confirmation from pairing a proposal with another proposal version.';
comment on trigger proposal_versions_immutable on proposals.proposal_versions is 'Proposal versions are append-only so approval and accepted-price evidence cannot be rewritten in place.';
