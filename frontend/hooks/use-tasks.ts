// hooks/use-tasks.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTaskApi,
  deleteTaskApi,
  getTasksApi,
  toggleTaskApi,
  updateTaskApi,
  type GetTasksParams,
} from "@/lib/api/tasks.api";

export const TASKS_KEY = "tasks";

export function useTasks(params: GetTasksParams) {
  return useQuery({
    queryKey: [TASKS_KEY, params],
    queryFn: () => getTasksApi(params),
    staleTime: 30 * 1000,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success("Task created successfully!");
    },
    onError: () => toast.error("Failed to create task. Try again."),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success("Task updated successfully!");
    },
    onError: () => toast.error("Failed to update task. Try again."),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_KEY] });
      toast.success("Task deleted.");
    },
    onError: () => toast.error("Failed to delete task. Try again."),
  });
}

export function useToggleTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleTaskApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
    onError: () => toast.error("Failed to update task status."),
  });
}
