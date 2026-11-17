import type { NextRequest } from "next/server";

export function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return origin === request.nextUrl.origin;
}
