# FightPath — plano de tarefas

Each task has a checklist, dependencies and acceptance criteria. The owner approved FP-19 through FP-40 on 2026-11-17, with one branch and PR per task and passing CI before merge.

Owner constraint added November 17, 2026: never automate SF6, including launch, menus and training/offline play. Complete source research, original content preparation, recording review and isolated FightPath tests independently. Any optional actual game execution/capture requires a human. The owner waived the old execution/clip gate for approved SuperCombo references in FP-42; do not mark unperformed gameplay checks complete.

Current evidence and remaining gates: [IMPLEMENTATION-STATUS.md](IMPLEMENTATION-STATUS.md). Original planning statements below are historical; the status column and implementation notes describe delivered work.

Owner-requested visual follow-up: [FP-41 — Game imagery, demonstrations and execution feedback](tasks/FP-41-game-media-and-practice-feedback.md). This includes varied characters in general sections, Ken-specific visuals in his path, input comparison, result colors/icons and accessible motion.

Owner-requested source follow-up: [FP-42 — SuperCombo Ken reference library](tasks/FP-42-supercombo-ken-bnbs.md). Import current tables, organize hit/Drive/Super categories, display resource expenditure and record SuperCombo as a preferred future source. Independent gameplay checks and clips are optional.
## Regras que se aplicam a todas as tarefas

- Produto disponível em inglês (`en`) e português do Brasil (`pt-BR`) desde o início; interface, conteúdo e feedback devem contemplar os dois idiomas.
- A experiência deve ser responsiva e mobile first, com prática confortável no navegador de desktop e no celular.
- Primeiro recorte: Street Fighter 6, Ken e controles Classic. A estrutura deve permitir outros personagens e jogos depois, sem prometer suporte a eles no MVP.
- Informações sobre o jogo publicadas no produto precisam ser verificadas em fontes reais e renomadas, com origem e data registradas. Priorizar fontes oficiais. Distinguir dados confirmados de hipóteses de implementação.
- Planejar persistência em PostgreSQL no Neon e futura hospedagem na Vercel. Decidir autenticação e acesso seguro ao banco antes de implementar o fluxo de dados pessoais.
- Aplicar segurança desde a arquitetura e seguir os princípios da LGPD: coletar o mínimo necessário, proteger acesso, informar finalidade e retenção, e permitir exercício de direitos antes da publicação. Consultar `PRIVACY.md`.
- Código e configuração de infraestrutura ficam em branches separadas, com PRs para `main` e CI desde o começo. Commits devem usar apenas `Caio Brida <caiobrida1@gmail.com>` e não mencionar o assistente em autoria, mensagens ou metadados de Git.
- Antes de todo commit, push ou operação de PR, conferir o caminho do repositório, a branch e os URLs de fetch e push do `origin`: ambos devem ser exatamente `https://github.com/caiobrida/fight-path`. Não usar outra conta para autenticar no GitHub.
- Não adicionar comentários ao código. Código, identificadores, nomes de branches, mensagens de commit e texto de PR devem estar em inglês; textos exibidos no produto devem existir em `en` e `pt-BR`.
- Decisões duráveis devem ser registradas em `AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md` ou `ROADMAP.md`, conforme a natureza. Cada PR atualiza a documentação afetada.
- Marcar um item da checklist após criar e verificar o artefato correspondente. Marcar a tarefa como concluída após revisão e registro da evidência no PR. Um `- [ ]` significa pendente.

## Ordem sugerida

