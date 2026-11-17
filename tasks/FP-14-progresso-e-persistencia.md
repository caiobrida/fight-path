# FP-14 — Salvar progresso e métricas de prática

**Objetivo:** acompanhar evolução por habilidade e lição usando PostgreSQL no Neon.

**Dependências:** FP-06, FP-12 e FP-13.

## Checklist

- [ ] Implementar migrações e acesso ao banco pelo servidor conforme FP-06.
- [ ] Registrar tentativas e resultados necessários para precisão, consistência e domínio, minimizando dados brutos.
- [ ] Exibir progresso por exercício, padrão universal e personagem, sem misturar os níveis de domínio.
- [ ] Tratar falha de rede e retomada de sessão conforme o modelo de identidade escolhido.
- [ ] Testar isolamento entre usuários ou sessões e integridade das métricas.

**Aceite:** progresso persiste entre visitas segundo o modelo definido, métricas são recalculáveis e um usuário não lê dados de outro.
