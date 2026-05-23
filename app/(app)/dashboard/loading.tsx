import { Card } from "@/components/ui/card"; // Sesuaikan path Card Anda jika perlu

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      {/* 1. Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-4 w-72 bg-muted rounded animate-pulse" />
      </div>

      {/* 2. Metrics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>

      {/* 3. Quick Start Card Skeleton */}
      <Card className="bg-card text-card-foreground border-border mt-4 overflow-hidden shadow-sm">
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-border bg-muted/20 space-y-2">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>

        {/* Steps Content */}
        <div className="p-6 md:p-8 flex flex-col gap-8">
          {/* Step 1 Skeleton */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            </div>
          </div>

          <div className="w-full h-px bg-border/50 ml-12" />

          {/* Step 2 Skeleton */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2 w-full">
              <div className="h-5 w-44 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted rounded mt-2 animate-pulse" />
            </div>
          </div>

          <div className="w-full h-px bg-border/50 ml-12" />

          {/* Step 3 Skeleton */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2 w-full">
              <div className="h-5 w-40 bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-20 w-full bg-muted rounded mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