| Fase         | Tarefa                                              | Entrega                                                  | Depende de            | Estado       |
| ------------ | --------------------------------------------------- | -------------------------------------------------------- | --------------------- | ------------ |
| Planejamento | [FP-01](tasks/FP-01-documentacao-base.md)           | Documentação base e decisões em aberto                   | Validação deste plano | Concluída    |
| Planejamento | [FP-02](tasks/FP-02-fontes-do-jogo.md)              | Política e catálogo de fontes do jogo                    | FP-01                 | Concluída    |
| Fundação     | [FP-03](tasks/FP-03-base-tecnica.md)                | Stack e projeto inicial                                  | FP-01                 | Concluída    |
| Fundação     | [FP-04](tasks/FP-04-ci.md)                          | CI para PRs                                              | FP-03                 | Concluída    |
| Fundação     | [FP-05](tasks/FP-05-localizacao.md)                 | Infraestrutura `en` e `pt-BR`                            | FP-03                 | Concluída    |
| Fundação     | [FP-06](tasks/FP-06-dados-e-identidade.md)          | Contrato de dados, identidade e segurança                | FP-01                 | Concluída    |
| Simulador    | [FP-07](tasks/FP-07-modelo-de-inputs.md)            | Modelo de inputs independente da interface               | FP-03                 | Concluída    |
| Simulador    | [FP-08](tasks/FP-08-adaptadores-de-dispositivos.md) | Teclado, gamepad e touch                                 | FP-07                 | Em andamento |
| Simulador    | [FP-09](tasks/FP-09-mapeamento-de-controles.md)     | Configuração e calibração de controles                   | FP-08                 | Concluída    |
| Simulador    | [FP-10](tasks/FP-10-validacao-de-comandos.md)       | Validação e explicação de erros                          | FP-07, FP-02          | Concluída    |
| Simulador    | [FP-11](tasks/FP-11-interface-do-simulador.md)      | Prática e histórico visual de inputs                     | FP-05, FP-09, FP-10   | Concluída    |
| Conteúdo     | [FP-12](tasks/FP-12-treino-universal.md)            | Treinos universais de execução                           | FP-02, FP-11          | Em andamento |
| Conteúdo     | [FP-13](tasks/FP-13-ken-classic.md)                 | Trilha inicial do Ken Classic                            | FP-02, FP-11          | Em andamento |
| Progresso    | [FP-14](tasks/FP-14-progresso-e-persistencia.md)    | Progresso salvo no Neon                                  | FP-06, FP-12, FP-13   | Concluída    |
| Progresso    | [FP-15](tasks/FP-15-gamificacao.md)                 | Domínio, XP e desafios                                   | FP-14                 | Concluída    |
| Lançamento   | [FP-16](tasks/FP-16-acessibilidade-e-qa.md)         | Testes em dispositivos e acessibilidade                  | FP-11, FP-12, FP-13   | Em andamento |
| Lançamento   | [FP-17](tasks/FP-17-preparo-vercel.md)              | Ambiente e publicação futura na Vercel                   | FP-04, FP-06, FP-16   | Em andamento |
| Identidade   | [FP-18](tasks/FP-18-clerk-authentication.md)        | Autenticação obrigatória com Clerk e progresso por conta | FP-05, FP-14, FP-17   | Em andamento |

## Próxima fase proposta — aguardando validação

Estudo de 17/11/2026: [auditoria e evidências](AUDIT.md), [direção visual e bibliotecas](DESIGN-STUDY.md) e [conteúdo e mídia](RESEARCH-CONTENT.md). Nenhuma alteração de aplicação, dependência ou serviço faz parte deste planejamento.

