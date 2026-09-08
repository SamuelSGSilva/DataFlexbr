# Sincronização FormulaFlash — n8n Self-Hosted

Este workflow usa uma instância própria do n8n, executada no servidor via Docker/Portainer, para iniciar diariamente uma GitHub Action. A Action verifica a lista cumulativa oficial da FormulaFlash, cruza os registros com `data/vehicles.json` e aplica a rotina de sincronização definida em `sync-formulaflash.mjs`.

## Arquitetura

- O n8n self-hosted agenda e dispara a execução.
- O GitHub Action executa `sync-formulaflash.mjs` dentro do repositório.
- O n8n não precisa de acesso direto ao PostgreSQL do DataFlex.
- A credencial GitHub fica armazenada no n8n e nunca deve ser colocada no workflow ou no repositório.
- Nenhum script adicional precisa ser instalado dentro do contêiner do n8n.

## Proteções da sincronização

- Preserva registros exclusivos da DataFlex.
- Preserva checksum e funções extras existentes.
- Rejeita uma fonte oficial com menos de 4.000 aplicações.
- Rejeita chaves duplicadas.
- Não cria alteração quando nada mudou.

## Instalação do n8n no Portainer

Crie uma Stack chamada, por exemplo, `dataflex-n8n` e utilize:

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: dataflex_n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - TZ=America/Sao_Paulo
      - N8N_SECURE_COOKIE=false
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

Após o deploy, acesse `http://IP_DO_SERVIDOR:5678` e conclua a criação da conta administrativa.

> Para produção exposta à Internet, prefira publicar o n8n atrás de HTTPS/reverse proxy e habilitar cookies seguros, em vez de deixar a porta 5678 publicamente acessível.

## Configuração do workflow

1. Crie um token fine-grained no GitHub restrito ao repositório `SamuelSGSilva/DataFlexbr`, com permissão necessária para disparar GitHub Actions.
2. No n8n, abra **Credentials**, crie uma credencial **GitHub API** e informe o token. Nunca coloque o token no JSON do workflow ou no repositório.
3. Importe `formulaflash-sync.workflow.json`.
4. Abra o nó **Iniciar conferência no GitHub** e selecione a credencial GitHub criada.
5. Execute manualmente uma vez.
6. No GitHub, confirme a execução em **Actions > FormulaFlash Sync**.
7. Depois do teste, ative o workflow.

O workflow está configurado para executar diariamente às 07h em `America/Sao_Paulo`.

O n8n considera o disparo aceito quando a API do GitHub responde HTTP 204. A conferência detalhada e eventuais erros aparecem no histórico da GitHub Action.

## Arquivos envolvidos

- `automation/n8n/formulaflash-sync.workflow.json` — workflow importável no n8n.
- `automation/n8n/sync-formulaflash.mjs` — lógica da sincronização.
- `.github/workflows/formulaflash-sync.yml` — GitHub Action disparada pelo n8n.
- `data/vehicles.json` — catálogo de aplicações utilizado pelo DataFlex.
