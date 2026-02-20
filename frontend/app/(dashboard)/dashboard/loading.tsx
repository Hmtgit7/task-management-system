import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function StatCardSkeleton() {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4 flex items-center gap-3">
        <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-14" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header skeleton */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-10 w-28 shrink-0" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <Separator />

      {/* Filter skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[170px]" />
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-border/40 p-4 bg-card"
          >
            <Skeleton className="h-5 w-5 rounded-full mt-0.5 shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
