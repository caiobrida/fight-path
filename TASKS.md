# FightPath — plano de tarefas (proposta para validação)

Este plano divide o desenvolvimento em entregas revisáveis. Cada tarefa tem um arquivo próprio em [`tasks/`](tasks/README.md), com checklist, dependências e critérios de aceite. Nenhuma tarefa de implementação foi iniciada.

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

| Fase | Tarefa | Entrega | Depende de | Estado |
| --- | --- | --- | --- | --- |
| Planejamento | [FP-01](tasks/FP-01-documentacao-base.md) | Documentação base e decisões em aberto | Validação deste plano | Concluída |
| Planejamento | [FP-02](tasks/FP-02-fontes-do-jogo.md) | Política e catálogo de fontes do jogo | FP-01 | Em andamento |
| Fundação | [FP-03](tasks/FP-03-base-tecnica.md) | Stack e projeto inicial | FP-01 | Concluída |
| Fundação | [FP-04](tasks/FP-04-ci.md) | CI para PRs | FP-03 | Pendente |
| Fundação | [FP-05](tasks/FP-05-localizacao.md) | Infraestrutura `en` e `pt-BR` | FP-03 | Pendente |
| Fundação | [FP-06](tasks/FP-06-dados-e-identidade.md) | Contrato de dados, identidade e segurança | FP-01 | Pendente |
| Simulador | [FP-07](tasks/FP-07-modelo-de-inputs.md) | Modelo de inputs independente da interface | FP-03 | Pendente |
| Simulador | [FP-08](tasks/FP-08-adaptadores-de-dispositivos.md) | Teclado, gamepad e touch | FP-07 | Pendente |
| Simulador | [FP-09](tasks/FP-09-mapeamento-de-controles.md) | Configuração e calibração de controles | FP-08 | Pendente |
| Simulador | [FP-10](tasks/FP-10-validacao-de-comandos.md) | Validação e explicação de erros | FP-07, FP-02 | Pendente |
| Simulador | [FP-11](tasks/FP-11-interface-do-simulador.md) | Prática e histórico visual de inputs | FP-05, FP-09, FP-10 | Pendente |
| Conteúdo | [FP-12](tasks/FP-12-treino-universal.md) | Treinos universais de execução | FP-02, FP-11 | Pendente |
| Conteúdo | [FP-13](tasks/FP-13-ken-classic.md) | Trilha inicial do Ken Classic | FP-02, FP-11 | Pendente |
| Progresso | [FP-14](tasks/FP-14-progresso-e-persistencia.md) | Progresso salvo no Neon | FP-06, FP-12, FP-13 | Pendente |
| Progresso | [FP-15](tasks/FP-15-gamificacao.md) | Domínio, XP e desafios | FP-14 | Pendente |
| Lançamento | [FP-16](tasks/FP-16-acessibilidade-e-qa.md) | Testes em dispositivos e acessibilidade | FP-11, FP-12, FP-13 | Pendente |
| Lançamento | [FP-17](tasks/FP-17-preparo-vercel.md) | Ambiente e publicação futura na Vercel | FP-04, FP-06, FP-16 | Pendente |

## Fora do primeiro recorte

- Outros personagens e jogos; controles Modern; conteúdos avançados de neutral, frame data, defesa e reação.
- Validação fiel de combos do jogo. O primeiro simulador avaliará sequências de inputs e ritmo; equivalência ao motor de Street Fighter 6 exige pesquisa e testes específicos.
- Modos de treino como side switch, memory, survival e reação. Eles podem ganhar tarefas próprias após o primeiro ciclo de uso.

As fronteiras do MVP, a stack e o fluxo de contas ainda precisam ser confirmados em FP-01 e FP-06. A ordem acima é uma proposta, não uma decisão irreversível.
