import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="auth-page">
      <Suspense>
        <SignUp path={`/${locale}/sign-up`} routing="path" />
      </Suspense>
    </main>
  );
}
