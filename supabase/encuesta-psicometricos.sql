-- Psicométricos — research funnel v0.2
-- Ejecutar una sola vez en Supabase SQL Editor ANTES de publicar la campaña.
-- Es idempotente: usa IF NOT EXISTS cuando es posible.

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
  beta_interest text,
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

-- Compatibilidad con la primera versión de la tabla.
alter table public.survey_psicometricos_responses alter column beta_interest drop not null;
alter table public.survey_psicometricos_responses add column if not exists practice_mode text;
alter table public.survey_psicometricos_responses add column if not exists forensic_frequency text;
alter table public.survey_psicometricos_responses add column if not exists processing_time text;
alter table public.survey_psicometricos_responses add column if not exists traceability_importance smallint;
alter table public.survey_psicometricos_responses add column if not exists value_proposition text;
alter table public.survey_psicometricos_responses add column if not exists paid_tool_status text;
alter table public.survey_psicometricos_responses add column if not exists price_range text;

alter table public.survey_psicometricos_responses enable row level security;

create index if not exists survey_psicometricos_created_at_idx on public.survey_psicometricos_responses (created_at desc);
create index if not exists survey_psicometricos_segment_idx on public.survey_psicometricos_responses (campaign_segment);
create index if not exists survey_psicometricos_value_idx on public.survey_psicometricos_responses (value_proposition);
create index if not exists survey_psicometricos_forensic_idx on public.survey_psicometricos_responses (forensic_frequency);

comment on table public.survey_psicometricos_responses is
  'Investigación anónima de producto de Psicométricos. No almacenar datos clínicos de pacientes/evaluados.';

create table if not exists public.beta_psicometricos_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  profession text not null,
  work_areas text[] not null default '{}',
  frequency text not null,
  frequent_instruments text,
  contact_ack boolean not null default true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  campaign_segment text,
  landing_url text,
  referrer text
);

alter table public.beta_psicometricos_leads enable row level security;
create index if not exists beta_psicometricos_email_idx on public.beta_psicometricos_leads (email);
create index if not exists beta_psicometricos_created_at_idx on public.beta_psicometricos_leads (created_at desc);
create index if not exists beta_psicometricos_segment_idx on public.beta_psicometricos_leads (campaign_segment);

comment on table public.beta_psicometricos_leads is
  'Solicitudes identificadas y voluntarias al Early Access. Se mantienen separadas de la encuesta anónima.';

-- No crear policies públicas para estas dos tablas.
-- Los inserts se realizan desde funciones server-side de Vercel con Secret/service_role.
