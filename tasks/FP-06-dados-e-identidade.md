# FP-06 — Definir dados, identidade e acesso seguro

**Objetivo:** decidir como salvar progresso em PostgreSQL no Neon sem expor credenciais no navegador.

**Dependência:** FP-01.

## Checklist

- [ ] Definir se o MVP terá contas, sessão anônima ou outro modelo de identidade; registrar consequências para sincronização de progresso.
- [ ] Modelar perfis, preferências, tentativas, domínio e progresso de lições no nível necessário para o MVP.
- [ ] Definir acesso ao Neon por serviço de servidor compatível com Vercel, políticas de autorização e migrações.
- [ ] Definir retenção mínima de eventos de input e política de privacidade correspondente.
- [ ] Documentar ambientes, segredos e estratégia de desenvolvimento local.

**Aceite:** `ARCHITECTURE.md` contém modelo e fluxo de dados suficientes para implementar FP-14 sem decisões de segurança implícitas.
