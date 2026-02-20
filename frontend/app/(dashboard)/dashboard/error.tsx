'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-lg">Dashboard failed to load</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          There was an issue loading your tasks. Please try again.
        </p>
      </div>
      <Button onClick={reset} variant="outline" size="sm" className="gap-2">
        <RefreshCw className="h-3.5 w-3.5" />
        Retry
      </Button>
    </div>
  );
}
