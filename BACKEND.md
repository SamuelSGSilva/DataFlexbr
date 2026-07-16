# Backend do site DataFlex — guia da equipe

Linguagem: **TypeScript** (roda em Node.js, dentro do próprio Next.js).
Não existe um servidor separado: o backend vive nas pastas `lib/`, `app/api/` e no `proxy.ts`.

## Mapa do backend

| Arquivo | O que faz |
|---|---|
| `proxy.ts` | Bloqueia `/treinamentos` e `/compatibilidade` para quem não tem o passe de cadastro |
| `lib/access-cookie.ts` | Gera e valida o passe de acesso (cookie assinado, validade de 1 ano) |
| `lib/gate-actions.ts` | Cadastro, "já tenho cadastro" (entra pelo email) e sair |
| `lib/supabase/server.ts` | Conexão com o Supabase no servidor |
| `lib/supabase/client.ts` | Conexão com o Supabase no navegador (quando necessário) |
| `lib/trainings.ts` | Lista módulos e aulas: lê do Supabase; se não estiver configurado, usa `data/trainings.json` |
| `lib/vehicles.ts` | Carrega os 4.508 veículos de `data/vehicles.json` |
| `lib/products.ts` | Produtos, preços e o gerador do link de pedido pro WhatsApp |
| `app/api/leads/route.ts` | API que grava interessados (nome/telefone/email) na tabela `leads` |
| `supabase/schema.sql` | Cria as tabelas e regras de segurança no Supabase |
| `supabase/auth-gate.sql` | Funções de cadastro/acesso (rodar depois do schema) |
| `supabase/seed.sql` | Insere os 5 módulos e 16 aulas extraídos do site antigo |

## Como funciona o acesso (sem senha e sem código)

Igual ao site antigo: o visitante preenche **nome, WhatsApp e email** e o
acesso é liberado na hora — o site grava um passe assinado no navegador
(validade de 1 ano). Quem troca de aparelho usa "Já tenho cadastro" e digita o
email. Todo cadastro vira uma linha na tabela `leads` (a lista de contatos
comerciais). Não há senha para esquecer nem código para enviar.

Quando a empresa tiver conta na API oficial do WhatsApp, dá pra plugar um
código de verificação por cima desse mesmo fluxo.

## Como funciona sem o Supabase

O site **funciona por completo antes de configurar qualquer coisa**:
os treinamentos abrem em "modo de desenvolvimento" (sem exigir cadastro, com
aviso amarelo) e o formulário responde que o cadastro está indisponível.
Isso permite desenvolver o visual sem depender de conta externa.

## Configurando o Supabase (uma vez só, ~15 minutos)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e um projeto
   (região `South America (São Paulo)`).
2. No painel, abra **SQL Editor** e rode, nesta ordem: `supabase/schema.sql`,
   `supabase/auth-gate.sql` e `supabase/seed.sql`.
3. Em **Settings → API Keys**, copie a Publishable key; em **Settings → Data
   API**, copie a Project URL.
4. Na pasta do projeto, copie `.env.example` para `.env.local`, cole os dois
   valores e gere o `ACCESS_TOKEN_SECRET` (instrução dentro do arquivo).
5. Reinicie o `npm run dev`. Pronto: `/treinamentos` e `/compatibilidade`
   agora exigem cadastro.

### Vendo quem se cadastrou

Painel do Supabase → **Table Editor → leads**: nome, WhatsApp, email e data de
cada cadastro — sua lista de contatos comerciais.

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
