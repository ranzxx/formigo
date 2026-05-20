"use client";

import { createProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProjectSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function NewProjectPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ProjectSchema>) {
    try {
      await createProject({
        name: data.name,
        domain: data.domain || null,
      });
      toast.success("project created!");
      router.push("/projects");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'something went wrong')
    }
  }

  return (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>New Project</CardTitle>
          <CardDescription>
            Create a new project to start collecting feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="new-project-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
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
            </FieldGroup>
          </form>
          <Button type="submit" form="new-project-form" className="w-full mt-5">
            Create Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
