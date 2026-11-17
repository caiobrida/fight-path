# Privacy and security plan

FightPath is being built with data minimization and user control in mind. This document is an engineering plan, not a claim of legal certification. Review the production privacy notice, legal basis, retention periods, and user request process before collecting personal data publicly.

## Planned data

| Data                       | Purpose                                      | Storage                              | Default handling                                                                                                                                                                                                                                     |
| -------------------------- | -------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clerk account and session  | Sign users in and protect access to progress | Clerk                                | Clerk handles account details and session cookies; FightPath does not duplicate email or passwords in PostgreSQL                                                                                                                                     |
| Clerk user ID              | Associate practice attempts with an account  | PostgreSQL                           | Store only the provider ID with minimal attempt outcomes                                                                                                                                                                                             |
| Locale and control mapping | Preserve preferences                         | Browser storage                      | Local to the device; no raw device identity sent to the server                                                                                                                                                                                       |
| Practice outcome           | Show progress and skill mastery              | PostgreSQL                           | Store exercise ID, result, and time; avoid raw input histories                                                                                                                                                                                       |
| Pending practice outcome   | Resume a failed sync                         | Browser local storage when available | Scope to the Clerk user ID; store only attempt ID, exercise ID, result, and time until server confirmation; cap at 500 outcomes and clear on progress deletion. If browser storage is blocked, pending outcomes remain only in tab memory until sync |
| Raw input history          | Immediate feedback during a practice attempt | Browser memory                       | Discard after the attempt or page session; do not transmit by default                                                                                                                                                                                |

## Engineering requirements

- Validate every server request and authorize access to progress with the Clerk user ID derived on the server; never trust a client-supplied owner ID.
- Keep database credentials and signing keys server-side. The current Vercel Preview and Production-labeled targets share development services by owner decision. Use separate database and Clerk Production settings before any public release.
- Use parameterized queries, least-privilege database credentials, secure cookies, CSRF protection for state-changing requests, rate limits, and security headers.
- Offer clear language choices, a privacy notice, progress export, and deletion before public release.
- Export and deletion act on the signed-in account only. A signed Clerk `user.deleted` webhook removes the deleted account's attempts. Configure and test its endpoint and signing secret before public release.
- Do not install analytics or marketing cookies by default. Assess any future third-party service before collecting extra data.
- The daily authenticated retention job deletes attempts after 180 days. Verify that `CRON_SECRET` is set in production and monitor the job. Define production backup deletion periods before public release.
- Use only Clerk application `fight-path` (`app_3MEZV1U7aZzsep5eEdSErRrIH8q`). Review Clerk as a data processor, its account data handling, regions, and deletion behavior before public launch.
- Confirm and publish the operator identity and a private privacy-request contact before public release. The bilingual notice is at `/en/privacy` and `/pt-BR/privacy`; its missing operator or contact state blocks publication.
- Record security incidents and a response process. Confirm the production legal basis, data regions, processor agreements, and request handling with the project owner before public collection.

## Primary references

- [Brazil's LGPD, updated text at Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html), accessed 2026-11-17.
- [ANPD guidance on information security for small processing agents](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/processo-guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte.pdf), accessed 2026-11-17.
- [ANPD Resolution 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022), accessed 2026-11-17.
- [OWASP ASVS](https://owasp.org/projects/asvs), accessed 2026-11-17.

Rejected attempt outcomes remain in an account-scoped local review queue and can be downloaded with pending attempts. Both queues together are capped at 500 records. They store the same minimal outcomes, never raw input history or device identity, and are cleared by explicit progress deletion. Saved-attempt chronology uses server receipt time.

## Optional embedded video

FP-37 adds one external official Ken guide. Until the learner explicitly loads it, no YouTube iframe, thumbnail or preconnect request exists. Loading a privacy-enhanced YouTube player shares connection data with Google under its policies. Autoplay is disabled, closing unloads it, and written lesson/source-link alternatives remain available. No viewing analytics are stored by FightPath. The public notice explains this choice in both locales.

## Learning activity

Optional account-bound records contain only lesson ID, revision, activity kind (read, correct check or self-reported in-game drill) and first timestamp. Quiz answers are validated but not retained. No notes/replays are collected. Existing export includes these records; progress deletion and the signed account webhook remove them transactionally with attempts. Retention removes records after 180 days. They grant no XP and do not certify match skill.
