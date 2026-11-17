import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/server/db";
import { logServerFailure } from "@/server/log";

import { readLearning } from "@/server/learning";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json(
      { error: "authentication-required" },
      { status: 401, headers: { "Cache-Control": "private, no-store" } },
    );
  try {
    const result = await database().query<{
      exercise_id: string;
      correct: boolean;
      duration_ms: number;
      created_at: Date;
    }>(
      "SELECT exercise_id, correct, duration_ms, created_at FROM attempts WHERE user_id = $1 ORDER BY created_at ASC",
      [userId],
    );
    return new NextResponse(
      JSON.stringify({
        attempts: result.rows,
        learningActivities: await readLearning(userId),
      }),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition":
            'attachment; filename="fightpath-progress.json"',
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch (error) {
    logServerFailure("progress-export", error);
    return NextResponse.json(
      { error: "progress-unavailable" },
      { status: 503 },
    );
  }
}
