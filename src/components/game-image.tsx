import Image from "next/image";
import { gameMedia, type GameMediaId } from "@/content/game-media";
import type { Locale } from "@/i18n/dictionaries";

export function GameImage({
  media,
  locale,
  className = "",
  priority = false,
  decorative = false,
}: {
  media: GameMediaId;
  locale: Locale;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const entry = gameMedia[media];
  return (
    <Image
      className={`fp-game-image ${className}`}
      src={entry.poster}
      alt={decorative ? "" : entry.alt[locale]}
      width={400}
      height={224}
      unoptimized
      priority={priority}
    />
  );
}
