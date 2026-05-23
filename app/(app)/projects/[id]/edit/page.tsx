import { getProjectsById } from "@/actions/project";
import EditProjectForm from "./edit-project-form";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;
    const p = await getProjectsById(id);
    if(!p) notFound();

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Page</h2>
      <EditProjectForm project={p} />
    </div>
  );
}