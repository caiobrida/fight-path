import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ControlSetup } from "@/components/control-setup";
import { isLocale } from "@/i18n/dictionaries";
import { signInPath } from "@/domain/auth-return";

export default async function SetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await auth.protect({
    unauthenticatedUrl: signInPath(locale, `/${locale}/setup`),
  });
  return <ControlSetup locale={locale} />;
}
