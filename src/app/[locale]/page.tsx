import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales } from "@/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = dictionaries[locale];

  return (
    <main className="home">
      <div className="home__content">
        <nav className="language" aria-label={text.languageLabel}>
          {locales.map((option) => (
            <a
              key={option}
              href={`/${option}`}
              hrefLang={option}
              lang={option}
              aria-current={option === locale ? "page" : undefined}
            >
              {option === "en" ? text.english : text.portuguese}
            </a>
          ))}
        </nav>
        <p className="eyebrow">Street Fighter 6 · Ken · Classic</p>
        <h1>FightPath</h1>
        <p className="home__lead">{text.lead}</p>
        <p className="home__secondary">{text.secondary}</p>
        <div className="home__status" role="status">
          {text.status}
        </div>
        <a className="home__link" href={`/${locale}/setup`}>
          {text.setupLink}
        </a>
      </div>
    </main>
  );
}
