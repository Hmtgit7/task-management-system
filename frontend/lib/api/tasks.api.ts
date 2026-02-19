// lib/api/tasks.api.ts
import api from "@/lib/api";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TasksResponse = {
  success: boolean;
  data: {
    tasks: Task[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  priority?: Task["priority"];
  dueDate?: string;
};

export type UpdateTaskPayload = Partial<CreateTaskPayload> & {
  status?: Task["status"];
};

export type GetTasksParams = {
  page?: number;
  limit?: number;
  status?: Task["status"];
  search?: string;
};

export const getTasksApi = async (
  params: GetTasksParams,
): Promise<TasksResponse> => {
  const res = await api.get<TasksResponse>("/tasks", { params });
  return res.data;
};

export const getTaskApi = async (
  id: string,
): Promise<{ success: boolean; data: Task }> => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const createTaskApi = async (
  data: CreateTaskPayload,
): Promise<{ success: boolean; data: Task }> => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTaskApi = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateTaskPayload;
}): Promise<{ success: boolean; data: Task }> => {
  const res = await api.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTaskApi = async (
  id: string,
): Promise<{ success: boolean; data: Task }> => {
  const res = await api.patch(`/tasks/${id}/toggle`);
  return res.data;
};
