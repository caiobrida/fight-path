# FP-17 — Preparar hospedagem futura na Vercel

**Objetivo:** deixar o produto pronto para publicação controlada quando o MVP for validado.

**Dependências:** FP-04, FP-06 e FP-16.

## Checklist

- [ ] Definir ambientes de preview e produção, variáveis e separação dos bancos Neon.
- [ ] Garantir build, migrações e funções de servidor compatíveis com a Vercel.
- [ ] Configurar checagens de implantação e documentar rollback.
- [ ] Verificar segredos, acesso ao banco, cabeçalhos de segurança e links de origem das fontes do jogo.
- [ ] Preparar checklist de publicação e observabilidade mínima.

**Aceite:** um preview pode ser implantado e revisado sem segredos no repositório; publicação em produção depende de decisão explícita posterior.
