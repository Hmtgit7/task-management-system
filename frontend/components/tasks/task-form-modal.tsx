// components/tasks/task-form-modal.tsx
"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTask, useUpdateTask } from "@/hooks/use-tasks";
import type { Category, Task } from "@/lib/api/tasks.api";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  dueDate: z.string().optional(),
  categoryIds: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  categories: Category[];
}

export function TaskFormModal({ open, onClose, task, categories }: Props) {
  const isEdit = !!task;
  const { mutate: create, isPending: creating } = useCreateTask();
  const { mutate: update, isPending: updating } = useUpdateTask();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const selectedCategoryIds = watch("categoryIds");

  useEffect(() => {
    if (open) {
      reset({
        title: task?.title ?? "",
        description: task?.description ?? "",
        priority: task?.priority ?? "LOW",
        status: task?.status ?? "PENDING",
        dueDate: task?.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        categoryIds: task?.categories?.map((c) => c.id) ?? [],
      });
    }
  }, [open, task, reset]);

  const onSubmit = (data: FormData) => {
    if (isEdit) {
      update({ id: task!.id, data }, { onSuccess: onClose });
    } else {
      create(data, { onSuccess: onClose });
    }
  };

  const toggleCategory = (id: string) => {
    const current = selectedCategoryIds ?? [];
    setValue(
      "categoryIds",
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md border-border/60 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-lg font-semibold">
            {isEdit ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              {...register("title")}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="desc" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="desc"
              placeholder="Add more details..."
              rows={2}
              {...register("description")}
              className="resize-none"
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["LOW", "MEDIUM", "HIGH", "URGENT"].map((p) => (
                        <SelectItem key={p} value={p}>
                          {p.charAt(0) + p.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Due date */}
          <div className="space-y-1.5">
            <Label htmlFor="dueDate" className="text-sm font-medium">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="h-9"
            />
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategoryIds?.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all"
                      style={{
                        borderColor: isActive
                          ? cat.color
                          : "rgba(255,255,255,0.1)",
                        background: isActive ? cat.color + "33" : "transparent",
                        color: isActive ? cat.color : undefined,
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: cat.color }}
                      />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border/40">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={creating || updating}
              className="flex-1 bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white border-0"
            >
              {creating || updating
                ? "Saving..."
                : isEdit
                  ? "Update Task"
                  : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
