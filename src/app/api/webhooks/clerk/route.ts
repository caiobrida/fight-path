import { verifyWebhook } from "@clerk/backend/webhooks";
import { NextResponse } from "next/server";
import { deleteUserProgress } from "@/server/learning";
import { logServerFailure } from "@/server/log";
import { limitedText } from "@/server/request-body";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET)
    return NextResponse.json({ error: "webhook-unavailable" }, { status: 503 });

  let event;
  let body;
  try {
    body = await limitedText(request, 65536);
  } catch {
    return NextResponse.json(
      { error: "invalid-webhook-size" },
      { status: 413 },
    );
  }
  try {
    event = await verifyWebhook(
      new Request(request.url, {
        method: "POST",
        headers: request.headers,
        body,
      }),
    );
  } catch {
    return NextResponse.json({ error: "invalid-webhook" }, { status: 400 });
  }

  if (event.type !== "user.deleted" || !event.data.id)
    return NextResponse.json({ received: true });

  try {
    await deleteUserProgress(event.data.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    logServerFailure("clerk-user-deleted", error);
    return NextResponse.json({ error: "webhook-unavailable" }, { status: 503 });
  }
}
