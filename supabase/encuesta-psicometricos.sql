-- Encuesta Psicométricos v0.1
-- Ejecutar una sola vez en Supabase SQL Editor.
-- Las respuestas llegan desde la función server-side de Vercel con SERVICE_ROLE.

create table if not exists public.survey_psicometricos_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profession text not null,
  work_areas text[] not null default '{}',
  frequency text not null,
  frequent_instruments text,
  current_workflow text[] not null default '{}',
  pain_points text[] not null default '{}',
  top_features text[] not null default '{}',
  requested_instruments text,
  beta_interest text not null,
  beta_email text,
  privacy_ack boolean not null default true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  campaign_segment text,
  landing_url text,
  referrer text
);

alter table public.survey_psicometricos_responses enable row level security;

-- No crear policies para anon/authenticated.
-- SERVICE_ROLE puede insertar desde la función server-side.

create index if not exists survey_psicometricos_created_at_idx
  on public.survey_psicometricos_responses (created_at desc);
create index if not exists survey_psicometricos_segment_idx
  on public.survey_psicometricos_responses (campaign_segment);
create index if not exists survey_psicometricos_beta_interest_idx
  on public.survey_psicometricos_responses (beta_interest);

comment on table public.survey_psicometricos_responses is
  'Investigación de producto de Psicométricos. No almacenar datos clínicos de pacientes/evaluados.';
