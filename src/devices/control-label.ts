import type { Locale } from "@/i18n/dictionaries";

const standardLabels: Record<Locale, string[]> = {
  en: [
    "lower face",
    "right face",
    "left face",
    "upper face",
    "upper left shoulder",
    "upper right shoulder",
    "lower left shoulder",
    "lower right shoulder",
    "left center",
    "right center",
    "left stick press",
    "right stick press",
    "D-pad up",
    "D-pad down",
    "D-pad left",
    "D-pad right",
    "center",
  ],
  "pt-BR": [
    "frontal inferior",
    "frontal direito",
    "frontal esquerdo",
    "frontal superior",
    "ombro superior esquerdo",
    "ombro superior direito",
    "ombro inferior esquerdo",
    "ombro inferior direito",
    "centro esquerdo",
    "centro direito",
    "clique analógico esquerdo",
    "clique analógico direito",
    "direcional cima",
    "direcional baixo",
    "direcional esquerda",
    "direcional direita",
    "centro",
  ],
};

export function controlLabel(token: string, standard: boolean, locale: Locale) {
  const match = /^Button(\d+)$/.exec(token);
  const label =
    match && standard ? standardLabels[locale][Number(match[1])] : undefined;
  return label ? `${token} · ${label}` : token;
}
