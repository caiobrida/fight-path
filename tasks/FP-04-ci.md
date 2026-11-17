# FP-04 — Adicionar CI para pull requests

**Objetivo:** detectar regressões básicas antes de integrar mudanças à `main`.

**Dependência:** FP-03.

## Checklist

- [ ] Criar workflow para PRs e `main` que instale dependências de modo reproduzível.
- [ ] Executar lint, checagem de tipos, testes relevantes e build.
- [ ] Documentar as verificações exigidas para aceitar um PR.
- [ ] Evitar acesso a segredos do Neon em PRs não confiáveis.
- [ ] Verificar o workflow em um PR real.

**Aceite:** CI mostra resultado claro em um PR e falha quando uma checagem obrigatória falha.
