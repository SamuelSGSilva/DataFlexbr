# Backend do site DataFlex — guia da equipe

Linguagem: **TypeScript** (roda em Node.js, dentro do próprio Next.js).
Não existe um servidor separado: o backend vive nas pastas `lib/`, `app/api/` e no `proxy.ts`.

## Mapa do backend

| Arquivo | O que faz |
|---|---|
| `proxy.ts` | Roda antes de cada requisição: renova a sessão do usuário e bloqueia `/treinamentos` para quem não está logado |
| `lib/supabase/server.ts` | Conexão com o Supabase no servidor + helper `getUser()` |
| `lib/supabase/client.ts` | Conexão com o Supabase no navegador (quando necessário) |
| `lib/auth-actions.ts` | Ações de login (`signIn`) e logout (`signOut`) |
| `lib/trainings.ts` | Lista módulos e aulas: lê do Supabase; se não estiver configurado, usa `data/trainings.json` |
| `lib/vehicles.ts` | Carrega os 4.508 veículos de `data/vehicles.json` |
| `lib/products.ts` | Produtos, preços e o gerador do link de pedido pro WhatsApp |
| `app/api/leads/route.ts` | API que grava interessados (nome/telefone/email) na tabela `leads` |
| `supabase/schema.sql` | Cria as tabelas e regras de segurança no Supabase |
| `supabase/seed.sql` | Insere os 5 módulos e 16 aulas extraídos do site antigo |

## Como funciona sem o Supabase

O site **funciona por completo antes de configurar qualquer coisa**:
os treinamentos abrem em "modo de desenvolvimento" (sem exigir login, com aviso
amarelo) e o formulário de leads responde que o cadastro está indisponível.
Isso permite desenvolver o visual sem depender de conta externa.

## Configurando o Supabase (uma vez só, ~15 minutos)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e um projeto
   (região `South America (São Paulo)`).
2. No painel, abra **SQL Editor** e rode o conteúdo de `supabase/schema.sql`.
3. Depois rode o conteúdo de `supabase/seed.sql` (já insere os treinamentos).
4. Em **Settings → API Keys**, copie a `URL` e a chave `anon public`.
5. Na pasta do projeto, copie `.env.example` para `.env.local` e cole os dois valores.
6. Reinicie o `npm run dev`. Pronto: `/treinamentos` agora exige login.

### Criando o acesso de um cliente

Painel do Supabase → **Authentication → Users → Add user** → informe email e
senha → marque "Auto confirm user". Envie email e senha pro cliente pelo WhatsApp.

### Adicionando uma aula nova

1. Suba o vídeo no YouTube como **não listado** e copie o ID
   (o trecho após `youtu.be/`, ex.: `oXqJQFEBLyo`).
2. Painel do Supabase → **Table Editor → lessons → Insert row**:
   `slug` (apelido único, ex.: `bosch-fiat-me744`), `title`, `module_slug`
   (um dos módulos existentes), `youtube_id`, `sort` (ordem de exibição).
3. A aula aparece no site em até 1 minuto, sem deploy.

## Comandos úteis

```bash
npm run dev     # roda o site em http://localhost:3000
npm run build   # build de produção (rodar antes de subir pra Vercel)
```
