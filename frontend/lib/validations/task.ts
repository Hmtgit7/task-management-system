// lib/validations/task.ts
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().max(1000).optional().or(z.literal("")),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.string().optional().or(z.literal("")),
});

export type TaskFormData = z.infer<typeof taskSchema>;
