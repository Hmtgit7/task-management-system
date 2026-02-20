import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function AuthLoading() {
  return (
    <div className="w-full max-w-md">
      <Card className="border-border/60 shadow-xl">
        <CardHeader className="space-y-3 pb-6 items-center">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}
          <Skeleton className="h-11 w-full mt-2" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-48 mx-auto" />
        </CardFooter>
      </Card>
    </div>
  );
}
