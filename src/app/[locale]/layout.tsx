import { LocaleSwitch } from "@/components/locale-switch";
import type { Metadata } from "next";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
                locale === "pt-BR" ? "Navega??o principal" : "Main navigation"
              }
            >
              <a href={`/${locale}`}>
                {locale === "pt-BR" ? "In?cio" : "Home"}
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
                  <SignInButton
                    mode="redirect"
                    forceRedirectUrl={`/${locale}/practice`}
                    signUpForceRedirectUrl={`/${locale}/practice`}
                  >
                    <button type="button">{dictionaries[locale].signIn}</button>
                  </SignInButton>
                  <SignUpButton
                    mode="redirect"
                    forceRedirectUrl={`/${locale}/practice`}
                    signInForceRedirectUrl={`/${locale}/practice`}
                  >
                    <button type="button">{dictionaries[locale].signUp}</button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </Suspense>
            </nav>
          </header>
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
