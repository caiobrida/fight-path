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
- [x] Manter deploys Git automáticos desativados até que as variáveis e migrações de Preview e Produção estejam prontas.
- [ ] Configurar as variáveis externas, executar migrações e então ativar os deploys Git automáticos em PR separado.
- [ ] Publicar aviso de privacidade, canal de contato e procedimento de solicitações de titulares antes de coletar dados em produção.

The bilingual notice and export/deletion procedure are implemented. Vercel project `prj_2nqJOlMttvYTtrtyN2eULelvlwY1` is connected to the correct GitHub repository, but no environment variables or deployments exist yet. Production operator identity, private contact, Neon URLs, matching keys for the selected Clerk application, signed account-deletion webhook, backup retention, and a live preview must be provided or verified before closure. `DEPLOYMENT.md` is the runbook; `QA.md` lists the remaining real-device gate.

**Aceite:** um preview pode ser implantado e revisado sem segredos no repositório; publicação em produção depende de decisão explícita posterior.
