import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { database } from "@/server/db";
import { logServerFailure } from "@/server/log";

export const runtime = "nodejs";

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization");
  if (!secret || !supplied) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(supplied);
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export async function GET(request: NextRequest) {
  if (!authorized(request))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const result = await database().query(
      "DELETE FROM attempts WHERE created_at < now() - interval '180 days'",
    );
    const learning = await database().query(
      "DELETE FROM learning_activity WHERE created_at < now() - interval '180 days'",
    );
    return NextResponse.json(
      {
        deletedAttempts: result.rowCount ?? 0,
        deletedActivities: learning.rowCount ?? 0,
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    logServerFailure("retention", error);
    return NextResponse.json(
      { error: "retention-unavailable" },
      { status: 503, headers: { "Cache-Control": "private, no-store" } },
    );
  }
}
