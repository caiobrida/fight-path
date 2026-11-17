import { findLesson } from "@/content/catalog";
import type { Locale } from "@/i18n/dictionaries";

export function safeReturnTo(value: unknown, locale: Locale): string {
  const fallback = `/${locale}/practice`;
  if (typeof value !== "string") return fallback;
  const routes = [
    "",
    "/privacy",
    "/setup",
    "/practice",
    "/learn",
    "/learn/progress",
    "/ken/combos",
  ];
  if (routes.some((route) => value === `/${locale}${route}`)) return value;
  const prefix = `/${locale}/learn/`;
  if (value.startsWith(prefix) && findLesson(value.slice(prefix.length)))
    return value;
  return fallback;
}

export function signInPath(locale: Locale, destination: string) {
  return `/${locale}/sign-in?returnTo=${encodeURIComponent(safeReturnTo(destination, locale))}`;
}
