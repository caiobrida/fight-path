import {
  localizedNotation,
  mirrorComboNotation,
} from "@/domain/combo-notation";
import type { Locale } from "@/i18n/dictionaries";

export function ComboNotation({
  notation,
  locale,
  facing = "right",
}: {
  notation: string;
  locale: Locale;
  facing?: "left" | "right";
}) {
  const value = localizedNotation(
    mirrorComboNotation(notation, facing),
    locale,
  );
  return (
    <div className="fp-combo-notation" role="group" aria-label={value}>
      {value
        .split(/(\s*[>,~]\s*|\s+\/\s+)/)
        .filter(Boolean)
        .map((part, i) =>
          /^[\s>,~/]+$/.test(part) ? (
            <span
              className="fp-combo-notation__connector"
              key={i}
              aria-hidden="true"
            >
              {part.trim() === ">"
                ? "›"
                : part.trim() === "~"
                  ? "~"
                  : part.trim() === ","
                    ? "→"
                    : "/"}
            </span>
          ) : (
            <code key={i}>{part}</code>
          ),
        )}
    </div>
  );
}
