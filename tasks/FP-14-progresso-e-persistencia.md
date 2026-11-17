# FP-14 — Salvar progresso e métricas de prática

**Objetivo:** acompanhar evolução por habilidade e lição usando PostgreSQL no Neon.

**Dependências:** FP-06, FP-12 e FP-13.

## Checklist

- [x] Implementar migrações e acesso ao banco pelo servidor conforme FP-06.
- [x] Registrar tentativas e resultados necessários para precisão, consistência e domínio, minimizando dados brutos.
- [x] Exibir progresso por exercício, padrão universal e personagem, sem misturar os níveis de domínio.
- [x] Tratar falha de rede e retomada de sessão conforme o modelo de identidade escolhido.
- [x] Testar isolamento entre usuários ou sessões e integridade das métricas.

Progress is grouped by exercise ID and the selected universal or Ken path. A separate mastery display is part of FP-15. Local PostgreSQL integration and HTTP route checks validated persistence, export, deletion, retry idempotency, and session isolation. Neon production validation remains dependent on production credentials.

The offline queue is capped at 500 minimal outcomes. Storage failures no longer interrupt practice; a visible retry action resumes synchronization when the service returns. Attempts made after the queue is full remain available for immediate feedback but are not counted as saved progress.

**Aceite:** progresso persiste entre visitas segundo o modelo definido, métricas são recalculáveis e um usuário não lê dados de outro.
