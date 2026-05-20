'use client'

import { updateProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EditProjectSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface EditProjectFormProps {
    project: {
        id: string,
        name: string,
        domain: string | null
    }
}

export default function EditProjectForm({ project }: EditProjectFormProps) {
    const router = useRouter();

  const form = useForm<z.infer<typeof EditProjectSchema>>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      name: project.name,
      domain: project.domain ?? ''
    },
  });

  async function onSubmit(data: z.infer<typeof EditProjectSchema>) {
    await updateProject({
        id: project.id,
        name: data.name,
        domain: data.domain || null
    });
    toast.success('project updated!');
    router.push(`/projects/${project.id}`);
    router.refresh();
  }

  return (
    <Card>
      <CardContent>
        <form
          id="edit-project-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Project Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="My Website"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Controller
            name="domain"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="domain">
                  Domain Name{" "}
                  <p className="text-muted-foreground">(optional)</p>
                </FieldLabel>
                <Input
                  {...field}
                  id="domain"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://mywebsite.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
        <div className="flex gap-3 mt-4">
          <Button
            type="submit"
            form="edit-project-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "saving..." : "save changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}