export type SyncProblem =
  "pending" | "authentication" | "rateLimited" | "rejected";

export class SyncFailure extends Error {
  constructor(
    readonly problem: SyncProblem,
    readonly retryAt = 0,
  ) {
    super(problem);
  }
}

export function syncFailure(
  response: Pick<Response, "status" | "headers">,
  now = Date.now(),
): SyncFailure {
  if (response.status === 401) return new SyncFailure("authentication");
  if (response.status === 429) {
    const header = response.headers.get("retry-after");
    const seconds = header === null ? NaN : Number(header);
    const date = header ? Date.parse(header) : NaN;
    const delay = Number.isFinite(seconds)
      ? seconds * 1000
      : Number.isFinite(date)
        ? date - now
        : 60000;
    return new SyncFailure("rateLimited", now + Math.max(1000, delay));
  }
  if ([400, 413, 415, 422].includes(response.status))
    return new SyncFailure("rejected");
  return new SyncFailure("pending");
}
