
create table if not exists public.spots (
  id text primary key,
  name text not null,
  island text not null,
  latitude double precision not null,
  longitude double precision not null,
  description text default '',
  activities jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.weather_cache (
  spot_id text primary key references public.spots(id) on delete cascade,
  provider text not null,
  observed_at timestamptz,
  payload jsonb not null,
  fetched_at timestamptz not null default now()
);

create table if not exists public.marine_cache (
  spot_id text primary key references public.spots(id) on delete cascade,
  provider text not null,
  observed_at timestamptz,
  payload jsonb not null,
  fetched_at timestamptz not null default now()
);

create table if not exists public.source_status (
  source text primary key,
  last_success_at timestamptz,
  last_error_at timestamptz,
  status text not null default 'unknown',
  message text
);

alter table public.spots enable row level security;
alter table public.weather_cache enable row level security;
alter table public.marine_cache enable row level security;

create policy "public can read active spots" on public.spots
for select using (active = true);

create policy "public can read weather cache" on public.weather_cache
for select using (true);

create policy "public can read marine cache" on public.marine_cache
for select using (true);
