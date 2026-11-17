"use client";

import { usePathname } from "next/navigation";
import { safeReturnTo, signInPath } from "@/domain/auth-return";
import { dictionaries, type Locale } from "@/i18n/dictionaries";

export function AuthLinks({ locale }: { locale: Locale }) {
  const destination = safeReturnTo(usePathname(), locale);
  return (
    <>
      <a href={signInPath(locale, destination)}>
        {dictionaries[locale].signIn}
      </a>
      <a
        href={`/${locale}/sign-up?returnTo=${encodeURIComponent(destination)}`}
      >
        {dictionaries[locale].signUp}
      </a>
    </>
  );
}
