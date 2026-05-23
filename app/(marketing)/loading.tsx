export default function Loading() {
  return (
    <div className="px-8 py-20 max-w-2xl mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <div className="h-6 w-40 bg-muted rounded-full animate-pulse mx-auto" />
        <div className="h-12 w-full bg-muted rounded animate-pulse" />
        <div className="h-12 w-3/4 bg-muted rounded animate-pulse mx-auto" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-muted rounded animate-pulse mx-auto" />
      </div>
    </div>
  )
}