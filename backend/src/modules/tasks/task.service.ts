// src/modules/tasks/task.service.ts
import { prisma } from "@config/database";
import { ApiError } from "@utils/ApiError";
import type {
  CreateTaskInput,
  GetTasksQuery,
  UpdateTaskInput,
} from "./task.schema";

// Helper: convert "YYYY-MM-DD" → full ISO DateTime for Prisma
const toISODate = (date?: string): Date | undefined => {
  if (!date || date.trim() === "") return undefined;
  const d = new Date(date);
  // If date is invalid, return undefined rather than crashing
  return isNaN(d.getTime()) ? undefined : d;
};

export const createTask = async (userId: string, input: CreateTaskInput) => {
  const task = await prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      priority: input.priority,
      dueDate: toISODate(input.dueDate),
      userId,
    },
  });
  return task;
};

export const getTasks = async (userId: string, query: GetTasksQuery) => {
  const { page, limit, status, search } = query;
  const skip = (page - 1) * limit;

  const where: any = { userId };

  if (status) {
    where.status = status;
  }
  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getTask = async (userId: string, id: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return task;
};

export const updateTask = async (
  userId: string,
  id: string,
  input: UpdateTaskInput,
) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const updated = await prisma.task.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.priority !== undefined && { priority: input.priority }),
      ...(input.status !== undefined && { status: input.status }),
      // Always process dueDate — even empty string (to clear it)
      dueDate:
        input.dueDate !== undefined ? toISODate(input.dueDate) : undefined,
    },
  });
  return updated;
};

export const deleteTask = async (userId: string, id: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await prisma.task.delete({
    where: { id },
  });
};

export const toggleTask = async (userId: string, id: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

  const updated = await prisma.task.update({
    where: { id },
    data: { status: newStatus },
  });
  return updated;
};