| Ordem | Tarefa | Entrega | Dependências principais | Prioridade | Estado |
| --- | --- | --- | --- | --- | --- |
| 1 | [FP-19](tasks/FP-19-dualsense-detection.md) | Diagnóstico e detecção do DualSense/controle ativo | FP-08 | P1 | Implemented; physical device QA pending |
| 2 | [FP-20](tasks/FP-20-controller-calibration.md) | Calibração, troca de botões, eixos e perfis salvos | FP-19 | P1 | Implemented; physical device QA pending |
| 3 | [FP-21](tasks/FP-21-attempt-boundaries.md) | Corrigir tentativas extras ao segurar ataque | FP-10, FP-11 | P1 | Implemented; physical device QA pending |
| 4 | [FP-22](tasks/FP-22-input-lifecycle-and-touch.md) | Touch contínuo, foco, pausa, captura e reconexão | FP-19 a FP-21 | P2 | Implemented; real mobile QA pending |
| 5 | [FP-23](tasks/FP-23-progress-sync-safety.md) | Investigar sincronização, retry e exclusão concorrente | FP-21 | P2 | Implemented; regression checks completed |
| 6 | [FP-25](tasks/FP-25-design-direction.md) | Proposta visual, tokens e escolha de biblioteca | Estudo visual | P2 | Done |
| 7 | [FP-26](tasks/FP-26-design-system.md) | Design system, variantes, acessibilidade e galeria | Direção FP-25 aprovada | P2 | Implemented; assistive-device QA pending |
| 8 | [FP-24](tasks/FP-24-practice-onboarding.md) | Jornada guiada do controle até o primeiro comando | FP-19 a FP-21, FP-26 | P2 | Implemented; learner walkthrough pending |
| 9 | [FP-27](tasks/FP-27-home-and-navigation.md) | Home, ações separadas, navegação e idioma persistentes | FP-26, FP-37 para mídia | P2 | Done |
| 10 | [FP-28](tasks/FP-28-setup-and-practice-design.md) | Novo visual da configuração e do treino | FP-19 a FP-22, FP-24, FP-26 | P2 | Implemented; physical device QA pending |
| 11 | [FP-29](tasks/FP-29-learning-model-and-reader.md) | Catálogo e leitor bilíngue com fontes e revisão | FP-26, contrato de navegação FP-27 | P2 | Done |
| 12 | [FP-30](tasks/FP-30-fighting-game-foundations.md) | Primeiros fundamentos e defesa | FP-29, FP-37 | P2 | Done; gameplay demonstrations pending |
| 13 | [FP-31](tasks/FP-31-neutral-and-footsies.md) | Neutral, espaçamento, footsies e adaptação | FP-30 | P2 | Done |
| 14 | [FP-32](tasks/FP-32-sf6-systems.md) | Sistemas do SF6 com versão verificada | FP-30 | P2 | Concept lessons shipped; battle-build review pending |
| 15 | [FP-33](tasks/FP-33-ken-game-plan.md) | Plano de jogo e decisões do Ken Classic | FP-31, FP-32 | P2 | Concept lessons shipped; current toolkit review pending |
| 16 | [FP-34](tasks/FP-34-ken-bnb-verification.md) | Review Ken combo source | FP-32, FP-33 | P2 | Source review complete; former gameplay gate superseded by FP-42 |
| 17 | [FP-35](tasks/FP-35-bnb-library.md) | Ken combo library and practice references | FP-29, FP-34, FP-37 | P2 | Implemented; source publication expanded by FP-42 |
| 18 | [FP-36](tasks/FP-36-practice-habits.md) | Hábitos de treino, replay e comportamento em partidas | FP-29, FP-30, FP-33 | P2 | Done |
| Transversal | [FP-37](tasks/FP-37-media-library.md) | Imagens, diagramas, clipes e player com origem documentada | FP-25, FP-26; verificação do conteúdo | P2 | Delivered with FP-41; full-combo recordings optional |
| 19 | [FP-38](tasks/FP-38-learning-progress.md) | Progresso de leitura, checagens e drills separado da execução | FP-23, FP-29, FP-35, FP-36 | P2 | Done |
| 20 | [FP-39](tasks/FP-39-auth-navigation-and-privacy.md) | Auth completa, retornos, privacidade e webhook | FP-27, FP-18 | P2 | Implemented; external Google consent check pending |
| Gate contínuo/final | [FP-40](tasks/FP-40-release-regression-matrix.md) | E2E, banco no CI, dispositivos, acessibilidade e novo pente-fino | Mudanças aprovadas | P2 | Automated checks delivered; physical validation pending |

Começar por FP-19, FP-20 e FP-21 para recuperar confiança no treino. FP-25 pode avançar em paralelo técnico após aprovação deste plano; sua proposta visual ainda terá uma revisão antes da migração de telas. Executar FP-37 conforme cada conteúdo for verificado, sem travar o desenvolvimento do catálogo em assets não aprovados. A ordem é uma sequência de entregas, não uma estimativa de datas.

**Escopo de BnBs proposto:** primeiro uma biblioteca de rotas verificadas, vídeo e prática orientada no SF6. Um simulador de combos com links/cancels e validação fiel exige outro contrato de avaliação e uma tarefa futura específica; os seis exercícios atuais não validam combos reais.

## Fora do recorte atual, inclusive desta proposta

- Outros personagens e jogos; controles Modern; matchups completos e otimizações avançadas além das rotas iniciais verificadas.
- Validação fiel de combos do jogo. O primeiro simulador avaliará sequências de inputs e ritmo; equivalência ao motor de Street Fighter 6 exige pesquisa e testes específicos.
- Modos de treino como side switch, memory, survival e reação. Eles podem ganhar tarefas próprias após o primeiro ciclo de uso.

O recorte inicial, a stack e a autenticação obrigatória com Clerk estão registrados em `PRODUCT.md` e `ARCHITECTURE.md`. Testes com jogadores e dispositivos reais, além da configuração externa de Neon, Vercel e Clerk para produção, permanecem como gates de publicação.
