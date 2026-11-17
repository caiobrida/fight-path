# FP-17 — Preparar hospedagem futura na Vercel

**Objetivo:** deixar o produto pronto para publicação controlada quando o MVP for validado.

**Dependências:** FP-04, FP-06 e FP-16.

## Checklist

- [x] Definir ambientes de preview e produção, variáveis e separação dos bancos Neon.
- [x] Garantir build, migrações e funções de servidor compatíveis com a Vercel em testes locais.
- [x] Configurar checagens de implantação e documentar rollback.
- [x] Verificar segredos, acesso ao banco, cabeçalhos de segurança e links de origem das fontes do jogo no código.
- [x] Preparar checklist de publicação e observabilidade mínima.
- [x] Criar o projeto Vercel `fight-path` no escopo `caiobrida1-5669s-projects`, vinculá-lo à pasta local e conectar `caiobrida/fight-path` com `main` como branch de produção.
- [x] Manter deploys Git automáticos desativados durante a configuração inicial.
- [x] Inspecionar o banco Neon fornecido, aplicar as migrações 001, 002 e 003 e designá-lo para desenvolvimento/Preview; confirmar a tabela final de tentativas vazia.
- [x] Configurar no Vercel Preview a URL do Neon e as chaves Development do Clerk `fight-path`.
- [x] Designar este projeto Vercel inteiro como ambiente de desenvolvimento, inclusive o alvo chamado Production; configurar `FIGHTPATH_RELEASE_MODE=development` nesse alvo.
- [x] Ativar deploys Git automáticos para branches de PR e `main` em PR separado.
- [ ] Validar o primeiro deploy de Preview e o primeiro deploy de `main`, incluindo autenticação e `/api/health`.
- [ ] Configurar e testar o webhook Development `user.deleted` em cada alvo que tenha usuários de teste.
- [ ] Criar outro banco Neon e configurar a instância Production do mesmo aplicativo Clerk antes de qualquer publicação real.
- [ ] Publicar aviso de privacidade, canal de contato e procedimento de solicitações de titulares antes de coletar dados em produção.

The bilingual notice and export/deletion procedure are implemented. Vercel project `prj_2nqJOlMttvYTtrtyN2eULelvlwY1` is connected to the correct GitHub repository. Its Preview and Production-labeled targets are both development environments. The supplied Neon database is migrated; Preview has its URL and Clerk Development keys. The Vercel Production publishable key matches the local Clerk Development key, and that target is marked with `FIGHTPATH_RELEASE_MODE=development`. Preview may deploy without the four release-only values, but the signed deletion webhook must be configured and verified before relying on Clerk account deletion. A separate public-production database, Clerk instance, privacy review, and real-device checks remain open. `DEPLOYMENT.md` is the runbook; `QA.md` lists the remaining real-device gate.

**Aceite:** os deploys automáticos de PR e `main` podem ser revisados como desenvolvimento sem segredos no repositório; publicação real depende de ambiente e decisão separados.
