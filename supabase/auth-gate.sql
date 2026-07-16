-- ============================================================
-- Acesso por cadastro (sem senha e sem código) — rodar no SQL Editor
-- depois do schema.sql. Substitui o login por email/senha.
-- ============================================================

-- Cadastra (ou atualiza) um interessado e devolve o id do passe de acesso.
create or replace function public.register_lead(p_name text, p_phone text, p_email text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id bigint;
begin
  if length(trim(p_name)) < 2 or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'dados inválidos';
  end if;

  insert into public.leads (name, phone, email)
  values (trim(p_name), trim(p_phone), lower(trim(p_email)))
  on conflict (email) do update
    set name = excluded.name,
        phone = coalesce(nullif(excluded.phone, ''), leads.phone)
  returning id into v_id;

  return v_id;
end;
$$;

-- "Já tenho cadastro": devolve o id se o email existir (null se não).
create or replace function public.login_lead(p_email text)
returns bigint
language sql
security definer
set search_path = public
as $$
  select id from public.leads where email = lower(trim(p_email));
$$;

grant execute on function public.register_lead(text, text, text) to anon, authenticated;
grant execute on function public.login_lead(text) to anon, authenticated;

-- O bloqueio dos treinamentos agora é o cadastro (feito pelo site),
-- então o conteúdo pode ser lido pela chave pública.
drop policy if exists "clientes leem modulos" on public.modules;
drop policy if exists "site le modulos" on public.modules;
create policy "site le modulos"
  on public.modules for select
  to anon, authenticated
  using (true);

drop policy if exists "clientes leem aulas" on public.lessons;
drop policy if exists "site le aulas" on public.lessons;
create policy "site le aulas"
  on public.lessons for select
  to anon, authenticated
  using (true);
