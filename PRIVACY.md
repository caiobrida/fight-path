# Privacy and security plan

FightPath is being built with data minimization and user control in mind. This document is an engineering plan, not a claim of legal certification. Review the production privacy notice, legal basis, retention periods, and user request process before collecting personal data publicly.

## Planned data

| Data | Purpose | Storage | Default handling |
| --- | --- | --- | --- |
| Anonymous session identifier | Keep progress separated between learners | HttpOnly cookie and server database | Random, opaque token in cookie; only its hash in the database; no email required |
| Locale and control mapping | Preserve preferences | Browser storage | Local to the device; no raw device identity sent to the server |
| Practice outcome | Show progress and skill mastery | PostgreSQL | Store exercise ID, result, and time; avoid raw input histories |
| Pending practice outcome | Resume a failed sync | Browser local storage | Store only exercise ID, result, and time until server confirmation; clear on progress deletion |
| Raw input history | Immediate feedback during a practice attempt | Browser memory | Discard after the attempt or page session; do not transmit by default |

## Engineering requirements

- Validate every server request and authorize access to progress by session; never trust a client-supplied owner ID.
- Keep database credentials and signing keys server-side. Use separate local, preview, and production settings.
- Use parameterized queries, least-privilege database credentials, secure cookies, CSRF protection for state-changing requests, rate limits, and security headers.
- Offer clear language choices, a privacy notice, progress export, and deletion before public release.
- Anonymous progress uses an HttpOnly cookie and is inaccessible if that cookie is lost. Export and deletion act on the current session only. Public release still needs a reviewed notice, contact channel, retention job, and backup deletion procedure.
- Do not install analytics or marketing cookies by default. Assess any future third-party service before collecting extra data.
- Define retention and backup deletion procedures before production deployment. Record security incidents and a response process.

## Primary references

- [Brazil's LGPD, updated text at Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html), accessed 2026-11-17.
- [ANPD guidance on information security for small processing agents](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/processo-guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte.pdf), accessed 2026-11-17.
- [ANPD Resolution 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022), accessed 2026-11-17.
- [OWASP ASVS](https://owasp.org/projects/asvs), accessed 2026-11-17.
