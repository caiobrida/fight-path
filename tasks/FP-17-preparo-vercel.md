# FP-17 — Preparar hospedagem futura na Vercel

**Objetivo:** deixar o produto pronto para publicação controlada quando o MVP for validado.

**Dependências:** FP-04, FP-06 e FP-16.

## Checklist

- [x] Definir ambientes de preview e produção, variáveis e separação dos bancos Neon.
- [x] Garantir build, migrações e funções de servidor compatíveis com a Vercel em testes locais.
- [x] Configurar checagens de implantação e documentar rollback.
- [x] Verificar segredos, acesso ao banco, cabeçalhos de segurança e links de origem das fontes do jogo no código.
- [x] Preparar checklist de publicação e observabilidade mínima.
- [ ] Publicar aviso de privacidade, canal de contato e procedimento de solicitações de titulares antes de coletar dados em produção.

The bilingual notice and export/deletion procedure are implemented. Production operator identity, private contact, Neon URLs, Vercel project settings, matching keys for the selected Clerk application, signed account-deletion webhook, backup retention, and a live preview must be provided or verified before closure. `DEPLOYMENT.md` is the runbook; `QA.md` lists the remaining real-device gate.

**Aceite:** um preview pode ser implantado e revisado sem segredos no repositório; publicação em produção depende de decisão explícita posterior.
