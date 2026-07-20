-- Rode este script no Supabase: painel do projeto > SQL Editor > New query > colar e Run.
-- Cria a tabela usada pela área /datacenter (posts que os parceiros vão cadastrando).

create table if not exists datacenter_posts (
  id bigint generated always as identity primary key,
  title text not null,
  body text not null default '',
  image_url text,
  created_at timestamptz not null default now()
);

alter table datacenter_posts enable row level security;

-- O acesso a esta área já é controlado pelo login (usuário/senha) da
-- aplicação, então liberamos leitura/escrita para a chave anônima usada
-- pelo servidor Next.js.
create policy "datacenter_posts_select" on datacenter_posts
  for select using (true);

create policy "datacenter_posts_insert" on datacenter_posts
  for insert with check (true);

create policy "datacenter_posts_delete" on datacenter_posts
  for delete using (true);
