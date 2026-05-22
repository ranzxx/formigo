import { db } from "@/db/drizzle";
import { feedback, project } from "@/db/schema";
import { pusher } from "@/lib/pusher";
import { and, count, eq, gte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.message;
  const projectId = body.projectId;

  if (!message || !projectId)
    return NextResponse.json({ error: "Invalid request" }, { status: 404 });

  const existingProject = await db
    .select()
    .from(project)
    .where(eq(project.id, projectId))
    .then((res) => res[0]);

  if (!existingProject)
    return NextResponse.json({ error: "project not found" }, { status: 404 });

  if (existingProject.domain) {
    const origin = request.headers.get("origin") ?? "";
    if (!origin.includes(existingProject.domain))
      return NextResponse.json(
        { error: "domain not allowed" },
        { status: 403 },
      );
  }

  const projectOwner = await db.query.project.findFirst({
    where: eq(project.id, projectId),
    with: { user: true },
  });

  if (projectOwner?.user.plan === "free") {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [{ value }] = await db
      .select({ value: count() })
      .from(feedback)
      .where(
        and(
          eq(feedback.projectId, projectId),
          gte(feedback.createdAt, startOfMonth),
        ),
      );

    if (value >= 100) {
      return NextResponse.json(
        { error: "feedback limit reached" },
        { status: 429 },
      );
    }
  }

  const inserted = await db
    .insert(feedback)
    .values({
      message,
      projectId,
    })
    .returning();

  if (projectOwner?.user.plan === "pro") {
    await pusher.trigger(projectId, "new-feedback", {
      id: inserted[0].id,
      message,
      projectId,
      createdAt: inserted[0].createdAt,
    });
  }

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
