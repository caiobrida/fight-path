import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";
import { database } from "./db";
import {
  newSessionToken,
  sessionCookie,
  sessionMaxAge,
  tokenHash,
  validSessionToken,
} from "./session-token";

export async function sessionId(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get(sessionCookie)?.value;
  if (!validSessionToken(token)) return null;
  const result = await database().query<{ id: string }>(
    "SELECT id FROM sessions WHERE token_hash = $1",
    [tokenHash(token)],
  );
  return result.rows[0]?.id ?? null;
}

export async function ensureSession(
  request: NextRequest,
  response: NextResponse,
): Promise<string> {
  const existing = await sessionId(request);
  if (existing) return existing;
  const token = newSessionToken();
  const result = await database().query<{ id: string }>(
    "INSERT INTO sessions (token_hash) VALUES ($1) RETURNING id",
    [tokenHash(token)],
  );
  response.cookies.set(sessionCookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAge,
  });
  return result.rows[0].id;
}

export function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return origin === request.nextUrl.origin;
}
