# Sincronização FormulaFlash — n8n Cloud

Este workflow do n8n Cloud inicia diariamente uma GitHub Action. A Action verifica a lista cumulativa oficial da FormulaFlash, cruza os registros com `data/vehicles.json` e abre ou atualiza um pull request **rascunho** quando encontra mudanças.

## Arquitetura

- O n8n Cloud agenda e dispara a execução.
- A GitHub Action executa `sync-formulaflash.mjs` dentro do repositório.
- O token interno da Action cria a branch, o commit e o PR rascunho.
- Nenhum script precisa ser instalado no servidor do n8n.

## Proteções

- Nunca escreve diretamente na `main`.
- Preserva registros exclusivos da DataFlex.
- Preserva checksum e funções extras existentes.
- Rejeita uma fonte oficial com menos de 4.000 aplicações.
- Rejeita chaves duplicadas.
- Não cria commit ou PR quando nada mudou.

## Configuração no n8n Cloud

1. Antes de ativar, mescle o PR de atualização integral da tabela e este PR da automação.
2. Crie um token fine-grained no GitHub restrito ao repositório `SamuelSGSilva/DataFlexbr`, com `Actions: Read and write`.
3. No n8n, abra **Credentials**, crie uma credencial **GitHub API** e cole o token. Nunca coloque o token dentro do workflow ou do repositório.
4. Importe `formulaflash-sync.workflow.json`.
5. Abra o nó **Iniciar conferência no GitHub** e selecione a credencial GitHub criada.
6. Execute manualmente uma vez.
7. No GitHub, confirme a execução em **Actions > FormulaFlash Sync**.
8. Ative o workflow. Ele será executado diariamente às 07h em `America/Sao_Paulo`.

O n8n considera sucesso quando o GitHub aceita o disparo com HTTP 204. A conferência detalhada aparece no histórico da GitHub Action.
