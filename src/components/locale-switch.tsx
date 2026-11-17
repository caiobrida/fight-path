"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/dictionaries";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const path = usePathname();
  const rest = path.split("/").slice(2).join("/");
  return (
    <nav
      className="fp-locale"
      aria-label={locale === "pt-BR" ? "Idioma" : "Language"}
    >
      {(["en", "pt-BR"] as const).map((item) => (
        <a
          key={item}
          href={`/${item}${rest ? `/${rest}` : ""}`}
          lang={item}
          hrefLang={item}
          aria-current={item === locale ? "page" : undefined}
        >
          {item === "en" ? "EN" : "PT-BR"}
        </a>
      ))}
    </nav>
  );
}
