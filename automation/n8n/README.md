# Sincronização FormulaFlash com n8n

Este workflow verifica diariamente a lista cumulativa oficial da FormulaFlash, cruza os registros com `data/vehicles.json` e abre ou atualiza um pull request **rascunho** quando encontra mudanças.

## Proteções

- Nunca escreve diretamente na `main`.
- Preserva registros exclusivos da DataFlex.
- Preserva checksum e funções extras existentes.
- Rejeita uma fonte oficial com menos de 4.000 aplicações.
- Rejeita chaves duplicadas.
- Não cria commit ou PR quando nada mudou.

## Instalação no n8n próprio

Antes de ativar, mescle o PR de atualização integral da tabela. Isso evita que a primeira execução proponha novamente as mesmas 257 aplicações.

1. Copie esta pasta para `/data/formulaflash-sync` dentro do contêiner ou servidor do n8n.
2. Crie um token fine-grained do GitHub com acesso somente ao repositório `SamuelSGSilva/DataFlexbr` e permissões `Contents: Read and write` e `Pull requests: Read and write`.
3. Configure as variáveis de `.env.example` no ambiente do n8n. Nunca coloque o token dentro do workflow ou do GitHub.
4. Importe `formulaflash-sync.workflow.json` no n8n.
5. Execute manualmente uma vez e confirme que o resultado termina com `no-change`, `updated` ou `dry-run-change-detected`.
6. Ative o workflow. Ele será executado diariamente às 07h no fuso `America/Sao_Paulo`.

## Teste sem escrever no GitHub

Defina temporariamente `DRY_RUN=true` e execute o workflow manualmente. O sincronizador fará toda a conferência, mas não criará branch, commit ou PR.

## Docker Compose

Monte a pasta no serviço do n8n e passe as variáveis de ambiente:

```yaml
services:
  n8n:
    volumes:
      - ./automation/n8n:/data/formulaflash-sync:ro
    environment:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - GITHUB_REPOSITORY=SamuelSGSilva/DataFlexbr
      - GITHUB_BASE_BRANCH=main
      - GITHUB_SYNC_BRANCH=automation/formulaflash-sync
      - VEHICLES_PATH=data/vehicles.json
```

Em algumas instalações, o nó `Execute Command` fica bloqueado. Nesse caso, libere `n8n-nodes-base.executeCommand` na configuração da instância antes de importar o workflow.
