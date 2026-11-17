import type { Locale } from "@/i18n/dictionaries";

export type LessonCopy = {
  title: string;
  summary: string;
  objective: string;
  paragraphs: string[];
  example: string;
  mistake: string;
  drill: string;
  check: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
};

export type Lesson = {
  id: string;
  revision: number;
  level: "beginner" | "intermediate";
  track: "foundations" | "footsies" | "sf6" | "ken" | "habits";
  scope: "universal" | "sf6" | "ken-classic";
  status: "draft" | "published";
  reviewed: string;
  patch?: {
    review: "conceptual" | "verified" | "pending";
    basis: string;
    build?: string;
  };
  prerequisites: string[];
  sources: { title: string; url: string; supports: string }[];
  copy: Record<Locale, LessonCopy>;
};

export const trackNames = {
  en: {
    foundations: "First fundamentals",
    footsies: "Neutral and footsies",
    sf6: "Street Fighter 6 systems",
    ken: "Playing Ken Classic",
    habits: "Practice with a purpose",
  },
  "pt-BR": {
    foundations: "Primeiros fundamentos",
    footsies: "Neutral e footsies",
    sf6: "Sistemas de Street Fighter 6",
    ken: "Como jogar de Ken Classic",
    habits: "Treine com um objetivo",
  },
};

export const baseLessons: Lesson[] = [
  {
    id: "read-an-input",
    revision: 1,
    level: "beginner",
    track: "foundations",
    scope: "universal",
    status: "published",
    reviewed: "2026-11-17",
    prerequisites: [],
    sources: [
      {
        title: "Capcom: Ken command list",
        url: "https://www.streetfighter.com/6/character/ken/movelist",
        supports:
          "Direction and attack symbols for the three previously verified Classic commands; FightPath notation is explained independently.",
      },
    ],
    copy: {
      en: {
        title: "Read your first input",
        summary:
          "Understand directions, attacks and facing before chasing speed.",
        objective:
          "Read a direction sequence and match its logical attacks to your physical buttons.",
        paragraphs: [
          "An input is a direction or button action you send to a game. A physical controller button and an action such as light punch are different: your layout connects them.",
          "FightPath displays directions in order, followed by the allowed attack. Down, down-forward, forward plus punch is a motion exercise. Turning to face left mirrors the horizontal directions, not the order of the instruction.",
          "LP / MP / HP stand for light, medium and heavy punch. LK / MK / HK are the corresponding kicks. When a lesson lists several attacks separated by a slash, choose one; it does not ask you to press all of them.",
        ],
        example:
          "For ↓ ↘ → + LP, finish the shown direction sequence and press the button mapped to LP. If your character faces left, follow ↓ ↙ ← instead.",
        mistake:
          "Trying to infer LP from the button's physical position before checking your mapping.",
        drill:
          "Open control setup. Press each of your six attacks once and say its logical label. Then practice the first motion slowly on each facing side.",
        check: {
          question: "What changes when you switch facing side?",
          options: [
            "Punch becomes kick",
            "Left and right directions are mirrored",
            "The sequence is read backwards",
          ],
          answer: 1,
          explanation:
            "Facing changes forward and back. The sequence order and attack label stay the same.",
        },
      },
      "pt-BR": {
        title: "Leia seu primeiro input",
        summary: "Entenda direções, ataques e lado antes de buscar velocidade.",
        objective:
          "Ler uma sequência direcional e associar ataques lógicos aos seus botões físicos.",
        paragraphs: [
          "Um input é uma direção ou ação de botão enviada ao jogo. O botão físico do controle e uma ação como soco leve são coisas diferentes: o mapeamento faz essa ligação.",
          "O FightPath mostra as direções em ordem e depois o ataque aceito. Baixo, baixo-frente, frente e soco formam um exercício de movimento. Ao virar para a esquerda, as direções horizontais se invertem; a ordem da instrução continua a mesma.",
          "LP / MP / HP significam soco leve, médio e forte. LK / MK / HK são os chutes correspondentes. Quando vários ataques aparecem separados por uma barra, escolha um deles; não é necessário apertar todos.",
        ],
        example:
          "Em ↓ ↘ → + LP, conclua as direções e pressione o botão associado a LP. Se estiver virado para a esquerda, siga ↓ ↙ ←.",
        mistake:
          "Tentar adivinhar qual botão é LP pela posição física, antes de conferir o mapeamento.",
        drill:
          "Abra a configuração. Pressione cada um dos seis ataques e diga o nome lógico. Depois pratique o primeiro movimento devagar dos dois lados.",
        check: {
          question: "O que muda quando você troca o lado?",
          options: [
            "Soco vira chute",
            "As direções esquerda e direita se invertem",
            "A sequência é lida de trás para frente",
          ],
          answer: 1,
          explanation:
            "O lado muda frente e trás. A ordem e o ataque indicado continuam iguais.",
        },
      },
    },
  },
];

export function validateLessons(lessons: readonly Lesson[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const lesson of lessons) {
    if (ids.has(lesson.id) || !/^[a-z0-9-]+$/.test(lesson.id))
      errors.push(`Invalid lesson ID: ${lesson.id}`);
    ids.add(lesson.id);
    if (lesson.status !== "published") continue;
    if (!lesson.sources.length || !lesson.reviewed || lesson.revision < 1)
      errors.push(`Missing review: ${lesson.id}`);
    if (lesson.level !== "beginner" && lesson.level !== "intermediate")
      errors.push(`Invalid level: ${lesson.id}`);
    if (lesson.patch?.review === "verified" && !lesson.patch.build)
      errors.push(`Missing verified build: ${lesson.id}`);
    if (lesson.copy.en?.check.answer !== lesson.copy["pt-BR"]?.check.answer)
      errors.push(`Mismatched answer translation: ${lesson.id}`);
    for (const source of lesson.sources)
      if (!source.url.startsWith("https://") || !source.supports)
        errors.push(`Invalid source: ${lesson.id}`);
    for (const locale of ["en", "pt-BR"] as const) {
      const text = lesson.copy[locale];
      if (
        !text ||
        !text.title ||
        !text.summary ||
        !text.objective ||
        !text.example ||
        !text.mistake ||
        !text.drill ||
        !text.paragraphs.length ||
        text.paragraphs.some((p) => !p.trim())
      )
        errors.push(`Missing translation: ${lesson.id}/${locale}`);
      if (
        !text?.check ||
        text.check.options.length < 2 ||
        !text.check.options[text.check.answer] ||
        !text.check.explanation
      )
        errors.push(`Invalid check: ${lesson.id}/${locale}`);
    }
  }
  for (const lesson of lessons)
    for (const prerequisite of lesson.prerequisites)
      if (!ids.has(prerequisite) || prerequisite === lesson.id)
        errors.push(`Invalid prerequisite: ${lesson.id}`);
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const visit = (id: string) => {
    if (visiting.has(id)) {
      errors.push(`Cyclic prerequisite: ${id}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    byId.get(id)?.prerequisites.forEach(visit);
    visiting.delete(id);
    visited.add(id);
  };
  lessons.forEach((lesson) => visit(lesson.id));
  return errors;
}
