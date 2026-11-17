import { notFound } from "next/navigation";
import { ControlSetup } from "@/components/control-setup";
import { isLocale } from "@/i18n/dictionaries";

export default async function SetupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ControlSetup locale={locale} />;
}
