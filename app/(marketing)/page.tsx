import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { feedback, project, user } from "@/db/schema";
import { count } from "drizzle-orm";
import Link from "next/link";
import FeedbackDemo from "./feedback-demo";
import PricingCard from "@/components/marketing/pricing-card";
import SectionHeader from "@/components/marketing/section-header";

async function getStats() {
  const [userCount] = await db.select({ count: count() }).from(user);
  const [projectCount] = await db.select({ count: count() }).from(project);
  const [feedbackCount] = await db.select({ count: count() }).from(feedback);
  return {
    users: userCount.count,
    projects: projectCount.count,
    feedbacks: feedbackCount.count,
  };
}

export default async function LandingPage() {
  const stats = await getStats();

  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-20 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-full mb-6">
          realtime feedback, zero setup
        </div>
        <h1 className="text-4xl font-medium leading-tight tracking-tight mb-4">
          collect user feedback
          <br />
          in <span className="text-emerald-600">one line of code</span>
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md mx-auto">
          Drop a script tag. Get a beautiful feedback widget. See responses in
          your dashboard — instantly, in realtime.
        </p>
        <div className="flex gap-3 justify-center">
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/register">start for free</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#how-it-works">see how it works</Link>
          </Button>
        </div>
      </section>

      {/* Demo */}
      <FeedbackDemo />

      <div className="h-px bg-border mx-8 my-4" />

      {/* Stats */}
      <section className="grid grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden mx-8 my-12">
        {[
          { num: stats.users, label: "developers" },
          { num: stats.projects, label: "projects" },
          { num: stats.feedbacks, label: "feedback collected" },
        ].map((stat) => (
          <div key={stat.label} className="bg-muted px-6 py-5">
            <div className="text-3xl font-medium mb-1">{stat.num}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      <div className="h-px bg-border mx-8" />

      {/* How it works */}
      <section id="how-it-works" className="px-8 py-12">
        <SectionHeader
          title="how it works"
          description="up and running in 3 steps"
        />
        <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {[
            {
              num: "01",
              title: "create a project",
              desc: "Sign up and create a project for your website in seconds.",
              code: null,
            },
            {
              num: "02",
              title: "paste the script",
              desc: "Copy one line of code and paste it into your website.",
              code: `<script src="/widget.js" data-project-id="...">`,
            },
            {
              num: "03",
              title: "collect feedback",
              desc: "Watch feedback roll in to your dashboard in realtime.",
              code: null,
            },
          ].map((step) => (
            <div key={step.num} className="bg-background p-6">
              <div className="text-xs text-emerald-600 font-medium mb-2">
                {step.num}
              </div>
              <div className="text-sm font-medium mb-2">{step.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {step.desc}
              </div>
              {step.code && (
                <div className="mt-3 bg-muted rounded-md px-3 py-2 font-mono text-xs text-muted-foreground truncate">
                  {step.code}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border mx-8" />

      {/* Pricing */}
      <section className="px-8 py-12">
        <SectionHeader
          title="pricing"
          description="simple, transparent pricing"
        />
        <div className="grid grid-cols-2 gap-4">
          <PricingCard
            className="border-border"
            plan="free"
            price={0}
            description="perfect for side projects"
            features={[
              { text: "1 project", included: true },
              { text: "dashboard access", included: true },
              { text: "unlimited feedback", included: false },
            ]}
            variant={"outline"}
            titleBtn="get started"
          />
          <PricingCard
            className="border-2 border-emerald-600"
            plan="pro"
            price={9}
            description="for teams and growing products"
            features={[
              { text: "unlimited projects", included: true },
              { text: "unlimited feedback", included: true },
              { text: "dashboard access", included: true },
              { text: "realtime notifications", included: true },
              { text: "priority support", included: true },
            ]}
            btnClassName="bg-emerald-600 hover:bg-emerald-700"
            titleBtn="upgrade to pro"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-8 mb-12 bg-muted border border-border rounded-xl p-12 text-center">
        <h2 className="text-2xl font-medium mb-2">
          ready to hear from your users?
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Join developers who use Formigo to build better products.
        </p>
        <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
          <Link href="/register">start for free — no credit card needed</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-5 border-t border-border">
        <span className="text-xs text-muted-foreground">
          © 2025 Formigo. all rights reserved.
        </span>
        <span className="text-xs text-muted-foreground">
          built with Next.js & Drizzle
        </span>
      </footer>
    </main>
  );
}
