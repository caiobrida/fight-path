import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Practice } from "@/components/practice";
import { isLocale } from "@/i18n/dictionaries";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { userId } = await auth.protect({
    unauthenticatedUrl: `/${locale}/sign-in`,
  });
  return <Practice key={userId} locale={locale} userId={userId} />;
}
