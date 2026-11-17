import type { Lesson } from "./learning";

const introduction = {
  title: "Capcom / PlayStation: introducing the Drive System",
  url: "https://blog.playstation.com/2022/06/02/street-fighter-6-aims-to-redefine-the-fighting-genre-in-2023/",
  supports:
    "Original high-level descriptions of Impact, Parry, Rush, Overdrive and Reversal, not current numeric rules.",
};
const resources = {
  title: "Capcom: Street Fighter 6 system introduction",
  url: "https://news.capcomusa.com/2022/06/02/street-fighter-6-redefines-the-genre-in-2023/",
  supports:
    "Drive techniques share a gauge; exhaustion causes Burnout. Introductory 2022 evidence, not a current build specification.",
};
const patch = {
  review: "conceptual" as const,
  basis:
    "Capcom system introductions, 2022; reviewed 2026-11-17. Current executable build not verified.",
};

export const sf6Lessons: Lesson[] = [
  {
    id: "read-your-resources",
    revision: 1,
    track: "sf6",
    scope: "sf6",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["hit-block-and-your-turn"],
    patch,
    sources: [
      resources,
      {
        title: "Capcom / PlayStation: Guile's Super Arts",
        url: "https://blog.playstation.com/2022/06/09/guile-returns-in-street-fighter-6/",
        supports:
          "Super Arts use stocks, separately from the Drive System. No current Ken super costs asserted.",
      },
    ],
    copy: {
      en: {
        title: "Look at your resources before spending",
        summary: "Drive and Super are decisions, not decorations.",
        objective: "Notice which gauge an option uses and recognize Burnout.",
        paragraphs: [
          "Drive techniques draw on a shared resource. Spending for an approach changes what you have left for defense. Super Arts use their own resource; do not plan a route by looking at only one gauge.",
          "Emptying Drive causes Burnout, a vulnerable state. Before choosing an expensive approach, look at your gauge and the space behind you. A plan that leaves you cornered with no Drive deserves extra caution.",
          "Use SF6's current tutorial and command display for exact costs and recovery rules. This introduction intentionally avoids numeric promises that can change with a balance update.",
        ],
        example:
          "You want to rush forward, but your Drive is almost empty and you are near the corner. First consider walking to a better position instead of automatically spending.",
        mistake:
          "Repeating the same resource-heavy route regardless of the gauge.",
        drill:
          "In training, identify the Drive and Super displays. Perform one Drive technique and one Super using the game's current guide, watching which display changes. Then observe Burnout and recovery with training settings. Stop to describe what options you would reconsider.",
        check: {
          question: "What should change your spending plan?",
          options: [
            "Only the last combo you learned",
            "Remaining resources and screen position",
            "Nothing; always use the longest route",
          ],
          answer: 1,
          explanation:
            "A useful route also needs to fit your available resources and the position it leaves you in.",
        },
      },
      "pt-BR": {
        title: "Olhe seus recursos antes de gastar",
        summary: "Drive e Super fazem parte da decisão.",
        objective: "Identificar qual barra uma opção usa e reconhecer Burnout.",
        paragraphs: [
          "As técnicas de Drive usam um recurso compartilhado. Gastar para se aproximar muda o que sobra para defender. Super Arts usam outro recurso; não planeje uma sequência olhando apenas uma barra.",
          "Esgotar Drive causa Burnout, um estado vulnerável. Antes de escolher uma aproximação cara, olhe sua barra e o espaço atrás de você. Ficar no canto sem Drive exige cuidado extra.",
          "Consulte o tutorial e a lista de comandos da versão instalada para custos e regras exatas de recuperação. Esta introdução evita promessas numéricas que podem mudar com atualizações.",
        ],
        example:
          "Você quer avançar, mas está quase sem Drive e perto do canto. Considere primeiro caminhar para uma posição melhor em vez de gastar automaticamente.",
        mistake: "Repetir uma rota cara sem olhar a barra.",
        drill:
          "No treino, identifique as barras de Drive e Super. Faça uma técnica de Drive e um Super seguindo o guia atual do jogo e observe qual barra muda. Depois observe Burnout e recuperação nas configurações de treino. Descreva quais escolhas você reconsideraria.",
        check: {
          question: "O que deve mudar seu plano de gasto?",
          options: [
            "Só o último combo aprendido",
            "Recursos restantes e posição na tela",
            "Nada; use sempre a rota mais longa",
          ],
          answer: 1,
          explanation:
            "Uma rota útil também precisa caber nos recursos disponíveis e na posição em que você vai ficar.",
        },
      },
    },
  },
  {
    id: "recognize-drive-options",
    revision: 1,
    track: "sf6",
    scope: "sf6",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["read-your-resources"],
    patch,
    sources: [introduction],
    copy: {
      en: {
        title: "Recognize Impact, Parry and Rush",
        summary: "Give each tool a job before trying to use everything.",
        objective:
          "Distinguish an armored attack, a defensive response and an approach.",
        paragraphs: [
          "Drive Impact is an armored strike with an important wall interaction. Drive Parry is a defensive system for repelling attacks. Drive Rush provides a fast approach, including transitions described in the game's tutorials.",
          "These names describe different jobs. Seeing an opponent advance does not automatically tell you that attacking is safe. Start by identifying what happened, then test a response.",
          "A useful first session isolates one tool. Exact inputs, exceptions and response windows belong to the current in-game tutorial. Do not treat this conceptual lesson as an instruction to parry every attack.",
        ],
        example:
          "After a round, name the event that caught you: an armored strike, a parry, or a fast approach. That gives you a specific situation to recreate.",
        mistake:
          "Practicing several unfamiliar Drive tools at once and being unable to tell why an exchange failed.",
        drill:
          "Run three short training blocks: observe Impact away from and near a wall; test Parry against a recorded attack; then use Rush and stop to check distance and Drive. Follow the current tutorial for activation and responses. Record one observation per block.",
        check: {
          question:
            "What is the best first goal when a Drive interaction is confusing?",
          options: [
            "Spend all resources",
            "Identify the tool and recreate that situation",
            "Assume every approach is safe",
          ],
          answer: 1,
          explanation:
            "Recognition makes the next drill specific. A tool name alone does not settle every interaction.",
        },
      },
      "pt-BR": {
        title: "Reconheça Impact, Parry e Rush",
        summary: "Dê uma função a cada ferramenta antes de tentar usar tudo.",
        objective:
          "Distinguir um ataque com armadura, uma defesa e uma aproximação.",
        paragraphs: [
          "Drive Impact é um golpe com armadura e uma interação importante com a parede. Drive Parry é um sistema defensivo para repelir ataques. Drive Rush oferece uma aproximação rápida, com transições explicadas nos tutoriais do jogo.",
          "Esses nomes representam funções diferentes. Ver o adversário avançar não significa que atacar seja seguro. Primeiro identifique o que aconteceu; depois teste uma resposta.",
          "Uma boa primeira sessão isola uma ferramenta. Comandos, exceções e janelas de resposta devem ser consultados no tutorial atual. Esta aula conceitual não recomenda usar Parry contra tudo.",
        ],
        example:
          "Depois do round, dê nome ao que pegou você: golpe com armadura, Parry ou aproximação rápida. Isso define uma situação concreta para reproduzir.",
        mistake:
          "Treinar várias ferramentas novas ao mesmo tempo sem conseguir explicar por que perdeu a troca.",
        drill:
          "Faça três blocos curtos no treino: observe Impact longe e perto da parede; teste Parry contra um ataque gravado; use Rush e pare para conferir distância e Drive. Siga o tutorial atual para comandos e respostas. Anote uma observação por bloco.",
        check: {
          question:
            "Qual é um bom primeiro objetivo numa interação confusa de Drive?",
          options: [
            "Gastar todos os recursos",
            "Identificar a ferramenta e reproduzir a situação",
            "Presumir que toda aproximação é segura",
          ],
          answer: 1,
          explanation:
            "Reconhecer a situação torna o treino específico. O nome de uma ferramenta não resolve todas as interações.",
        },
      },
    },
  },
  {
    id: "defend-with-a-plan",
    revision: 1,
    track: "sf6",
    scope: "sf6",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["recognize-drive-options"],
    patch,
    sources: [introduction, resources],
    copy: {
      en: {
        title: "Defend with a resource plan",
        summary: "Reversal and Overdrive need a reason, too.",
        objective:
          "Choose a question to test instead of spending under pressure automatically.",
        paragraphs: [
          "Drive Reversal is a counterattack system. Overdrive Arts enhance special moves. Both belong to the Drive toolkit; their exact current conditions should be checked in the game.",
          "When pressure feels overwhelming, ask what you are trying to change: distance, the next repeated attack, or your position near the wall. A defensive resource is a choice to investigate, not a guarantee that your turn has begun.",
          "Separate the observed hit state from your intention. A normal hit, counter hit and punish situation should not be mixed when testing a route. Use the training display and reset conditions between trials rather than transferring a result from one state to another.",
        ],
        example:
          "You keep losing after pressing during pressure. Recreate the sequence, try simply defending, then compare one deliberate response using the current tutorial. Check the result and resource cost.",
        mistake:
          "Calling a response reliable after one successful trial with different training conditions.",
        drill:
          "Read the Reversal and Overdrive tutorial entries. In separate blocks, test one use of each, then repeat with low Drive and observe the consequences. Keep the opponent's recording and hit-state settings consistent. This drill needs SF6; the browser cannot certify the result.",
        check: {
          question: "What makes a comparison useful?",
          options: [
            "Changing every setting each attempt",
            "Keeping the scenario consistent and observing the result",
            "Counting a browser motion as a successful defense",
          ],
          answer: 1,
          explanation:
            "Consistent conditions help explain whether the chosen response solved the problem.",
        },
      },
      "pt-BR": {
        title: "Defenda com um plano de recursos",
        summary: "Reversal e Overdrive também precisam de um motivo.",
        objective:
          "Escolher o que testar em vez de gastar automaticamente sob pressão.",
        paragraphs: [
          "Drive Reversal é um sistema de contra-ataque. Overdrive Arts reforçam golpes especiais. Ambos fazem parte das ferramentas de Drive; confira as condições atuais no jogo.",
          "Quando a pressão parece difícil, pergunte o que quer mudar: distância, o próximo ataque repetido ou sua posição perto da parede. Um recurso defensivo é uma escolha a investigar, não uma garantia de que sua vez começou.",
          "Separe o estado de acerto observado da sua intenção. Acerto normal, counter hit e punição não devem ser misturados ao testar uma rota. Use o indicador do treino e reinicie as condições em vez de transferir um resultado de um estado para outro.",
        ],
        example:
          "Você perde sempre que aperta sob pressão. Reproduza a sequência, tente apenas defender e depois compare uma resposta deliberada seguindo o tutorial atual. Confira resultado e custo.",
        mistake:
          "Chamar uma resposta de confiável depois de uma tentativa com condições diferentes.",
        drill:
          "Leia as entradas de Reversal e Overdrive no tutorial. Em blocos separados, teste um uso de cada e depois repita com pouco Drive para observar consequências. Mantenha a gravação do adversário e as condições de acerto. Este exercício exige SF6; o navegador não certifica o resultado.",
        check: {
          question: "O que torna a comparação útil?",
          options: [
            "Mudar tudo em cada tentativa",
            "Manter o cenário consistente e observar o resultado",
            "Contar um movimento no navegador como defesa bem-sucedida",
          ],
          answer: 1,
          explanation:
            "Condições consistentes ajudam a entender se a resposta resolveu o problema.",
        },
      },
    },
  },
];
