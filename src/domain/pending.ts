import { parseAttempt, type AttemptInput } from "./progress";

export const pendingKey = "fightpath-pending-attempts";
export const pendingLimit = 500;

export function readPending(
  storage: Pick<Storage, "getItem"> | null,
): AttemptInput[] {
  try {
    if (!storage) return [];
    const stored = storage.getItem(pendingKey);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(parseAttempt)
      .filter((attempt): attempt is AttemptInput => attempt !== null)
      .slice(0, pendingLimit);
  } catch {
    return [];
  }
}

export function writePending(
  storage: Pick<Storage, "setItem" | "removeItem"> | null,
  attempts: readonly AttemptInput[],
): boolean {
  try {
    if (!storage) return false;
    if (attempts.length) storage.setItem(pendingKey, JSON.stringify(attempts));
    else storage.removeItem(pendingKey);
    return true;
  } catch {
    return false;
  }
}

export function queueAttempt(
  attempts: readonly AttemptInput[],
  attempt: AttemptInput,
): AttemptInput[] | null {
  if (attempts.length >= pendingLimit) return null;
  return [...attempts, attempt];
}
