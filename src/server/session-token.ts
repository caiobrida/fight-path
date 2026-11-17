import { createHash, randomBytes } from "node:crypto";

export const sessionCookie = "fightpath-session";
export const sessionMaxAge = 60 * 60 * 24 * 180;

export function newSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function validSessionToken(token: unknown): token is string {
  return typeof token === "string" && /^[a-f0-9]{64}$/.test(token);
}
