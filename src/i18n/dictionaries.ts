export const locales = ["en", "pt-BR"] as const;

export type Locale = (typeof locales)[number];

type Dictionary = {
  description: string;
  lead: string;
  secondary: string;
  status: string;
  languageLabel: string;
  english: string;
  portuguese: string;
  setupLink: string;
  practiceLink: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    description: "Practice fighting game inputs with clear feedback.",
    lead: "A practice space for every input, every improvement, and every next round.",
    secondary: "Build precision and confidence one attempt at a time.",
    status: "Training experience in development",
    languageLabel: "Language",
    english: "English",
    portuguese: "Português (Brasil)",
    setupLink: "Set up controls",
    practiceLink: "Start practicing",
  },
  "pt-BR": {
    description: "Pratique comandos de jogos de luta com feedback claro.",
    lead: "Um espaço para cada comando, cada evolução e cada próximo round.",
    secondary: "Desenvolva precisão e confiança a cada tentativa.",
    status: "Experiência de treino em desenvolvimento",
    languageLabel: "Idioma",
    english: "English",
    portuguese: "Português (Brasil)",
    setupLink: "Configurar controles",
    practiceLink: "Começar a praticar",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(locale: Locale, value: Date): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(value);
}
