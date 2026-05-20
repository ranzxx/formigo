"use server";

import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createProject({
  name,
  domain,
}: {
  name: string;
  domain: string | null;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const isPro = session.user.plan === 'pro'

  if(!isPro) {
    const existing = await db.select().from(project).where(eq(project.userId, session.user.id));

    if(existing.length >= 1)
      throw new Error('The free plan only allows one project. Upgrade to Pro')
  }

  await db.insert(project).values({
    name,
    domain, 
    userId: session.user.id,
  });

  revalidatePath("/projects");
}

export async function getProjects() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return await db
    .select()
    .from(project)
    .where(eq(project.userId, session.user.id));
}

export async function getProjectsById(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const data = await db
    .select()
    .from(project)
    .where(eq(project.id, id))
    .then((res) => res[0]);
  return data;
}

export async function updateProject({
  id,
  name,
  domain,
}: {
  id: string;
  name: string;
  domain: string | null;
}) {
  await db.update(project).set({ name, domain }).where(eq(project.id, id));
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  await db.delete(project).where(eq(project.id, id));
  revalidatePath("/projects");
}
