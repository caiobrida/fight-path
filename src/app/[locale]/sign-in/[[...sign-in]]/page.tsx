import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="auth-page">
      <Suspense>
        <SignIn path={`/${locale}/sign-in`} routing="path" />
      </Suspense>
    </main>
  );
}
