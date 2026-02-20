'use client';

import { memo } from 'react';
import { format, isPast } from 'date-fns';
import { Calendar, CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/lib/api/tasks.api';

const PRIORITY_CONFIG = {
  LOW: {
    label: 'Low',
    class: 'bg-slate-500/10  text-slate-400  border-slate-500/20',
  },
  MEDIUM: {
    label: 'Medium',
    class: 'bg-blue-500/10   text-blue-400   border-blue-500/20',
  },
  HIGH: {
    label: 'High',
    class: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  URGENT: {
    label: 'Urgent',
    class: 'bg-rose-500/10   text-rose-400   border-rose-500/20',
  },
};

const STATUS_CONFIG = {
  PENDING: { label: 'Pending', class: 'bg-slate-500/10  text-slate-400' },
  IN_PROGRESS: {
    label: 'In Progress',
    class: 'bg-fuchsia-500/10 text-fuchsia-400',
  },
  COMPLETED: {
    label: 'Completed',
    class: 'bg-emerald-500/10 text-emerald-400',
  },
};

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard = memo(function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const isCompleted = task.status === 'COMPLETED';
  const isOverdue = !isCompleted && task.dueDate && isPast(new Date(task.dueDate));

  const priority = PRIORITY_CONFIG[task.priority];
  const status = STATUS_CONFIG[task.status];

  return (
    <Card
      className={cn(
        'group border border-border/60 hover:border-border transition-all duration-200 hover:shadow-md',
        isCompleted && 'opacity-60',
        isOverdue && 'border-rose-500/30 bg-rose-500/[0.02]'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Toggle button */}
          <button
            onClick={onToggle}
            className={cn(
              'mt-0.5 shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
              isCompleted
                ? 'border-emerald-500 text-emerald-500'
                : 'border-muted-foreground/40 hover:border-primary'
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4 w-4 fill-emerald-500 text-white" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-transparent" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p
                className={cn(
                  'font-medium text-sm leading-tight',
                  isCompleted && 'line-through text-muted-foreground'
                )}
              >
                {task.title}
              </p>

              {/* Actions — show on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={onEdit}
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={onDelete}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {task.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <Badge variant="outline" className={cn('text-xs border px-2 py-0', priority.class)}>
                {priority.label}
              </Badge>
              <Badge variant="secondary" className={cn('text-xs px-2 py-0', status.class)}>
                {status.label}
              </Badge>

              {/* Categories */}
              {task.categories?.map((cat) => (
                <Badge
                  key={cat.id}
                  className="text-xs px-2 py-0 text-white border-0"
                  style={{ background: cat.color + 'cc' }}
                >
                  {cat.name}
                </Badge>
              ))}

              {/* Due date */}
              {task.dueDate && (
                <span
                  className={cn(
                    'flex items-center gap-1 text-xs ml-auto',
                    isOverdue ? 'text-rose-400 font-medium' : 'text-muted-foreground'
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {isOverdue ? 'Overdue · ' : ''}
                  {format(new Date(task.dueDate), 'MMM d')}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
