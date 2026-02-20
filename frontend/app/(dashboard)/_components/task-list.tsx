// app/(dashboard)/dashboard/_components/task-list.tsx
"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ListChecks } from "lucide-react";
import { TaskCard } from "@/components/tasks/task-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Task, Category } from "@/lib/api/tasks.api";
import { useDeleteTask, useToggleTask } from "@/hooks/use-tasks";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  onEdit: (task: Task) => void;
  categories: Category[];
}

// Intersection observer hook for infinite scroll
function useInfiniteScrollSentinel(callback: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback, enabled]);

  return ref;
}

// Memoized TaskCard row to prevent re-renders
const TaskRow = memo(function TaskRow({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: (t: Task) => void;
}) {
  const { mutate: toggle } = useToggleTask();
  const { mutate: remove } = useDeleteTask();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <TaskCard
        task={task}
        onToggle={() => toggle(task.id)}
        onEdit={() => onEdit(task)}
        onDelete={() => remove(task.id)}
      />
    </motion.div>
  );
});

export function TaskList({
  tasks,
  loading,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
  onEdit,
  categories,
}: TaskListProps) {
  const sentinelRef = useInfiniteScrollSentinel(onFetchNextPage, hasNextPage);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <ListChecks className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="font-semibold text-foreground">No tasks yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{tasks.length}</span>{" "}
          tasks
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onEdit={onEdit} />
        ))}
      </AnimatePresence>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-2" />

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
        </div>
      )}

      {!hasNextPage && tasks.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-4">
          All tasks loaded ✓
        </p>
      )}
    </div>
  );
}
