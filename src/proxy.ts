import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { isLocale, type Locale } from "@/i18n/dictionaries";

export default clerkMiddleware((_auth, request: NextRequest) => {
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
  if (/^\/sign-(?:in|up)(?:\/|$)/.test(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${preferred}${request.nextUrl.pathname}`;
    return NextResponse.redirect(destination);
  }
  if (request.nextUrl.pathname !== "/") return NextResponse.next();
  return NextResponse.redirect(new URL(`/${preferred}`, request.url));
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
