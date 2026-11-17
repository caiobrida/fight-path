import { NextResponse, type NextRequest } from "next/server";
import { isLocale, type Locale } from "@/i18n/dictionaries";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[1];

  if (isLocale(segment)) {
    const response = NextResponse.next();
    response.cookies.set("fightpath-locale", segment, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const saved = request.cookies.get("fightpath-locale")?.value;
  const preferred: Locale =
    saved && isLocale(saved)
      ? saved
      : request.headers.get("accept-language")?.toLowerCase().startsWith("pt")
        ? "pt-BR"
        : "en";
  return NextResponse.redirect(new URL(`/${preferred}`, request.url));
}

export const config = { matcher: ["/", "/en/:path*", "/pt-BR/:path*"] };
