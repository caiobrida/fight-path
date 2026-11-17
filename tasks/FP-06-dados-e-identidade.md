# FP-06 — Definir dados, identidade e acesso seguro

**Objetivo:** decidir como salvar progresso em PostgreSQL no Neon sem expor credenciais no navegador.

**Dependência:** FP-01.

## Checklist

- [x] Definir se o MVP terá contas, sessão anônima ou outro modelo de identidade; registrar consequências para sincronização de progresso.
- [x] Modelar perfis, preferências, tentativas, domínio e progresso de lições no nível necessário para o MVP.
- [x] Definir acesso ao Neon por serviço de servidor compatível com Vercel, políticas de autorização e migrações.
- [x] Definir retenção mínima de eventos de input e política de privacidade correspondente.
- [x] Documentar ambientes, segredos e estratégia de desenvolvimento local.
- [x] Registrar finalidade, base legal a confirmar, minimização, retenção, exportação e exclusão de dados pessoais conforme `PRIVACY.md` e a LGPD.

**Aceite:** `ARCHITECTURE.md` contém modelo e fluxo de dados suficientes para implementar FP-14 sem decisões de segurança implícitas.
