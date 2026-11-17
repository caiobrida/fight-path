import { notFound } from "next/navigation";
import { Practice } from "@/components/practice";
import { isLocale } from "@/i18n/dictionaries";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Practice locale={locale} />;
}
