import { NextRequest, NextResponse } from "next/server";
import { database } from "@/server/db";
import { logServerFailure } from "@/server/log";
import { parseAttempt, type ProgressRow } from "@/domain/progress";
import { sessionCookie } from "@/server/session-token";
import { ensureSession, sameOrigin, sessionId } from "@/server/sessions";

export const runtime = "nodejs";

const privateHeaders = { "Cache-Control": "private, no-store" };

async function limitedBody(request: NextRequest): Promise<unknown> {
  if (!request.body) throw new Error("Empty body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 2048) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function summary(id: string): Promise<ProgressRow[]> {
  const result = await database().query<{
    exercise_id: string;
    attempts: number;
    correct: number;
    recent_attempts: number;
    recent_correct: number;
  }>(
    "WITH ranked AS (SELECT exercise_id, correct, ROW_NUMBER() OVER (PARTITION BY exercise_id ORDER BY created_at DESC, id DESC) AS position FROM attempts WHERE session_id = $1) SELECT exercise_id, COUNT(*)::int AS attempts, COUNT(*) FILTER (WHERE correct)::int AS correct, COUNT(*) FILTER (WHERE position <= 20)::int AS recent_attempts, COUNT(*) FILTER (WHERE position <= 20 AND correct)::int AS recent_correct FROM ranked GROUP BY exercise_id",
    [id],
  );
  return result.rows.map((row) => ({
    exerciseId: row.exercise_id,
    attempts: row.attempts,
    correct: row.correct,
    recentAttempts: row.recent_attempts,
    recentCorrect: row.recent_correct,
  }));
}

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { progress: [] },
      { headers: privateHeaders },
    );
    const id = await ensureSession(request, response);
    const rows = await summary(id);
    return NextResponse.json({ progress: rows }, { headers: response.headers });
  } catch (error) {
    logServerFailure("progress-read", error);
    return NextResponse.json(
      { error: "progress-unavailable" },
      { status: 503, headers: privateHeaders },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "invalid-origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json({ error: "invalid-attempt" }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > 2048)
    return NextResponse.json({ error: "invalid-attempt" }, { status: 413 });
  let input: unknown;
  try {
    input = await limitedBody(request);
  } catch {
    return NextResponse.json({ error: "invalid-attempt" }, { status: 400 });
  }
  const attempt = parseAttempt(input);
  if (!attempt)
    return NextResponse.json({ error: "invalid-attempt" }, { status: 400 });
  try {
    const id = await sessionId(request);
    if (!id)
      return NextResponse.json({ error: "session-required" }, { status: 401 });
    const limit = await database().query<{ count: number }>(
      "SELECT COUNT(*)::int AS count FROM attempts WHERE session_id = $1 AND created_at > now() - interval '1 hour'",
      [id],
    );
    if (limit.rows[0].count >= 500)
      return NextResponse.json({ error: "rate-limited" }, { status: 429 });
    await database().query(
      "INSERT INTO attempts (id, session_id, exercise_id, correct, duration_ms) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING",
      [attempt.id, id, attempt.exerciseId, attempt.correct, attempt.durationMs],
    );
    return NextResponse.json(
      { progress: await summary(id) },
      { headers: privateHeaders },
    );
  } catch (error) {
    logServerFailure("progress-write", error);
    return NextResponse.json(
      { error: "progress-unavailable" },
      { status: 503, headers: privateHeaders },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "invalid-origin" }, { status: 403 });
  try {
    const id = await sessionId(request);
    if (id) await database().query("DELETE FROM sessions WHERE id = $1", [id]);
    const response = NextResponse.json(
      { deleted: true },
      { headers: privateHeaders },
    );
    response.cookies.delete(sessionCookie);
    return response;
  } catch (error) {
    logServerFailure("progress-delete", error);
    return NextResponse.json(
      { error: "progress-unavailable" },
      { status: 503, headers: privateHeaders },
    );
  }
}
