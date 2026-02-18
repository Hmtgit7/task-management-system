// src/modules/tasks/task.service.ts
import { prisma } from "@config/database";
import { ApiError } from "@utils/ApiError";
import type {
  CreateTaskInput,
  GetTasksQuery,
  UpdateTaskInput,
} from "./task.schema";

export const createTask = async (userId: string, input: CreateTaskInput) => {
  const task = await prisma.task.create({
    data: {
      ...input,
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
    where: {
      id,
      userId,
    },
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
    data: input,
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
