-- Schema mínimo para o site funcionar num Supabase self-hosted.
-- Roda automaticamente quando o container do banco sobe pela primeira vez
-- (docker-entrypoint-initdb.d). Recrie os dados reais (leads, treinamentos)
-- por conta própria depois -- isto só cria a estrutura, vazia.

-- Roles exigidas pelo PostgREST (a "API" que o site usa pra falar com o banco)
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin noinherit;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin noinherit;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then
    create role service_role nologin noinherit bypassrls;
  end if;
end $$;

grant usage on schema public to anon, authenticated, service_role;

-- Leads (cadastro de "Novo cadastro" / "Já tenho cadastro")
create table if not exists leads (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create or replace function register_lead(p_name text, p_phone text, p_email text)
returns bigint
language plpgsql
security definer
as $$
declare v_id bigint;
begin
  insert into leads (name, phone, email)
  values (p_name, p_phone, lower(p_email))
  on conflict (email) do update set name = excluded.name, phone = excluded.phone
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function login_lead(p_email text)
returns bigint
language sql
security definer
as $$
  select id from leads where email = lower(p_email) limit 1;
$$;

grant execute on function register_lead(text, text, text) to anon;
grant execute on function login_lead(text) to anon;

-- Treinamentos (módulos e aulas). Se ficarem vazias, o site usa o
-- fallback estático em data/trainings.json.
create table if not exists modules (
  slug text primary key,
  title text not null,
  sort int not null default 0
);

create table if not exists lessons (
  slug text primary key,
  title text not null,
  module_slug text not null references modules(slug) on delete cascade,
  youtube_id text not null,
  sort int not null default 0
);

grant select on modules, lessons to anon;

-- DataCenter (posts que os parceiros vão publicando)
create table if not exists datacenter_posts (
  id bigint generated always as identity primary key,
  title text not null,
  body text not null default '',
  image_url text,
  created_at timestamptz not null default now()
);

grant select, insert, delete on datacenter_posts to anon;
grant usage on sequence datacenter_posts_id_seq to anon;
