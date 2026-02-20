import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/lib/api/tasks.api';

const priorityConfig: Record<Task['priority'], { label: string; className: string }> = {
  LOW: {
    label: 'Low',
    className: 'border-green-500/30 text-green-600 bg-green-500/10 dark:text-green-400',
  },
  MEDIUM: {
    label: 'Medium',
    className: 'border-blue-500/30 text-blue-600 bg-blue-500/10 dark:text-blue-400',
  },
  HIGH: {
    label: 'High',
    className: 'border-orange-500/30 text-orange-600 bg-orange-500/10 dark:text-orange-400',
  },
  URGENT: {
    label: 'Urgent',
    className: 'border-red-500/30 text-red-600 bg-red-500/10 dark:text-red-400',
  },
};

export function PriorityBadge({ priority }: { priority: Task['priority'] }) {
  const config = priorityConfig[priority];
  return (
    <Badge variant="outline" className={cn('text-xs font-medium', config.className)}>
      {config.label}
    </Badge>
  );
}
