-- Cover the intake_requests -> leads foreign key for delete/join performance.
create index if not exists dosa_intake_requests_lead_idx on dosa.intake_requests(lead_id);
