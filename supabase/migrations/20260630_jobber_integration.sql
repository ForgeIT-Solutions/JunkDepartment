-- Junk Dept. — Jobber integration tables
-- Deploy to the shared SFP Supabase project (ekuzbozvnouexksthlfa).
-- These tables are written to ONLY by the `jobber-lead` Edge Function using the
-- service-role key, so RLS denies all client access by default (no policies).

-- 1. OAuth token store (single row, provider = 'jobber').
--    Jobber rotates refresh tokens, so the function updates this on every call.
create table if not exists public.jobber_oauth (
  id            uuid primary key default gen_random_uuid(),
  provider      text not null unique default 'jobber',
  refresh_token text not null,
  access_token  text,
  expires_at    timestamptz,
  updated_at    timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

alter table public.jobber_oauth enable row level security;
-- No policies: only the service role (Edge Function) may read/write.

-- 2. Lead store — source of truth for every website submission.
create table if not exists public.jobber_leads (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null,
  phone             text not null,
  address           text,
  service_type      text,
  details           text,
  preferred_date    date,
  preferred_slot    text,
  status            text not null default 'received',
    -- received | sent_to_jobber | jobber_failed
  jobber_client_id  text,
  jobber_request_id text,
  error             text,
  created_at        timestamptz not null default now()
);

alter table public.jobber_leads enable row level security;
-- No policies: only the service role (Edge Function) may read/write.

create index if not exists jobber_leads_created_at_idx on public.jobber_leads (created_at desc);
create index if not exists jobber_leads_status_idx on public.jobber_leads (status);
