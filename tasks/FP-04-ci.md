# FP-04 — Adicionar CI para pull requests

**Objetivo:** detectar regressões básicas antes de integrar mudanças à `main`.

**Dependência:** FP-03.

## Checklist

- [x] Criar workflow para PRs e `main` que instale dependências de modo reproduzível.
- [x] Executar lint, checagem de tipos, testes relevantes e build.
- [x] Documentar as verificações exigidas para aceitar um PR.
- [x] Evitar acesso a segredos do Neon em PRs não confiáveis.
- [x] Verificar o workflow em um PR real.

**Aceite:** CI mostra resultado claro em um PR e falha quando uma checagem obrigatória falha.
