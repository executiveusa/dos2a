# Tasks: add-tenant-data-foundation

- [x] Split tenant data foundation from the later auth/RLS security boundary.
- [x] Add additive non-exposed schema migration.
- [x] Add same-tenant composite foreign-key constraints.
- [x] Add tenant/query indexes and updated-at triggers.
- [x] Add pgTAP-compatible structural tests.
- [ ] Add data-foundation documentation and Phase 03 ICM context.
- [ ] Add rollback receipt and machine-readable phase report.
- [ ] Confirm target Supabase organization before creating any project.
- [ ] Create isolated test Supabase project or other approved test database.
- [ ] Apply migration in test environment only.
- [ ] Run database tests and security/performance advisors.
- [ ] Repair migration/test findings.
- [ ] Open phase PR after database verification evidence exists.
- [ ] Inspect CI, reviews, conflicts, and deployment feedback.
- [ ] Squash merge when repository gates pass.
- [ ] Verify public production remains unchanged.

## Stop condition

Do not create a Supabase project, apply a live migration, or establish auth/RLS grants until the required organization/resource confirmation and high-risk gates are satisfied.
