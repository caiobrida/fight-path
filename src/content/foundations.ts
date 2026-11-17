import type { Lesson } from "./learning";

export const foundationsLessons: Lesson[] = [
  {
    id: "hit-block-and-your-turn",
    revision: 1,
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["read-an-input"],
    sources: [
      {
        title: "Infil: Block Stun",
        url: "https://glossary.infil.net/?t=Block%20Stun",
        supports:
          "Block stun temporarily limits ordinary actions; exceptions depend on the game.",
      },
      {
        title: "Infil: Frame Advantage",
        url: "https://glossary.infil.net/?t=Frame%20Advantage",
        supports:
          "Who recovers first determines the timing advantage after contact.",
      },
    ],
    copy: {
      en: {
        title: "Hit, block and your turn",
        summary: "Recognize what happened before deciding to attack again.",
        objective:
          "Distinguish a hit from a blocked attack and notice when your character is still recovering.",
        paragraphs: [
          "An attack connecting with a defender can produce a hit or a block. The animations and sounds give information about the result. Start by noticing that result rather than immediately entering the next action.",
          "After blocking, a character spends time in block stun. After attacking, the attacker may still be recovering. Who can act first matters: a blocked move does not automatically give the defender a guaranteed punish. Distance and the next attack's speed also matter.",
          "Blocking does not answer every threat. Throws and other defensive rules vary by game. Learn the selected game's defensive tutorial and check the recorded situation instead of applying one rule everywhere.",
        ],
        example:
          "Record the dummy attacking once and then blocking. Defend the first attack, then try a quick response. If your response is blocked, that is different from a guaranteed punish; if you are hit, review your timing and the dummy recording.",
        mistake:
          "Pressing repeatedly while still defending and assuming a lost exchange means the controller failed.",
        drill:
          "In SF6 training mode, use one recorded attack followed by guard. Watch the hit/block feedback and frame meter. Compare a response that reaches with one that falls short. The exercise is observation, not a requirement to win a match.",
        check: {
          question: "Does blocking any move guarantee a punish?",
          options: [
            "Yes, always",
            "No; recovery, speed and range matter",
            "Only if you press every button",
          ],
          answer: 1,
          explanation:
            "Blocking gives information, but a punish requires an action that reaches before the opponent can defend.",
        },
      },
      "pt-BR": {
        title: "Acerto, defesa e sua vez",
        summary: "Reconheça o resultado antes de decidir atacar de novo.",
        objective:
          "Distinguir acerto de bloqueio e perceber quando seu personagem ainda está se recuperando.",
        paragraphs: [
          "Um ataque que encontra o defensor pode acertar ou ser bloqueado. Animações e sons ajudam a reconhecer o resultado. Comece observando esse resultado em vez de digitar imediatamente a próxima ação.",
          "Depois de bloquear, o personagem passa por uma recuperação de defesa, o block stun. Quem atacou também pode estar em recuperação. Quem age primeiro importa: bloquear um golpe não garante automaticamente uma punição. A distância e a velocidade do próximo ataque também contam.",
          "Defender não responde a toda ameaça. Agarrões e outras regras defensivas variam entre jogos. Consulte o tutorial do jogo escolhido e teste a situação, sem aplicar uma regra única a todos.",
        ],
        example:
          "Grave o boneco atacando uma vez e depois defendendo. Bloqueie e tente responder com um ataque rápido. Se a resposta for defendida, isso é diferente de uma punição garantida; se você for atingido, reveja o tempo e a gravação.",
        mistake:
          "Apertar repetidamente durante a defesa e presumir que uma troca perdida significa falha do controle.",
        drill:
          "No treino do SF6, use uma gravação de ataque seguido de defesa. Observe o feedback de acerto/bloqueio e o medidor de frames. Compare uma resposta que alcança com outra que fica curta. O objetivo é observar, não vencer uma partida.",
        check: {
          question: "Bloquear qualquer golpe garante uma punição?",
          options: [
            "Sim, sempre",
            "Não; recuperação, velocidade e alcance importam",
            "Só apertando todos os botões",
          ],
          answer: 1,
          explanation:
            "A defesa traz informação, mas a punição exige alcançar o adversário antes que ele possa se defender.",
        },
      },
    },
  },
  {
    id: "timing-links-and-cancels",
    revision: 1,
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["hit-block-and-your-turn"],
    sources: [
      {
        title: "Infil: Cancel",
        url: "https://glossary.infil.net/?t=Cancel",
        supports: "Canceling replaces recovery with another permitted action.",
      },
      {
        title: "Infil: Link",
        url: "https://glossary.infil.net/?t=Link",
        supports:
          "A link starts the next action after recovery rather than interrupting it.",
      },
    ],
    copy: {
      en: {
        title: "Timing: links and cancels",
        summary:
          "Two sequences can look similar and require different rhythms.",
        objective:
          "Explain why waiting and canceling are different ways to connect actions.",
        paragraphs: [
          "A move takes time to begin, make contact and recover. Learning a sequence means understanding when the next input belongs, not just remembering its buttons.",
          "A cancel transitions from one action into another before the first action's recovery finishes, when the game permits it. A link waits for the earlier action to recover and starts the next move in time. The notation alone is not proof that a route will work with any strength, spacing or hit state.",
          "Practice short segments. Watch one transition, repeat it, then add the next part. The browser motion exercises train directional input; they cannot check SF6 hit stun, cancels or whether a combo connected.",
        ],
        example:
          "If a sequence asks for a special cancel, waiting for the entire normal animation may be too late. If it asks for a link, entering the next attack before recovery may fail. Identify the transition before trying to go faster.",
        mistake:
          "Repeating the full sequence faster every time without finding which transition failed.",
        drill:
          "Open an in-game character combo trial. Use its demonstration and input display. Isolate the first transition, compare its rhythm to the example, then add one move. Record the exact trial and game version when sharing your result.",
        check: {
          question: "What distinguishes a link from a cancel?",
          options: [
            "A link always uses a kick",
            "A link waits for recovery; a cancel interrupts permitted recovery",
            "A cancel is just pressing harder",
          ],
          answer: 1,
          explanation:
            "The relationship between the first move's recovery and the next action determines the transition.",
        },
      },
      "pt-BR": {
        title: "Ritmo: links e cancelamentos",
        summary: "Sequências parecidas podem exigir ritmos diferentes.",
        objective:
          "Explicar por que esperar e cancelar são formas diferentes de conectar ações.",
        paragraphs: [
          "Um golpe leva tempo para começar, fazer contato e se recuperar. Aprender uma sequência significa entender quando o próximo input entra, além de memorizar os botões.",
          "Um cancelamento permite passar de uma ação para outra antes de terminar sua recuperação, quando o jogo autoriza. Um link espera a ação anterior se recuperar e inicia o próximo golpe a tempo. A notação sozinha não garante que a rota funciona com qualquer força, distância ou estado de acerto.",
          "Pratique trechos curtos. Observe uma transição, repita e só depois acrescente a próxima parte. Os exercícios do navegador treinam o movimento direcional; não verificam hit stun, cancelamentos nem se um combo conectou no SF6.",
        ],
        example:
          "Se a sequência pede cancelamento em especial, esperar toda a animação do normal pode atrasar o input. Se pede um link, apertar antes de terminar a recuperação pode falhar. Identifique a transição antes de acelerar.",
        mistake:
          "Repetir a sequência inteira cada vez mais rápido sem identificar qual transição falhou.",
        drill:
          "Abra um desafio de combo do personagem dentro do jogo. Observe a demonstração e os inputs. Isole a primeira transição, compare o ritmo e acrescente um golpe. Registre o desafio e a versão do jogo ao compartilhar o resultado.",
        check: {
          question: "Qual é a diferença entre link e cancelamento?",
          options: [
            "Link sempre usa chute",
            "Link espera a recuperação; cancelamento interrompe uma recuperação permitida",
            "Cancelar é apertar com mais força",
          ],
          answer: 1,
          explanation:
            "A relação entre a recuperação do primeiro golpe e o início da próxima ação define a transição.",
        },
      },
    },
  },
  {
    id: "watch-the-air",
    revision: 1,
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["hit-block-and-your-turn"],
    sources: [
      {
        title: "Infil: Anti-Air",
        url: "https://glossary.infil.net/?t=Anti-Air",
        supports: "An anti-air intercepts a jumping opponent from the ground.",
      },
      {
        title: "Infil: Jump",
        url: "https://glossary.infil.net/?t=Jump",
        supports:
          "Jump direction and landing situation affect the approach; air-block rules differ between games.",
      },
    ],
    copy: {
      en: {
        title: "Watch the air without forgetting the ground",
        summary: "Recognize a jump and choose a response at the right range.",
        objective:
          "Identify an anti-air opportunity and test a grounded response.",
        paragraphs: [
          "An anti-air meets an opponent's jump while you stay grounded. Its usefulness depends on the jump angle, distance and timing. An upward-looking move is a candidate to test, not a guarantee against every jump.",
          "Give yourself one observation task. Notice where the jump begins and whether it lands in front of you or passes over. If you commit late or use a move that cannot reach, inspect that choice before blaming execution.",
          "A jump can still be useful when its risk fits the situation. Repeated predictable jumps make the opponent's decision easier. Air defense rules vary across games, so keep this idea separate from any one game's exact defensive options.",
        ],
        example:
          "A far jump lands outside your attack's reach. Swinging at it may create an opening for the opponent. At a closer distance, your tested response may intercept the same jump.",
        mistake:
          "Using the same response from every distance or staring only at the sky while the opponent walks into throw range.",
        drill:
          "Record a jump followed by an attack in SF6 training. Test a grounded response at three starting distances. Then mix a walking recording with the jump recording. Note which cue you watched and which response actually reached.",
        check: {
          question: "Why might the same anti-air fail at another distance?",
          options: [
            "Anti-airs ignore spacing",
            "Jump angle, reach and timing changed",
            "You must always jump too",
          ],
          answer: 1,
          explanation:
            "The opportunity depends on the path of the jump and the space your response covers.",
        },
      },
      "pt-BR": {
        title: "Olhe o céu sem esquecer o chão",
        summary: "Reconheça o pulo e escolha uma resposta na distância certa.",
        objective:
          "Identificar uma oportunidade de antiaéreo e testar uma resposta no chão.",
        paragraphs: [
          "Um antiaéreo intercepta o pulo adversário enquanto você permanece no chão. Ele depende do ângulo, da distância e do momento. Um golpe voltado para cima é uma opção para testar, não uma garantia contra todo pulo.",
          "Escolha uma observação por vez. Perceba de onde o pulo começou e se ele cai na sua frente ou passa por cima. Se a resposta sair tarde ou não alcançar, reveja essa escolha antes de culpar a execução.",
          "Pular ainda pode ser útil quando o risco faz sentido. Pulos repetidos e previsíveis facilitam a decisão adversária. As regras de defesa aérea variam; separe essa ideia das opções exatas de cada jogo.",
        ],
        example:
          "Um pulo distante cai fora do alcance do seu golpe. Atacar sem necessidade pode abrir uma oportunidade para o oponente. Mais perto, a resposta que você testou pode interceptar o mesmo pulo.",
        mistake:
          "Usar a mesma resposta em qualquer distância ou olhar só para o céu enquanto o adversário anda até a distância de agarrão.",
        drill:
          "Grave pulo seguido de ataque no treino do SF6. Teste uma resposta no chão em três distâncias. Depois misture uma gravação de caminhada com a de pulo. Anote qual sinal observou e qual resposta realmente alcançou.",
        check: {
          question: "Por que o mesmo antiaéreo pode falhar em outra distância?",
          options: [
            "Antiaéreos ignoram espaçamento",
            "Ângulo, alcance e tempo mudaram",
            "Você sempre precisa pular também",
          ],
          answer: 1,
          explanation:
            "A oportunidade depende da trajetória do pulo e do espaço coberto pela sua resposta.",
        },
      },
    },
  },
];
