import { getProjectsById } from "@/actions/project";
import DeleteProjectButton from "@/components/dashboard/delete-project-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeedbackList from "./feedback-list";
import { db } from "@/db/drizzle";
import { feedback } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CodeBlock } from "@/components/dashboard/code-block";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const p = await getProjectsById(id);
  if (!p) notFound();

  const feedbacks = await db.select().from(feedback).where(eq(feedback.projectId, id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{p.name}</h1>
          <p className="text-sm text-muted-foreground">
            {p.domain ?? "no domain"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/projects/${id}/edit`}>Edit</Link>
          </Button>
          <DeleteProjectButton id={id} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Embed</h1>
          <p className="text-sm text-muted-foreground">
            Add this code to your website to enable feedback collection.
          </p>
        </div>
        <CodeBlock text={`<script\n  src="${process.env.NEXT_PUBLIC_APP_URL}/widget.js"\n  data-project-id="${id}"\n></script>`} />
      </div>

      <FeedbackList projectId={id} initialFeedbacks={feedbacks} />
    </div>
  );
}
