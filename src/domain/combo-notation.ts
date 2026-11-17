import type { Locale } from "@/i18n/dictionaries";

export function facingNotation(directions: string, facing: "left" | "right") {
  const mirror: Record<string, string> = {
    "1": "3",
    "3": "1",
    "4": "6",
    "6": "4",
    "7": "9",
    "9": "7",
  };
  return facing === "right"
    ? directions
    : [...directions].map((token) => mirror[token] ?? token).join("");
}

export function mirrorComboNotation(
  notation: string,
  facing: "left" | "right",
) {
  return notation.replace(
    /[1-9]+(?=(?:LP|MP|HP|LK|MK|HK|PP|KK|P|K)\b)/g,
    (directions) => facingNotation(directions, facing),
  );
}

export function localizedNotation(notation: string, locale: Locale) {
  if (locale === "en") return notation;
  return notation
    .replaceAll(
      "Any Cancellable Medium or Heavy Normal",
      "Qualquer normal médio ou forte cancelável",
    )
    .replaceAll(
      "Any Cancellable Light Normal",
      "Qualquer normal leve cancelável",
    )
    .replaceAll("Any Cancellable Normal", "Qualquer normal cancelável")
    .replaceAll("microwalk", "passo curto")
    .replaceAll("whiff", "no vazio")
    .replaceAll("block", "defesa")
    .replaceAll("hit", "acerto")
    .replaceAll("wait", "esperar")
    .replaceAll("walk", "andar");
}
