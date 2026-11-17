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

  return { title: "FightPath", description: dictionaries[locale].description };
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
          localization={locale === "pt-BR" ? ptBR : undefined}
          signInUrl={`/${locale}/sign-in`}
          signUpUrl={`/${locale}/sign-up`}
          signInFallbackRedirectUrl={`/${locale}/practice`}
          signUpFallbackRedirectUrl={`/${locale}/practice`}
        >
          <header className="site-header">
            <a href={`/${locale}`} className="site-header__brand">
              FightPath
            </a>
            <nav
              className="site-header__auth"
              aria-label={dictionaries[locale].accountLabel}
            >
              <Suspense>
                <Show when="signed-out">
                  <SignInButton mode="redirect">
                    <button type="button">{dictionaries[locale].signIn}</button>
                  </SignInButton>
                  <SignUpButton mode="redirect">
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
