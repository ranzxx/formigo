export default function Loading() {
  return (
    <div className="max-w-lg space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-8 w-40 bg-muted rounded-xl animate-pulse" />
    </div>
  )
}