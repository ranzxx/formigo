import { HugeiconsIcon } from "@hugeicons/react";
import { Folder, Message, Analytics, Crown } from "@hugeicons/core-free-icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/dashboard/code-block";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { project, feedback } from "@/db/schema";
import { count, eq, and, gte } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Total projects
  const [totalProjectsResult] = await db
    .select({ count: count() })
    .from(project)
    .where(eq(project.userId, userId));
  const totalProjects = totalProjectsResult.count;

  // Total feedback
  const [totalFeedbackResult] = await db
    .select({ count: count() })
    .from(feedback)
    .innerJoin(project, eq(feedback.projectId, project.id))
    .where(eq(project.userId, userId));
  const totalFeedback = totalFeedbackResult.count;

  // Feedback this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [feedbackThisMonthResult] = await db
    .select({ count: count() })
    .from(feedback)
    .innerJoin(project, eq(feedback.projectId, project.id))
    .where(
      and(
        eq(project.userId, userId),
        gte(feedback.createdAt, startOfMonth)
      )
    );
  const feedbackThisMonth = feedbackThisMonthResult.count;

  // Get user plan
  const plan = session.user.plan;
  const planDisplay = plan?.charAt(0).toUpperCase() + plan?.slice(1);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <Card className="bg-card text-card-foreground border-border p-6 flex flex-col gap-4 shadow-sm transition-all hover:bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HugeiconsIcon icon={Folder} size={18} className="text-foreground" />
            <span className="text-sm font-medium">Total projects</span>
          </div>
          <div className="text-3xl font-bold text-foreground tracking-tight">{totalProjects}</div>
        </Card>

        {/* Total Feedback */}
        <Card className="bg-card text-card-foreground border-border p-6 flex flex-col gap-4 shadow-sm transition-all hover:bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HugeiconsIcon icon={Message} size={18} className="text-foreground" />
            <span className="text-sm font-medium">Total feedback</span>
          </div>
          <div className="text-3xl font-bold text-foreground tracking-tight">{totalFeedback}</div>
        </Card>

        {/* This Month */}
        <Card className="bg-card text-card-foreground border-border p-6 flex flex-col gap-4 shadow-sm transition-all hover:bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HugeiconsIcon icon={Analytics} size={18} className="text-foreground" />
            <span className="text-sm font-medium">This month</span>
          </div>
          <div className="text-3xl font-bold text-foreground tracking-tight">{feedbackThisMonth}</div>
        </Card>

        {/* Current Plan */}
        <Card className="bg-card text-card-foreground border-border p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden group transition-all hover:bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground relative z-10">
            <HugeiconsIcon icon={Crown} size={18} className="text-foreground" />
            <span className="text-sm font-medium">Current plan</span>
          </div>
          <div className="flex items-end justify-between relative z-10">
            <div className="text-3xl font-bold text-foreground tracking-tight">{planDisplay}</div>
            {plan !== 'pro' && (
              <Badge variant="outline" className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                Upgrade
              </Badge>
            )}
          </div>
          {/* Subtle gradient effect on hover for the upgrade card */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Card>
      </div>

      {/* Quick Start Section */}
      <Card className="bg-card text-card-foreground border-border mt-4 overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 border-b border-border bg-muted/20">
          <h2 className="text-xl font-semibold text-foreground mb-1">Quick start</h2>
          <p className="text-muted-foreground text-sm">Get Formigo running on your site in 3 steps.</p>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-8">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center text-foreground font-medium text-sm mt-0.5">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-foreground font-medium mb-1">Create a project</h3>
              <p className="text-muted-foreground text-sm">
                Go to <span className="font-semibold text-foreground">Projects</span> and create your first project. Give it a name and optionally restrict it to a domain.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-border/50 ml-12" />

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center text-foreground font-medium text-sm mt-0.5">
              2
            </div>
            <div className="flex-1 w-full max-w-full overflow-hidden">
              <h3 className="text-foreground font-medium mb-1">Copy your project ID</h3>
              <p className="text-muted-foreground text-sm">
                Click the copy button next to your project to get it&apos;s ID.
              </p>
              <CodeBlock text="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
            </div>
          </div>

          <div className="w-full h-px bg-border/50 ml-12" />

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center text-foreground font-medium text-sm mt-0.5">
              3
            </div>
            <div className="flex-1 w-full max-w-full overflow-hidden">
              <h3 className="text-foreground font-medium mb-1">Embed the widget</h3>
              <p className="text-muted-foreground text-sm">
                Paste this snippet into your site&apos;s HTML, replacing the project ID.
              </p>
              <CodeBlock text={`<script\n  src="${process.env.NEXT_PUBLIC_APP_URL}/widget.js"\n  data-project-id="YOUR_PROJECT_ID"\n></script>`} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}