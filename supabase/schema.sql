-- ============================================================
-- DataFlex — estrutura do banco (rodar no SQL Editor do Supabase)
-- Rode este arquivo primeiro; depois rode o seed.sql.
-- ============================================================

-- Módulos de treinamento (ex.: "Leitura e Gravação")
create table if not exists public.modules (
  slug text primary key,
  title text not null,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

-- Aulas em vídeo (o vídeo em si fica no YouTube como "não listado")
create table if not exists public.lessons (
  slug text primary key,
  title text not null,
  module_slug text not null references public.modules (slug) on delete cascade,
  youtube_id text not null,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

-- Interessados que preencheram o formulário (mesma função do site antigo)
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null,
  phone text,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Segurança (Row Level Security)
-- ============================================================
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.leads enable row level security;

-- Treinamentos: somente clientes logados conseguem ler.
drop policy if exists "clientes leem modulos" on public.modules;
create policy "clientes leem modulos"
  on public.modules for select
  to authenticated
  using (true);

drop policy if exists "clientes leem aulas" on public.lessons;
create policy "clientes leem aulas"
  on public.lessons for select
  to authenticated
  using (true);

-- Leads: qualquer visitante pode se cadastrar, mas ninguém lê pela API pública.
drop policy if exists "visitantes criam lead" on public.leads;
create policy "visitantes criam lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);
