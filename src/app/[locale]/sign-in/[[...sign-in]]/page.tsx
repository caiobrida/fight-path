import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/dictionaries";
import { safeReturnTo } from "@/domain/auth-return";

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ returnTo?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const destination = safeReturnTo((await searchParams).returnTo, locale);
  return (
    <main className="auth-page">
      <Suspense>
        <SignIn
          path={`/${locale}/sign-in`}
          routing="path"
          forceRedirectUrl={destination}
          signUpForceRedirectUrl={destination}
          signUpUrl={`/${locale}/sign-up?returnTo=${encodeURIComponent(destination)}`}
        />
      </Suspense>
    </main>
  );
}
