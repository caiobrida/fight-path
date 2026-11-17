import Image from "next/image";
import type { Locale } from "@/i18n/dictionaries";

const dimensions = { ken: [640, 731], ryu: [640, 892], chunli: [564, 900] };

export function FighterArt({
  character,
  locale,
  priority = false,
}: {
  character: keyof typeof dimensions;
  locale: Locale;
  priority?: boolean;
}) {
  const name =
    character === "chunli" ? "Chun-Li" : character === "ken" ? "Ken" : "Ryu";
  const [width, height] = dimensions[character];
  return (
    <Image
      src={`/images/sf6/${character}-portrait.webp`}
      alt={
        locale === "pt-BR"
          ? `${name} em Street Fighter 6. Arte oficial da Capcom.`
          : `${name} in Street Fighter 6. Official Capcom artwork.`
      }
      width={width}
      height={height}
      unoptimized
      priority={priority}
      className="fp-fighter-art"
    />
  );
}
