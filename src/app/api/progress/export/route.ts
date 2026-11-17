import { NextRequest, NextResponse } from "next/server";
import { database } from "@/server/db";
import { sessionId } from "@/server/sessions";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const id = await sessionId(request);
    if (!id)
      return NextResponse.json({ error: "session-required" }, { status: 401 });
    const result = await database().query<{
      exercise_id: string;
      correct: boolean;
      duration_ms: number;
      created_at: Date;
    }>(
      "SELECT exercise_id, correct, duration_ms, created_at FROM attempts WHERE session_id = $1 ORDER BY created_at ASC",
      [id],
    );
    return new NextResponse(JSON.stringify({ attempts: result.rows }), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="fightpath-progress.json"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "progress-unavailable" },
      { status: 503 },
    );
  }
}
