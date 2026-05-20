"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProject } from "@/actions/project";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Trash2 } from "@hugeicons/core-free-icons";

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteProject(id);
      toast.success("project deleted");
      router.push("/projects");
      router.refresh();
    } catch (error) {
      toast.error("failed to delete project");
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={loading}
          className="cursor-pointer"
        >
          {loading ? "deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <HugeiconsIcon icon={Trash2} />
          </AlertDialogMedia>
          <AlertDialogTitle>delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the project and all its feedback. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
