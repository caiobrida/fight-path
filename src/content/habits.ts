import type { Lesson } from "./learning";

const sources = [
  {
    title: "Infil: Mental Stack",
    url: "https://glossary.infil.net/?t=Mental%20Stack",
    supports:
      "Limited attention shared across threats; session templates below are original teaching proposals.",
  },
  {
    title: "Infil: Hit Confirm",
    url: "https://glossary.infil.net/?t=Hit%20Confirm",
    supports: "Recognizing a hit before choosing a continuation.",
  },
];

export const habitLessons: Lesson[] = [
  {
    id: "one-goal-per-session",
    revision: 1,
    track: "habits",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["hit-block-and-your-turn"],
    sources,
    copy: {
      en: {
        title: "Give your session one job",
        summary:
          "A clear observation is more useful than an unfocused win target.",
        objective:
          "Choose a cue, a response and a way to evaluate a short session.",
        paragraphs: [
          "Watching every possible threat divides your attention. Start with one recurring problem and describe when it happens. 'I lose to jumps after backing away' gives you a cue; 'I am bad at neutral' does not.",
          "Choose one response you can test. Begin with focused repetition under stable conditions, then vary one condition and finally look for the cue in matches. Keep decision errors separate from execution drops.",
          "Use a short template: observe the problem, choose a drill, try it, describe what changed and reassess. You choose the duration and repetition count. A useful session can reveal that your proposed response is wrong; it does not have to produce a win.",
        ],
        example:
          "With Ken, you want to improve your range choice. Pick one grounded option from the current guide, test where it reaches, then watch that distance in a short set instead of adding three new approaches.",
        mistake:
          "Changing characters, route and goal after every loss, making it impossible to compare results.",
        drill:
          "Before playing, state one cue and one response. Practice the response slowly, then vary one relevant condition. After a short set, ask: did I notice the cue, choose the response and execute it? Choose the next drill from the first step that failed.",
        check: {
          question:
            "You noticed the cue but dropped the response. What should you isolate next?",
          options: [
            "The execution under the same conditions",
            "Every possible match-up",
            "Only your win rate",
          ],
          answer: 0,
          explanation:
            "Recognizing, choosing and executing are different steps. Practice the one that actually failed.",
        },
      },
      "pt-BR": {
        title: "Dê uma função à sua sessão",
        summary:
          "Uma observação clara ajuda mais que uma meta vaga de vitórias.",
        objective:
          "Escolher um sinal, uma resposta e uma forma de avaliar a sessão.",
        paragraphs: [
          "Observar todas as ameaças divide sua atenção. Comece por um problema recorrente e descreva quando acontece. 'Perco para saltos depois de recuar' dá um sinal concreto; 'sou ruim no neutral' não.",
          "Escolha uma resposta que possa testar. Comece repetindo em condições estáveis, varie uma condição e depois procure o sinal nas partidas. Separe erros de decisão de falhas de execução.",
          "Use um roteiro curto: observe o problema, escolha um exercício, tente, descreva o que mudou e reavalie. Você decide duração e repetições. Uma sessão útil pode mostrar que a resposta proposta estava errada; não precisa terminar em vitória.",
        ],
        example:
          "Com Ken, você quer melhorar a escolha de distância. Escolha uma opção no chão no guia atual, teste onde alcança e observe essa distância num set curto em vez de adicionar três aproximações.",
        mistake:
          "Trocar personagem, rota e objetivo após cada derrota, impedindo a comparação.",
        drill:
          "Antes de jogar, defina um sinal e uma resposta. Treine devagar e depois varie uma condição relevante. Após um set curto, pergunte: percebi o sinal, escolhi a resposta e executei? Defina o próximo treino pela primeira etapa que falhou.",
        check: {
          question:
            "Você percebeu o sinal, mas errou o comando. O que isolar agora?",
          options: [
            "A execução nas mesmas condições",
            "Todos os confrontos possíveis",
            "Só sua taxa de vitórias",
          ],
          answer: 0,
          explanation:
            "Reconhecer, escolher e executar são etapas diferentes. Treine a que realmente falhou.",
        },
      },
    },
  },
  {
    id: "review-one-round",
    revision: 1,
    track: "habits",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: ["one-goal-per-session", "adapt-with-space"],
    sources,
    copy: {
      en: {
        title: "Review a round and test one change",
        summary: "Turn a repeated habit into a specific experiment.",
        objective:
          "Describe an exchange without judging the player, then test a response.",
        paragraphs: [
          "Pause a replay at a repeated situation. Describe distance, resources, the last action and what each player did next. Separate what you can see from your guess about intent. 'I pressed after this blocked attack' is testable; 'I always panic' is not a useful training setup.",
          "Recreate the situation and try one change. Compare an aggressive response with defending or waiting under the same conditions. Neither aggression nor patience is always correct; the observed interaction matters.",
          "For a Ken session, one experiment could compare continuing your selected sequence on hit with stopping on block. Another could test the range from your game plan. Keep private notes optional and on your own device; this lesson does not collect replay files or personal reflections.",
        ],
        example:
          "You repeatedly lose after a blocked starter. Check whether you recognized the block before continuing. Test stopping first, then compare the deliberate response verified in the current game.",
        mistake:
          "Turning one replay into a permanent judgment about your ability or the opponent.",
        drill:
          "Review one round. Choose one exchange, describe its visible conditions and propose one response. Recreate it in training. Try it in the next set, then ask whether the original cue still appeared. Keep, change or discard the hypothesis based on what happened.",
        check: {
          question: "What is a useful replay note?",
          options: [
            "I will never improve",
            "At this range, after this blocked attack, I kept pressing; test waiting",
            "The opponent always knows everything",
          ],
          answer: 1,
          explanation:
            "A visible situation and a testable change lead directly to a drill.",
        },
      },
      "pt-BR": {
        title: "Reveja um round e teste uma mudança",
        summary: "Transforme um hábito repetido num experimento concreto.",
        objective:
          "Descrever uma troca sem julgar a pessoa e testar uma resposta.",
        paragraphs: [
          "Pause um replay numa situação repetida. Descreva distância, recursos, última ação e o que cada pessoa fez depois. Separe o que vê da intenção que imagina. 'Apertei depois deste ataque defendido' pode ser testado; 'sempre entro em pânico' não define um treino útil.",
          "Reproduza a situação e tente uma mudança. Compare uma resposta agressiva com defender ou esperar nas mesmas condições. Nem agressividade nem paciência estão sempre certas; a interação observada importa.",
          "Numa sessão com Ken, compare continuar sua sequência escolhida no acerto com parar na defesa. Outra experiência pode testar a distância do seu plano. Anotações pessoais são opcionais e ficam no seu dispositivo; esta aula não coleta replays nem reflexões pessoais.",
        ],
        example:
          "Você perde sempre depois de um início defendido. Confira se reconheceu a defesa antes de continuar. Teste parar e depois compare a resposta deliberada verificada no jogo atual.",
        mistake:
          "Transformar um replay num julgamento permanente sobre sua habilidade ou sobre o adversário.",
        drill:
          "Reveja um round. Escolha uma troca, descreva condições visíveis e proponha uma resposta. Reproduza no treino. Experimente no próximo set e confira se o sinal original ainda aparece. Mantenha, mude ou descarte a hipótese conforme o resultado.",
        check: {
          question: "Qual anotação de replay ajuda no treino?",
          options: [
            "Nunca vou melhorar",
            "Nesta distância, após este ataque defendido, continuei apertando; testar esperar",
            "O adversário sempre sabe tudo",
          ],
          answer: 1,
          explanation:
            "Uma situação visível e uma mudança testável levam diretamente a um exercício.",
        },
      },
    },
  },
];
