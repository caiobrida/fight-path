import { LocaleSwitch } from "@/components/locale-switch";
import type { Metadata } from "next";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AuthLinks } from "@/components/auth-links";
import { dictionaries, isLocale, locales } from "@/i18n/dictionaries";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const developmentDeployment =
    process.env.VERCEL_ENV === "preview" ||
    process.env.FIGHTPATH_RELEASE_MODE === "development";

  return {
    title: "FightPath",
    description: dictionaries[locale].description,
    robots: developmentDeployment ? { index: false, follow: false } : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#ffad71",
              colorBackground: "#1a2230",
              colorForeground: "#f7f7f3",
              colorMutedForeground: "#c6ccd5",
              colorInput: "#10131b",
              colorInputForeground: "#f7f7f3",
              borderRadius: "8px",
            },
          }}
          localization={locale === "pt-BR" ? ptBR : undefined}
          signInUrl={`/${locale}/sign-in`}
          signUpUrl={`/${locale}/sign-up`}
          signInFallbackRedirectUrl={`/${locale}/practice`}
          signUpFallbackRedirectUrl={`/${locale}/practice`}
        >
          <header className="site-header">
            <a href={`/${locale}`} className="site-header__brand">
              FIGHT<span>PATH</span>
            </a>
            <nav
              className="fp-main-nav"
              aria-label={
                locale === "pt-BR" ? "Navegação principal" : "Main navigation"
              }
            >
              <a href={`/${locale}`}>
                {locale === "pt-BR" ? "Início" : "Home"}
              </a>
              <a href={`/${locale}/learn`}>
                {locale === "pt-BR" ? "Aprender" : "Learn"}
              </a>
              <a href={`/${locale}/practice`}>
                {locale === "pt-BR" ? "Praticar" : "Practice"}
              </a>
              <a href={`/${locale}/setup`}>
                {locale === "pt-BR" ? "Controles" : "Controls"}
              </a>
            </nav>
            <LocaleSwitch locale={locale} />
            <nav
              className="site-header__auth"
              aria-label={dictionaries[locale].accountLabel}
            >
              <Suspense>
                <Show when="signed-out">
                  <AuthLinks locale={locale} />
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </Suspense>
            </nav>
          </header>
          {(process.env.FIGHTPATH_RELEASE_MODE === "development" ||
            process.env.NODE_ENV === "development" ||
            process.env.VERCEL_ENV === "preview") && (
            <p className="fp-development">
              {locale === "pt-BR"
                ? "Ambiente de desenvolvimento · recursos e conteúdo em validação"
                : "Development environment · features and content under validation"}
            </p>
          )}
          {children}
          <footer className="site-footer">
            <a href={`/${locale}/privacy`}>
              {dictionaries[locale].privacyLink}
            </a>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}
