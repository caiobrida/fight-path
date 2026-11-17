export function logServerFailure(area: string, error: unknown): void {
  const kind = error instanceof Error ? error.name : typeof error;
  console.error(JSON.stringify({ area, kind }));
}
