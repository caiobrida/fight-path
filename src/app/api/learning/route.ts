import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { parseLearningInput } from "@/domain/learning-progress";
import { readLearning, saveLearning } from "@/server/learning";
import { logServerFailure } from "@/server/log";
import { sameOrigin } from "@/server/origin";
import { limitedJson } from "@/server/request-body";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json(
      { error: "authentication-required" },
      { status: 401, headers },
    );
  try {
    return NextResponse.json(
      { activities: await readLearning(userId) },
      { headers },
    );
  } catch (error) {
    logServerFailure("learning-read", error);
    return NextResponse.json(
      { error: "learning-unavailable" },
      { status: 503, headers },
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json(
      { error: "authentication-required" },
      { status: 401, headers },
    );
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "invalid-origin" },
      { status: 403, headers },
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json(
      { error: "invalid-type" },
      { status: 415, headers },
    );
  let input;
  try {
    input = await limitedJson(request);
  } catch {
    return NextResponse.json(
      { error: "invalid-body" },
      { status: 400, headers },
    );
  }
  const activity = parseLearningInput(input);
  if (!activity)
    return NextResponse.json(
      { error: "invalid-activity" },
      { status: 422, headers },
    );
  try {
    await saveLearning(userId, activity);
    return NextResponse.json(
      { activities: await readLearning(userId) },
      { headers },
    );
  } catch (error) {
    logServerFailure("learning-write", error);
    return NextResponse.json(
      { error: "learning-unavailable" },
      { status: 503, headers },
    );
  }
}
