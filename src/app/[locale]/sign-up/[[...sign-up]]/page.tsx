import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/dictionaries";
import { safeReturnTo } from "@/domain/auth-return";

export default async function SignUpPage({
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
        <SignUp
          path={`/${locale}/sign-up`}
          routing="path"
          forceRedirectUrl={destination}
          signInForceRedirectUrl={destination}
          signInUrl={`/${locale}/sign-in?returnTo=${encodeURIComponent(destination)}`}
        />
      </Suspense>
    </main>
  );
}
