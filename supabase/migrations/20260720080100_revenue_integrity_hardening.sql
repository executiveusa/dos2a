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

comment on constraint approval_version_matches_proposal_fk on proposals.proposal_approvals is 'Prevents an approval from naming a version that belongs to another proposal.';
comment on constraint project_version_matches_proposal_fk on projects.projects is 'Prevents project confirmation from pairing a proposal with another proposal version.';
