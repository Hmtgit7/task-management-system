// components/tasks/task-card.tsx
"use client";

import { useState } from "react";
import { format, isPast, isToday } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Task } from "@/lib/api/tasks.api";
import { PriorityBadge } from "./priority-badge";
import { StatusBadge } from "./status-badge";
import { useDeleteTask, useToggleTask } from "@/hooks/use-tasks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { cn } from "@/lib/utils";

export function TaskCard({ task }: { task: Task }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { mutate: toggle, isPending: isToggling } = useToggleTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const isCompleted = task.status === "COMPLETED";
  const isOverdue =
    task.dueDate &&
    isPast(new Date(task.dueDate)) &&
    !isCompleted &&
    !isToday(new Date(task.dueDate));

  return (
    <>
      <div
        className={cn(
          "group flex items-start gap-3 rounded-xl border p-4 bg-card transition-all duration-200 hover:shadow-md",
          isCompleted
            ? "border-border/40 opacity-75"
            : "border-border/60 hover:border-primary/30",
        )}
      >
        {/* Toggle button */}
        <button
          onClick={() => toggle(task.id)}
          disabled={isToggling}
          className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/20" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <p
            className={cn(
              "text-sm font-medium leading-snug break-words",
              isCompleted && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            {task.dueDate && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  isOverdue
                    ? "text-destructive font-medium"
                    : "text-muted-foreground",
                )}
              >
                {isOverdue ? (
                  <Clock className="h-3 w-3" />
                ) : (
                  <CalendarDays className="h-3 w-3" />
                )}
                {isOverdue ? "Overdue · " : ""}
                {format(new Date(task.dueDate), "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setShowEdit(true)}>
              <Pencil className="mr-2 h-3.5 w-3.5" />
              Edit task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowDelete(true)}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update the details of your task.
            </DialogDescription>
          </DialogHeader>
          <TaskForm task={task} onSuccess={() => setShowEdit(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{task.title}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDelete(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteTask(task.id, { onSuccess: () => setShowDelete(false) })
              }
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
