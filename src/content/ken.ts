import type { Lesson } from "./learning";

const guide = {
  title: "Street Fighter: official Ken character guide",
  url: "https://www.youtube.com/watch?v=1SX2m7sqbtA",
  supports:
    "Capcom's 2023 introduction to Ken's offensive identity and space control. No current frame or combo claim.",
};
const reveal = {
  title: "Capcom / PlayStation: Ken's SF6 toolkit",
  url: "https://blog.playstation.com/2022/09/15/street-fighter-6-new-world-tour-battle-hub-details-four-legendary-faces-join-the-roster/",
  supports:
    "Ken retains Hadoken, Shoryuken and Tatsumaki; Dragonlash, Sprint and Jinrai are named tools. Introductory, not current frame data.",
};
const confirm = {
  title: "Infil: Hit Confirm",
  url: "https://glossary.infil.net/?t=Hit%20Confirm",
  supports:
    "Deciding to continue after recognizing a hit; not every sequence is practically confirmable.",
};
const patch = {
  review: "conceptual" as const,
  basis:
    "Capcom 2022 toolkit reveal and 2023 guide; strategic drills are original proposals, not current-frame certification.",
};

export const kenLessons: Lesson[] = [
  {
    id: "ken-start-small",
    revision: 1,
    track: "ken",
    scope: "ken-classic",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["choose-your-range", "read-your-resources"],
    patch,
    sources: [guide, reveal],
    copy: {
      en: {
        title: "Build a small Ken game plan",
        summary: "Learn a few decisions before adding a long move list.",
        objective:
          "Prepare a range tool, an anti-air answer and one dependable conversion to test in SF6.",
        paragraphs: [
          "Capcom introduces Ken as an offensive character who also controls space with kicks. Treat that as a direction for learning, not an instruction to attack continuously. You still need to notice distance, the air and the opponent's response.",
          "Start your toolkit in the current character guide: pick one grounded attack whose reach you can recognize, one answer to a jump and one simple conversion from the game's combo trials. Write down what situation each is for. Add a tool only when a specific problem needs it.",
          "Hadoken, Shoryuken and Tatsumaki are part of Ken's named toolkit. FightPath offers separate motion exercises for those commands; a correct browser motion does not prove their spacing, anti-air timing or combo use in a match.",
        ],
        example:
          "An opponent keeps jumping while you focus on moving forward. For the next round, reduce your approach choices and watch the air. Use the response you tested in the current guide instead of adding another combo.",
        mistake:
          "Learning ten offensive options without knowing the range or purpose of any of them.",
        drill:
          "Open Ken's current character guide and combo trials with Classic selected. Choose the three tools described above. In training, test the grounded option at near and far range, the anti-air against one recorded jump, and the conversion on each side. Keep only what you can explain and reproduce.",
        check: {
          question: "When should you add another tool?",
          options: [
            "When a specific repeated problem needs it",
            "Whenever you lose one round",
            "Before testing your current choices",
          ],
          answer: 0,
          explanation:
            "A small plan is easier to observe and adapt. New options should solve an identified problem.",
        },
      },
      "pt-BR": {
        title: "Monte um plano simples com Ken",
        summary: "Aprenda algumas decisões antes de decorar uma lista enorme.",
        objective:
          "Preparar uma opção de alcance, um antiaéreo e uma conversão confiável para testar no SF6.",
        paragraphs: [
          "A Capcom apresenta Ken como um personagem ofensivo que também controla espaço com chutes. Use isso como direção de aprendizado, não como ordem para atacar sem parar. Você ainda precisa observar distância, o ar e a resposta adversária.",
          "Comece pelo guia atual do personagem: escolha um ataque no chão cujo alcance reconheça, uma resposta a salto e uma conversão simples dos desafios de combo do jogo. Defina a situação de cada um. Acrescente outra ferramenta quando houver um problema concreto.",
          "Hadoken, Shoryuken e Tatsumaki fazem parte das ferramentas de Ken. O FightPath tem exercícios separados desses comandos; acertar o movimento no navegador não comprova distância, timing antiaéreo ou combo numa partida.",
        ],
        example:
          "O adversário pula sempre que você se concentra em avançar. No próximo round, reduza suas opções de aproximação e observe o ar. Use a resposta testada no guia atual em vez de adicionar outro combo.",
        mistake:
          "Aprender dez opções ofensivas sem entender alcance ou função.",
        drill:
          "Abra o guia atual de Ken e os desafios de combo com Classic selecionado. Escolha as três ferramentas descritas. No treino, teste a opção no chão de perto e de longe, o antiaéreo contra um salto gravado e a conversão dos dois lados. Mantenha o que consegue explicar e reproduzir.",
        check: {
          question: "Quando acrescentar outra ferramenta?",
          options: [
            "Quando um problema repetido pedir isso",
            "Sempre que perder um round",
            "Antes de testar as opções atuais",
          ],
          answer: 0,
          explanation:
            "Um plano pequeno facilita observar e adaptar. Novas opções devem resolver um problema identificado.",
        },
      },
    },
  },
  {
    id: "ken-confirm-and-stop",
    revision: 1,
    track: "ken",
    scope: "ken-classic",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["ken-start-small", "timing-links-and-cancels"],
    patch,
    sources: [confirm, guide],
    copy: {
      en: {
        title: "Confirm, then choose whether to continue",
        summary: "A blocked starter needs a different decision from a hit.",
        objective: "Separate an observed hit from a rehearsed sequence.",
        paragraphs: [
          "A hit confirm means recognizing contact as a hit before choosing the continuation. A practiced sequence can still be the wrong choice on block. Do not assume you can react to every isolated starter; choose a confirm exercise appropriate to your current guide and ability.",
          "For Ken, start with one tested conversion rather than switching routes every attempt. Compare hit and block in training. If your continuation is unreliable or risky in that scenario, simplify it and learn where to stop.",
          "Near the corner, compare the position after the route with the resources it used. Getting another attack is not the only useful result. Keeping a position you understand can be a deliberate learning goal.",
        ],
        example:
          "Your hands finish the same sequence whether the first attack hits or is blocked. Slow the drill down: first identify the contact result without continuing, then add the tested continuation.",
        mistake:
          "Calling an automatic sequence a confirm even though you never looked at hit or block.",
        drill:
          "Use the current game's training settings to vary guard on your selected starter. First say hit or block without extending. Then try the appropriate continuation you verified in-game. Count correct decisions separately from dropped execution and repeat on the other side.",
        check: {
          question:
            "Your starter is blocked. What should guide the next action?",
          options: [
            "The sequence you always press",
            "The tested response for block and the current situation",
            "The longest combo you remember",
          ],
          answer: 1,
          explanation:
            "Confirmation connects the observed result to a decision; repetition alone does not.",
        },
      },
      "pt-BR": {
        title: "Confirme e decida se deve continuar",
        summary: "Um início defendido pede uma decisão diferente de um acerto.",
        objective: "Separar o acerto observado de uma sequência decorada.",
        paragraphs: [
          "Hit confirm significa reconhecer que acertou antes de escolher a continuação. Uma sequência treinada ainda pode ser a escolha errada na defesa. Não presuma que dá para reagir a qualquer golpe isolado; escolha um exercício adequado ao guia atual e à sua habilidade.",
          "Com Ken, comece por uma conversão testada em vez de trocar a rota a cada tentativa. Compare acerto e defesa no treino. Se a continuação falhar ou for arriscada nesse cenário, simplifique e aprenda onde parar.",
          "Perto do canto, compare a posição após a rota com os recursos gastos. Conseguir outro ataque não é o único resultado útil. Manter uma posição que você entende pode ser um objetivo deliberado.",
        ],
        example:
          "Suas mãos terminam a mesma sequência quando o primeiro ataque acerta ou é defendido. Simplifique: identifique primeiro o resultado sem continuar e só depois adicione a continuação testada.",
        mistake:
          "Chamar uma sequência automática de confirmação sem olhar acerto ou defesa.",
        drill:
          "Use as configurações atuais de treino para variar a defesa contra o início escolhido. Primeiro diga acerto ou defesa sem estender. Depois tente a continuação adequada que verificou no jogo. Conte decisões corretas separadamente de erros de execução e repita do outro lado.",
        check: {
          question:
            "Seu primeiro golpe foi defendido. O que deve orientar a próxima ação?",
          options: [
            "A sequência que você sempre aperta",
            "A resposta testada na defesa e a situação atual",
            "O maior combo que lembrar",
          ],
          answer: 1,
          explanation:
            "Confirmar liga o resultado observado à decisão; apenas repetir não faz isso.",
        },
      },
    },
  },
  {
    id: "ken-pressure-with-a-reason",
    revision: 1,
    track: "ken",
    scope: "ken-classic",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["ken-confirm-and-stop", "adapt-with-space"],
    patch,
    sources: [
      reveal,
      guide,
      {
        title: "Infil: Frame Advantage",
        url: "https://glossary.infil.net/?t=Frame%20Advantage",
        supports:
          "Recovery order matters; position and move choice still affect the next interaction.",
      },
    ],
    copy: {
      en: {
        title: "Pressure with a reason, then adapt",
        summary:
          "Run, Jinrai and Dragonlash are options to study, not permission to ignore defense.",
        objective:
          "Change one repeated offensive choice when the opponent has shown a response.",
        paragraphs: [
          "Ken's official introduction includes Sprint, Jinrai Kick and Dragonlash Kick. Learn them one at a time in the current character guide. This lesson does not claim that every strength, follow-up or spacing leaves you safe or gives you another turn.",
          "For each option, ask how you arrive, what happens on block and what the opponent repeatedly tries next. Test that exact situation. If you cannot explain a loss, remove a branch from your plan rather than pressing faster.",
          "An offensive identity still includes waiting, defending and giving up a turn. When your repeated approach is being stopped, observe the response and choose a tested alternative, a different range or a pause.",
        ],
        example:
          "You use the same approach three times and the opponent stops it the same way. The next learning goal is to recreate that response and test a change, not to insist that Ken must always advance.",
        mistake:
          "Treating one successful version of a move as proof that every follow-up is safe.",
        drill:
          "Choose one run, Jinrai or Dragonlash situation from the current guide. Record the opponent's response and test it on hit and block at the same distance. Note what is repeatable and what still needs verification. In a short match set, watch for that response before changing another part of your plan.",
        check: {
          question:
            "The same approach keeps getting stopped. What is a useful adjustment?",
          options: [
            "Repeat it faster without observing",
            "Recreate the response and test one change",
            "Assume every strength has the same outcome",
          ],
          answer: 1,
          explanation:
            "Adaptation starts with the actual response and consistent test conditions.",
        },
      },
      "pt-BR": {
        title: "Pressione com um motivo e adapte",
        summary: "Corrida, Jinrai e Dragonlash precisam de contexto.",
        objective:
          "Mudar uma escolha ofensiva repetida quando o adversário já mostrou uma resposta.",
        paragraphs: [
          "A apresentação oficial de Ken inclui Sprint, Jinrai Kick e Dragonlash Kick. Aprenda uma opção por vez no guia atual. Esta aula não afirma que toda força, continuação ou distância seja segura ou garanta outra vez de atacar.",
          "Para cada opção, pergunte como chega nela, o que acontece na defesa e o que o adversário tenta em seguida. Teste essa situação exata. Se não souber explicar a derrota, reduza uma ramificação do plano em vez de apertar mais rápido.",
          "Uma identidade ofensiva também inclui esperar, defender e encerrar a vez. Quando sua aproximação repetida é interrompida, observe a resposta e escolha uma alternativa testada, outra distância ou uma pausa.",
        ],
        example:
          "Você repete a mesma aproximação três vezes e recebe a mesma resposta. O próximo objetivo é reproduzir isso e testar uma mudança, não insistir que Ken deve sempre avançar.",
        mistake:
          "Tratar uma versão que funcionou como prova de que todas as continuações são seguras.",
        drill:
          "Escolha uma situação de corrida, Jinrai ou Dragonlash no guia atual. Grave a resposta adversária e teste acerto e defesa na mesma distância. Registre o que se repete e o que falta verificar. Num set curto, observe essa resposta antes de mudar outra parte do plano.",
        check: {
          question:
            "A mesma aproximação é sempre interrompida. Qual ajuste é útil?",
          options: [
            "Repetir mais rápido sem observar",
            "Reproduzir a resposta e testar uma mudança",
            "Presumir que todas as forças têm o mesmo resultado",
          ],
          answer: 1,
          explanation:
            "Adaptar começa pela resposta real e por condições consistentes de teste.",
        },
      },
    },
  },
];
