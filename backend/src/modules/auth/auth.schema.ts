import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).max(72),
  name: z.string().min(2).max(50).optional(),
});

export const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).max(72),
});

export const refreshSchema = z.object({
  // no body – refresh from cookie only, but kept for future extensibility
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
