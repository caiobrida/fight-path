import type { Locale } from "@/i18n/dictionaries";
import { costValues, type ComboRecipe } from "@/content/combos";

export function ResourceMeter({
  kind,
  cost,
  locale,
}: {
  kind: "drive" | "super";
  cost: ComboRecipe["drive"];
  locale: Locale;
}) {
  const values = costValues(cost);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 0;
  const capacity = kind === "drive" ? 6 : 3;
  const name = kind === "drive" ? "Drive" : "Super";
  const amount = values.length ? values.join(" / ") : "—";
  const description = values.length
    ? locale === "pt-BR"
      ? `${amount} barras de ${name}, gasto informado pela SuperCombo`
      : `${amount} ${name} bars, expenditure reported by SuperCombo`
    : locale === "pt-BR"
      ? `${name}: valor ausente ou divergente na fonte`
      : `${name}: source value missing or conflicting`;
  return (
    <div
      className={`fp-meter fp-meter--${kind}`}
      role="img"
      aria-label={description}
    >
      <div className="fp-meter__label">
        <span>{name}</span>
        <strong>
          {amount}
          {max > capacity && <small> total</small>}
        </strong>
      </div>
      <div className="fp-meter__segments" aria-hidden="true">
        {Array.from({ length: capacity }, (_, i) => (
          <span
            key={i}
            data-fill={
              !values.length
                ? "unknown"
                : i < min
                  ? "spent"
                  : i < max
                    ? "variant"
                    : "empty"
            }
          />
        ))}
      </div>
    </div>
  );
}
