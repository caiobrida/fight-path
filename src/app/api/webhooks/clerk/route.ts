import { verifyWebhook } from "@clerk/backend/webhooks";
import { NextResponse } from "next/server";
import { database } from "@/server/db";
import { logServerFailure } from "@/server/log";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET)
    return NextResponse.json({ error: "webhook-unavailable" }, { status: 503 });

  let event;
  try {
    event = await verifyWebhook(request);
  } catch {
    return NextResponse.json({ error: "invalid-webhook" }, { status: 400 });
  }

  if (event.type !== "user.deleted" || !event.data.id)
    return NextResponse.json({ received: true });

  try {
    await database().query("DELETE FROM attempts WHERE user_id = $1", [
      event.data.id,
    ]);
    return NextResponse.json({ received: true });
  } catch (error) {
    logServerFailure("clerk-user-deleted", error);
    return NextResponse.json({ error: "webhook-unavailable" }, { status: 503 });
  }
}
