import { z } from "zod";

const taskBaseSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  dueDate: z.string().optional().or(z.literal("")),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
  // New: category IDs array
  categoryIds: z.array(z.string()).optional(),
});

export const createTaskSchema = taskBaseSchema;
export const updateTaskSchema = taskBaseSchema.partial();

export const getTasksQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  sort: z.enum(["createdAt", "dueDate", "priority"]).optional(),
  direction: z.enum(["asc", "desc"]).optional(),
  search: z.string().max(100).optional(),
  // New: category filter
  category: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>;
