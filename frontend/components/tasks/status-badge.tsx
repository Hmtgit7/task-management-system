// components/tasks/status-badge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Task } from "@/lib/api/tasks.api";

const statusConfig: Record<
  Task["status"],
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "border-muted-foreground/30 text-muted-foreground bg-muted/40",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "border-yellow-500/30 text-yellow-600 bg-yellow-500/10 dark:text-yellow-400",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "border-green-500/30 text-green-600 bg-green-500/10 dark:text-green-400",
  },
};

export function StatusBadge({ status }: { status: Task["status"] }) {
  const config = statusConfig[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
