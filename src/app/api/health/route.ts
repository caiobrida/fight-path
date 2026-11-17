import { NextResponse } from "next/server";
import { database } from "@/server/db";
import { logServerFailure } from "@/server/log";

export const runtime = "nodejs";

export async function GET() {
  try {
    await database().query("SELECT 1");
    return NextResponse.json(
      { status: "ok" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    logServerFailure("health", error);
    return NextResponse.json(
      { status: "unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
