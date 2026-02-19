// components/tasks/task-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { taskSchema, type TaskFormData } from "@/lib/validations/task";
import { useCreateTask, useUpdateTask } from "@/hooks/use-tasks";
import type { Task } from "@/lib/api/tasks.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
}

export function TaskForm({ task, onSuccess }: TaskFormProps) {
  const isEdit = !!task;
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? "MEDIUM",
      dueDate: task?.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [task, reset]);

  const onSubmit = (data: TaskFormData) => {
    const payload = {
      title: data.title,
      description: data.description || undefined,
      priority: data.priority || "MEDIUM",
      dueDate: data.dueDate || undefined,
    };

    if (isEdit) {
      updateTask({ id: task.id, data: payload }, { onSuccess });
    } else {
      createTask(payload, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="What needs to be done?"
          disabled={isPending}
          className={cn("h-11", errors.title && "border-destructive")}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">
          Description{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <textarea
          id="description"
          placeholder="Add more details about this task..."
          disabled={isPending}
          rows={3}
          className={cn(
            "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            errors.description && "border-destructive",
          )}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Priority & Due Date */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Priority</Label>
          <Select
            defaultValue={task?.priority ?? "MEDIUM"}
            onValueChange={(v) =>
              setValue("priority", v as TaskFormData["priority"])
            }
            disabled={isPending}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">🟢 Low</SelectItem>
              <SelectItem value="MEDIUM">🔵 Medium</SelectItem>
              <SelectItem value="HIGH">🟠 High</SelectItem>
              <SelectItem value="URGENT">🔴 Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dueDate">
            Due Date{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Input
            id="dueDate"
            type="date"
            disabled={isPending}
            className="h-11"
            {...register("dueDate")}
          />
        </div>
      </div>

      {/* Status (edit only) */}
      {isEdit && (
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select
            defaultValue={task.status}
            onValueChange={(v) =>
              updateTask({
                id: task.id,
                data: { status: v as Task["status"] },
              })
            }
            disabled={isPending}
          >
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" className="w-full h-11" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEdit ? "Saving..." : "Creating..."}
          </>
        ) : isEdit ? (
          "Save changes"
        ) : (
          "Create task"
        )}
      </Button>
    </form>
  );
}
