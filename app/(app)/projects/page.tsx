import { getProjects } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm mb-4">
              no projects yet
            </p>
            <Button asChild>
              <Link href="/projects/new">create your first project</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      {p.domain ?? "no domain set"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
}