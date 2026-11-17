import type { Lesson } from "./learning";

export const footsiesLessons: Lesson[] = [
  {
    id: "choose-your-range",
    revision: 1,
    level: "beginner",
    track: "footsies",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["hit-block-and-your-turn"],
    sources: [
      {
        title: "Infil: Footsies",
        url: "https://glossary.infil.net/?t=Footsies",
        supports: "Contesting space and choosing favorable ranges.",
      },
      {
        title: "Infil: Neutral",
        url: "https://glossary.infil.net/?t=Neutral",
        supports:
          "Distinguishes neutral positioning from active hit/block pressure.",
      },
    ],
    copy: {
      en: {
        title: "Choose a range for a reason",
        summary:
          "Neutral is a decision problem, not just waiting outside attack range.",
        objective:
          "Name a tool you want to use and a range where it can matter.",
        paragraphs: [
          "In neutral, neither player is currently being hit or forced to block. Both are trying to create a useful opening. Footsies describes the contest over space and options; it is broader than walking back and forth.",
          "Start with one grounded attack. Discover where it reaches and where it misses. Then watch what the opponent can do at the same range. A comfortable distance depends on both toolkits, not just the size of your own attack.",
          "Movement changes the question. A small retreat can make an attack miss; a step forward can bring your tool into range. An approach also carries risk. Choose a reason to move rather than switching directions without a plan.",
        ],
        example:
          "You stand just outside the range of a recorded poke. A small step changes whether it touches you. Compare that boundary with the reach of your own chosen attack.",
        mistake:
          "Calling every moment outside close range neutral, or assuming that the character with the longest button wins every interaction.",
        drill:
          "Set a stationary dummy in SF6 training. Mark a starting distance where your selected normal just misses, then one where it connects. Add a recorded opponent poke. Observe how one step changes each player's options.",
        check: {
          question: "What makes a range useful?",
          options: [
            "It looks far from the opponent",
            "It supports your plan while accounting for the opponent's options",
            "It guarantees the longest attack always wins",
          ],
          answer: 1,
          explanation:
            "Range matters because of the available actions, their risk and the timing of the exchange.",
        },
      },
      "pt-BR": {
        title: "Escolha uma distância por um motivo",
        summary:
          "Neutral é um problema de decisão, além de esperar fora do alcance.",
        objective:
          "Escolher uma ferramenta e explicar em qual distância ela pode ser útil.",
        paragraphs: [
          "No neutral, nenhum jogador está sendo atingido ou obrigado a defender naquele momento. Os dois procuram uma abertura. Footsies descreve a disputa por espaço e opções; é mais amplo do que andar para frente e para trás.",
          "Comece com um ataque no chão. Descubra onde ele alcança e onde passa no vazio. Depois observe o que o adversário consegue fazer na mesma distância. A distância confortável depende das duas caixas de ferramentas, não apenas do tamanho do seu golpe.",
          "Mover muda a situação. Um recuo curto pode fazer um ataque errar; um passo à frente pode colocar sua ferramenta no alcance. Aproximar também tem risco. Tenha um motivo para se mover, em vez de alternar direções sem plano.",
        ],
        example:
          "Você fica logo fora do alcance de um poke gravado. Um passo muda se ele encosta. Compare esse limite com o alcance do seu próprio ataque escolhido.",
        mistake:
          "Chamar qualquer momento longe de neutral ou presumir que o personagem com o botão mais longo vence toda troca.",
        drill:
          "No treino do SF6, deixe o boneco parado. Encontre uma distância em que seu normal quase alcança e outra em que acerta. Acrescente uma gravação de poke adversário. Observe como um passo muda as opções dos dois.",
        check: {
          question: "O que torna uma distância útil?",
          options: [
            "Parecer longe do adversário",
            "Favorecer seu plano considerando as opções adversárias",
            "Garantir que o golpe mais longo sempre vence",
          ],
          answer: 1,
          explanation:
            "A distância importa pelas ações disponíveis, seus riscos e o tempo da troca.",
        },
      },
    },
  },
  {
    id: "punish-the-whiff",
    revision: 1,
    level: "beginner",
    track: "footsies",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["choose-your-range"],
    sources: [
      {
        title: "Infil: Whiff Punish",
        url: "https://glossary.infil.net/?t=Whiff%20Punish",
        supports: "Attacking the recovery of a missed attack.",
      },
    ],
    copy: {
      en: {
        title: "Make a miss matter",
        summary:
          "A whiff is information. A punish still needs reach and timing.",
        objective:
          "Distinguish reacting to a missed attack from guessing a button at the same time.",
        paragraphs: [
          "A whiff is an attack that misses. A whiff punish targets the opponent during the recovery of that missed action. Being outside the attack is only the first part; your response still has to reach in time.",
          "Start with a predictable recording so you can recognize the animation. Once you understand the distance and response, vary the timing. If you always press at a memorized moment, you may be rehearsing a prediction rather than recognizing a miss.",
          "Use a small, dependable response first. The purpose of the drill is to identify an opening and reach it. A longer conversion can come later, after you know which starter actually connected.",
        ],
        example:
          "A dummy's attack misses in front of you. Your first response is too short, so it also whiffs. Move the starting position or choose another tested tool before increasing the combo length.",
        mistake:
          "Trying to punish every animation from too far away, then adding more inputs when the real problem is reach.",
        drill:
          "Record one grounded poke and recovery. Begin outside its reach, find a response that connects during recovery, then add a second recording that does nothing. Your job is to respond to the missed attack without swinging at the empty recording.",
        check: {
          question:
            "Your response starts quickly but misses. What should you inspect first?",
          options: [
            "Whether your response reaches from that distance",
            "Whether pressing more buttons fixes it",
            "Whether the opponent is required to attack again",
          ],
          answer: 0,
          explanation:
            "A fast response cannot punish if it never reaches the opponent.",
        },
      },
      "pt-BR": {
        title: "Faça o golpe no vazio importar",
        summary: "Um whiff traz informação. Punir ainda exige alcance e tempo.",
        objective:
          "Distinguir reação a um ataque que errou de um chute de botão ao mesmo tempo.",
        paragraphs: [
          "Whiff é um ataque que passa no vazio. Whiff punish procura atingir a recuperação desse ataque perdido. Ficar fora do alcance é só a primeira parte; sua resposta ainda precisa alcançar a tempo.",
          "Comece com uma gravação previsível para reconhecer a animação. Depois de entender distância e resposta, varie o momento. Se você sempre aperta em um instante decorado, pode estar treinando uma previsão, em vez de reconhecer o erro.",
          "Use primeiro uma resposta curta e confiável. O objetivo é identificar a abertura e alcançá-la. Uma conversão maior vem depois, quando você souber qual ataque inicial realmente conectou.",
        ],
        example:
          "O ataque do boneco passa na sua frente. Sua primeira resposta é curta demais e também erra. Ajuste a posição inicial ou escolha outra ferramenta testada antes de aumentar o combo.",
        mistake:
          "Tentar punir qualquer animação de muito longe e acrescentar inputs quando o problema é alcance.",
        drill:
          "Grave um poke no chão e sua recuperação. Comece fora do alcance, encontre uma resposta que acerte a recuperação e acrescente uma segunda gravação sem ataque. Responda ao golpe perdido sem atacar a gravação vazia.",
        check: {
          question:
            "Sua resposta sai rápido, mas não alcança. O que verificar primeiro?",
          options: [
            "Se ela alcança naquela distância",
            "Se apertar mais botões resolve",
            "Se o adversário é obrigado a atacar de novo",
          ],
          answer: 0,
          explanation:
            "Uma resposta rápida não pune se nunca alcança o adversário.",
        },
      },
    },
  },
  {
    id: "adapt-with-space",
    revision: 1,
    level: "beginner",
    track: "footsies",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["choose-your-range", "watch-the-air"],
    sources: [
      {
        title: "Infil: Footsies",
        url: "https://glossary.infil.net/?t=Footsies",
        supports: "Spatial options are part of the interaction.",
      },
      {
        title: "Infil: Mental Stack",
        url: "https://glossary.infil.net/?t=Mental%20Stack",
        supports: "Attention is divided across the options being watched.",
      },
    ],
    copy: {
      en: {
        title: "Adapt without surrendering your plan",
        summary: "Notice a repeated choice, choose a response and reassess.",
        objective:
          "Use one observation to adjust your next decision instead of trying to watch everything.",
        paragraphs: [
          "A plan becomes useful when you compare it with what the opponent actually does. Watch one recurring choice: a jump after a retreat, a poke at a specific range, or a dash after a pause. Treat it as an observation to test, not a permanent rule about that player.",
          "Every retreat changes the available space. If a movement choice keeps putting you near the edge, consider what it costs alongside the attack you avoided. Position and immediate damage are different parts of the same decision.",
          "Your attention is limited. Give yourself a primary threat to watch and a simple secondary response. If the opponent changes behavior, update the plan. Improvement can mean noticing the change earlier, even if that round is lost.",
        ],
        example:
          "You notice two jumps from the same distance. Prepare your tested anti-air while keeping your ground position in mind. If the opponent walks instead, return to your range plan rather than forcing the anti-air input.",
        mistake:
          "Turning a short pattern into certainty and committing to a response after the situation has changed.",
        drill:
          "Review a short replay segment. Write one observation, one response to test and one cost of that response. Try it in training, then use the next set to see whether the original cue still appears.",
        check: {
          question:
            "The opponent stops doing the option you prepared for. What now?",
          options: [
            "Keep forcing the same response",
            "Return to your plan and collect new information",
            "Assume the controller changed",
          ],
          answer: 1,
          explanation:
            "A prepared response is useful only while its cue and conditions still apply.",
        },
      },
      "pt-BR": {
        title: "Adapte sem abandonar seu plano",
        summary: "Observe uma escolha repetida, teste uma resposta e reavalie.",
        objective:
          "Usar uma observação para ajustar a próxima decisão, em vez de tentar olhar tudo.",
        paragraphs: [
          "Um plano fica útil quando você o compara com o que o adversário faz. Observe uma escolha recorrente: pular depois de recuar, usar um poke em certa distância ou avançar depois de uma pausa. É uma observação para testar, não uma regra permanente sobre a pessoa.",
          "Cada recuo muda o espaço disponível. Se uma escolha de movimento sempre deixa você perto da borda, considere esse custo junto do ataque evitado. Posição e dano imediato são partes diferentes da mesma decisão.",
          "Sua atenção é limitada. Escolha uma ameaça principal para observar e uma resposta secundária simples. Se o adversário mudar, atualize o plano. Evoluir pode significar perceber essa mudança mais cedo, mesmo perdendo o round.",
        ],
        example:
          "Você observa dois pulos da mesma distância. Prepare seu antiaéreo testado sem esquecer a posição no chão. Se o adversário andar, volte ao plano de distância em vez de forçar o input do antiaéreo.",
        mistake:
          "Transformar um padrão curto em certeza e insistir na resposta depois que a situação mudou.",
        drill:
          "Reveja um trecho curto de replay. Escreva uma observação, uma resposta para testar e um custo dessa resposta. Experimente no treino e use a próxima série para ver se o sinal ainda aparece.",
        check: {
          question:
            "O adversário parou de usar a opção que você esperava. E agora?",
          options: [
            "Forçar a mesma resposta",
            "Voltar ao plano e coletar novas informações",
            "Presumir que o controle mudou",
          ],
          answer: 1,
          explanation:
            "Uma resposta preparada só é útil enquanto o sinal e as condições continuam presentes.",
        },
      },
    },
  },
];
