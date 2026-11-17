import Image from "next/image";
import type { Lesson } from "@/content/learning";
import type { Locale } from "@/i18n/dictionaries";

export function LessonVisual({
  track,
  locale,
}: {
  track: Lesson["track"];
  locale: Locale;
}) {
  const pt = locale === "pt-BR";
  const range = track === "footsies" || track === "ken";
  const resource = track === "sf6";
  const caption = range
    ? pt
      ? "Espaço entre personagens: ilustração conceitual, sem hitboxes reais."
      : "Space between fighters: conceptual illustration, not actual hitboxes."
    : resource
      ? pt
        ? "Recursos separados exigem decisões separadas. Diagrama ilustrativo, sem custos exatos."
        : "Separate resources need separate decisions. Illustrative diagram, not exact costs."
      : pt
        ? "Observe uma etapa por vez e só depois conecte a sequência. Diagrama sem escala temporal."
        : "Observe one step at a time before connecting the sequence. Diagram not drawn to a timing scale.";
  return (
    <figure className="fp-visual">
      <Image
        src={`/images/${range ? "range" : resource ? "resource" : "timing"}-study.svg`}
        width={960}
        height={420}
        alt={caption}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
