import type { Lesson } from "./learning";

export const essentialLessons: Lesson[] = [
  {
    id: "normal-special-super",
    revision: 1,
    level: "beginner",
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["read-an-input"],
    sources: [
      {
        title: "Infil: Normal",
        url: "https://glossary.infil.net/?t=Normal",
        supports:
          "Basic attacks, with standing/crouching/air and directional variations depending on the game.",
      },
      {
        title: "Infil: Special Move",
        url: "https://glossary.infil.net/?t=Special%20Move",
        supports:
          "Special inputs often combine motions and attacks; exceptions exist.",
      },
      {
        title: "Infil: Super",
        url: "https://glossary.infil.net/?t=Super",
        supports:
          "Supers spend a resource; their effects and input rules vary by game.",
      },
    ],
    copy: {
      en: {
        title: "Know what kind of attack you are choosing",
        summary: "Normals, specials and supers serve different decisions.",
        objective: "Classify an attack before choosing how to practice it.",
        paragraphs: [
          "A normal is a basic attack, usually a button press. Standing, crouching, jumping and direction-plus-button attacks may be different moves. The word normal does not mean unimportant: start by learning the reach of a small set.",
          "A special move uses its own command, often a motion plus an attack. A super spends a separate resource and may have a powerful attack or another effect. Input conventions and exceptions depend on the game; do not guess from an animation's size.",
        ],
        example:
          "You want a grounded option to check space. Choosing a familiar normal whose reach you tested may be more useful than repeatedly attempting the most cinematic attack.",
        mistake:
          "Assuming special means always better, or that all attacks with a direction are specials.",
        drill:
          "In SF6's current Classic command list, identify one normal, one special and one Super for Ken. Test each separately, observe its input and resource display, then explain which situation you want to investigate with it.",
        check: {
          question: "Which statement is useful when building a small toolkit?",
          options: [
            "Normals can form an important part of the plan",
            "Every directional attack is a special",
            "The flashiest attack is always the right choice",
          ],
          answer: 0,
          explanation:
            "Classification helps you find and practice a tool. Its value still depends on distance, timing and resources.",
        },
      },
      "pt-BR": {
        title: "Entenda o tipo de ataque que escolheu",
        summary: "Normais, especiais e supers atendem a decisões diferentes.",
        objective: "Classificar um ataque antes de escolher como treiná-lo.",
        paragraphs: [
          "Um normal é um ataque básico, geralmente acionado por um botão. Ataques em pé, agachados, no ar e com direção mais botão podem ser diferentes. Normal não significa pouco importante: comece aprendendo o alcance de poucas opções.",
          "Um especial usa um comando próprio, frequentemente movimento mais ataque. Um Super gasta outro recurso e pode causar um ataque forte ou outro efeito. Comandos e exceções dependem do jogo; não adivinhe pela animação.",
        ],
        example:
          "Você precisa de uma opção no chão para disputar espaço. Um normal conhecido, com alcance testado, pode ajudar mais que tentar repetidamente o golpe mais cinematográfico.",
        mistake:
          "Presumir que especial é sempre melhor ou que todo ataque com direção é especial.",
        drill:
          "Na lista atual de comandos Classic do SF6, identifique um normal, um especial e um Super de Ken. Teste cada um separadamente, observe comando e barras e explique qual situação quer investigar com ele.",
        check: {
          question:
            "Qual afirmação ajuda a montar um conjunto pequeno de ferramentas?",
          options: [
            "Normais podem ser uma parte importante do plano",
            "Todo ataque com direção é especial",
            "O ataque mais chamativo é sempre a escolha certa",
          ],
          answer: 0,
          explanation:
            "A classificação ajuda a encontrar e treinar a ferramenta. O valor dela ainda depende de distância, tempo e recursos.",
        },
      },
    },
  },
  {
    id: "an-attack-has-phases",
    revision: 1,
    level: "beginner",
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["normal-special-super"],
    sources: [
      {
        title: "Infil: Active",
        url: "https://glossary.infil.net/?t=Active",
        supports:
          "Startup, active and recovery are phases of an attack; active time is when it can connect.",
      },
    ],
    copy: {
      en: {
        title: "Read an attack in three phases",
        summary: "Windup, contact and recovery explain many missed exchanges.",
        objective:
          "Distinguish startup, active time and recovery without guessing numeric frame data.",
        paragraphs: [
          "Startup is the preparation before an attack can connect. During its active period, the attack can hit if the relevant game conditions are met. Recovery is the remaining time before ordinary actions become available again. These phases are described in frames, but this lesson supplies no move-specific counts.",
          "A move may look finished while it still has recovery, and an attack with reach still needs time to become active. Use a current training display to examine the interaction. A diagram or browser input history does not measure a character's actual frame data.",
        ],
        example:
          "Your attack misses and you immediately try another button, but the opponent hits you first. Check the first move's recovery before blaming the second input.",
        mistake:
          "Treating the visual end of an animation as proof that the character can already defend.",
        drill:
          "Choose one grounded attack in SF6 training. Observe its startup, active and recovery display. Repeat at a distance where it misses and compare when you can act again. Describe the phases before looking for a faster sequence.",
        check: {
          question: "Which phase is the opportunity for an attack to connect?",
          options: ["Startup", "Active", "Recovery"],
          answer: 1,
          explanation:
            "Active time is the contact phase. Distance and the game's other rules still matter.",
        },
      },
      "pt-BR": {
        title: "Leia um ataque em três fases",
        summary: "Preparação, contato e recuperação explicam muitas trocas.",
        objective:
          "Distinguir startup, período ativo e recuperação sem adivinhar números de frames.",
        paragraphs: [
          "Startup é a preparação antes de o ataque poder acertar. No período ativo, o golpe pode conectar se as condições do jogo forem atendidas. Recuperação é o tempo restante até as ações normais voltarem a ficar disponíveis. Essas fases são descritas em frames, mas esta aula não fornece números de golpes específicos.",
          "Um golpe pode parecer encerrado e ainda ter recuperação. Mesmo um ataque com alcance precisa de tempo para ficar ativo. Use o indicador atual do treino para observar a interação. Um diagrama ou histórico do navegador não mede os frames reais do personagem.",
        ],
        example:
          "Seu ataque erra e você tenta outro botão imediatamente, mas o adversário acerta primeiro. Confira a recuperação do primeiro golpe antes de culpar o segundo input.",
        mistake:
          "Tratar o fim visual da animação como prova de que já é possível defender.",
        drill:
          "Escolha um ataque no chão no treino do SF6. Observe startup, atividade e recuperação no indicador. Repita numa distância em que ele erre e compare quando consegue agir novamente. Descreva as fases antes de buscar uma sequência mais rápida.",
        check: {
          question: "Em qual fase um ataque tem a oportunidade de conectar?",
          options: ["Startup", "Ativa", "Recuperação"],
          answer: 1,
          explanation:
            "O período ativo é a fase de contato. Distância e outras regras do jogo ainda importam.",
        },
      },
    },
  },
  {
    id: "block-is-not-every-defense",
    revision: 1,
    level: "beginner",
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["hit-block-and-your-turn"],
    sources: [
      {
        title: "Infil: Throw",
        url: "https://glossary.infil.net/?t=Throw",
        supports:
          "Throws bypass blocking; normal throw defense and command throws have different rules.",
      },
    ],
    copy: {
      en: {
        title: "Blocking does not answer every threat",
        summary:
          "Recognize close-range throws without abandoning your defense.",
        objective:
          "Distinguish a strike/throw decision and choose a scenario to test.",
        paragraphs: [
          "A throw is a close-range attack that bypasses ordinary blocking. That creates a reason to reconsider simply holding guard when the opponent is close. It does not mean every approach should be met by pressing a button or jumping.",
          "Normal throw escapes and command throws have different rules. Check the selected game's current defensive tutorial for inputs and timing. First recognize the type of threat, then test one response; do not carry an escape rule from another game without checking it.",
        ],
        example:
          "You block a repeated attack sequence successfully but then lose to a throw at close range. The new practice problem is recognizing that close-range choice, not discarding everything you learned about blocking.",
        mistake:
          "Trying the same throw escape against every kind of grab, or jumping automatically whenever the opponent moves close.",
        drill:
          "In SF6's defensive tutorial, review a normal throw and its escape. In training, compare a recorded close-range strike with a normal throw using consistent spacing. Identify each first, then test the tutorial response. Treat any command throw as a separate case to learn.",
        check: {
          question: "Why does simply blocking sometimes fail at close range?",
          options: [
            "Throws can bypass ordinary blocking",
            "All close attacks are unblockable",
            "Defense has no useful choices",
          ],
          answer: 0,
          explanation:
            "Throws create a different threat. The response depends on throw type and the game's rules.",
        },
      },
      "pt-BR": {
        title: "Bloquear não responde a toda ameaça",
        summary: "Reconheça agarrões de perto sem abandonar a defesa.",
        objective:
          "Distinguir a decisão entre golpe e agarrão e escolher um cenário para testar.",
        paragraphs: [
          "Um agarrão é um ataque de curta distância que passa pelo bloqueio comum. Isso cria um motivo para reconsiderar apenas segurar a defesa quando o adversário está perto. Não significa que toda aproximação deva receber um botão ou um salto.",
          "Escapes de agarrão normal e command throws têm regras diferentes. Confira comandos e tempo no tutorial defensivo atual. Reconheça primeiro a ameaça e depois teste uma resposta; não transfira uma regra de outro jogo sem conferir.",
        ],
        example:
          "Você defende uma sequência repetida, mas perde para um agarrão de perto. O novo problema é reconhecer essa escolha, não descartar tudo que aprendeu sobre bloquear.",
        mistake:
          "Tentar o mesmo escape contra qualquer agarrão ou saltar automaticamente quando o adversário se aproxima.",
        drill:
          "No tutorial defensivo do SF6, reveja um agarrão normal e seu escape. No treino, compare uma gravação de golpe próximo com um agarrão normal na mesma distância. Primeiro identifique cada um; depois teste a resposta do tutorial. Trate command throws como casos separados.",
        check: {
          question: "Por que só bloquear pode falhar de perto?",
          options: [
            "Agarrões podem passar pelo bloqueio comum",
            "Todo ataque próximo é indefensável",
            "Defender não oferece escolhas úteis",
          ],
          answer: 0,
          explanation:
            "O agarrão cria outra ameaça. A resposta depende do tipo de agarrão e das regras do jogo.",
        },
      },
    },
  },
];
