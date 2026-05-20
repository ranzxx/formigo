import { db } from "@/db/drizzle";
import { feedback } from "@/db/schema";
import { pusher } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const message = body.message;
  const projectId = body.projectId;

  if (!message || !projectId)
    return NextResponse.json({ error: "Invalid request" }, { status: 404 });

  const inserted = await db.insert(feedback).values({
    message,
    projectId,
  }).returning();

  await pusher.trigger(projectId, "new-feedback", {
    id: inserted[0].id,
    message,
    projectId,
    createdAt: inserted[0].createdAt,
  });

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}