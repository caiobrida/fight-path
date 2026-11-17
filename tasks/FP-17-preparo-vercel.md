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
- [x] Manter deploys Git automáticos desativados até que o Preview esteja pronto e Production tenha configuração isolada.
- [x] Inspecionar o banco Neon fornecido, aplicar as migrações 001, 002 e 003 e designá-lo para desenvolvimento/Preview; confirmar a tabela final de tentativas vazia.
- [x] Configurar no Vercel Preview a URL do Neon e as chaves Development do Clerk `fight-path`.
- [ ] Completar as quatro variáveis restantes de Preview, configurar o webhook Development e validar um deploy de Preview.
- [ ] Criar outro banco Neon e configurar a instância Production do mesmo aplicativo Clerk antes de qualquer deploy de Production.
- [ ] Ativar deploys Git automáticos em PR separado quando os ambientes estiverem prontos.
- [ ] Publicar aviso de privacidade, canal de contato e procedimento de solicitações de titulares antes de coletar dados em produção.

The bilingual notice and export/deletion procedure are implemented. Vercel project `prj_2nqJOlMttvYTtrtyN2eULelvlwY1` is connected to the correct GitHub repository. The supplied Neon database is migrated and assigned to Preview; its URL and the Clerk Development keys are configured in Vercel Preview. Four Preview values and a live preview remain open. Seven Production variables exist from earlier setup, but Production needs a new database URL and Clerk Production keys before use. Confirm the operator identity, private contact, backup retention, and real-device checks before release. `DEPLOYMENT.md` is the runbook; `QA.md` lists the remaining real-device gate.

**Aceite:** um preview pode ser implantado e revisado sem segredos no repositório; publicação em produção depende de decisão explícita posterior.
