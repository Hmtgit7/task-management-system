import { prisma } from "@config/database";
import { Prisma } from "@prisma/client";
import { ApiError } from "@utils/ApiError";
import { subDays, startOfDay, format } from "date-fns";
import type {
  CreateTaskInput,
  GetTasksQuery,
  UpdateTaskInput,
} from "./task.schema";

const toISODate = (date?: string): Date | undefined => {
  if (!date || date.trim() === "") return undefined;
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d;
};

// Priority sort order for custom ordering
const PRIORITY_ORDER: Record<string, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export const createTask = async (userId: string, input: CreateTaskInput) => {
  return prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      priority: input.priority,
      dueDate: toISODate(input.dueDate),
      status: input.status,
      userId,
      ...(input.categoryIds?.length && {
        categories: { connect: input.categoryIds.map((id) => ({ id })) },
      }),
    },
    include: { categories: true },
  });
};

export const getTasks = async (userId: string, query: GetTasksQuery) => {
  const {
    page,
    limit,
    status,
    priority,
    sort = "createdAt",
    direction = "desc",
    search,
    category,
  } = query;

  const skip = (page - 1) * limit;
  const where: Prisma.TaskWhereInput = { userId };

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (category) where.categories = { some: { id: category } };

  // priority sort needs in-memory sort (not a DB column order)
  const dbOrderBy =
    sort === "priority"
      ? { createdAt: "desc" as const }
      : { [sort]: direction as "asc" | "desc" };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: dbOrderBy,
      skip,
      take: limit,
      include: { categories: true },
    }),
    prisma.task.count({ where }),
  ]);

  // In-memory priority sort
  const sorted =
    sort === "priority"
      ? [...tasks].sort((a, b) =>
          direction === "asc"
            ? PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
            : PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority],
        )
      : tasks;

  return {
    tasks: sorted,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
};

export const getTask = async (userId: string, id: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
    include: { categories: true },
  });
  if (!task) throw new ApiError(404, "Task not found");
  return task;
};

export const updateTask = async (
  userId: string,
  id: string,
  input: UpdateTaskInput,
) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new ApiError(404, "Task not found");

  const data: Prisma.TaskUpdateInput = {};
  if (input.title !== undefined) data.title = input.title;
  if (input.description !== undefined) data.description = input.description;
  if (input.priority !== undefined) data.priority = input.priority;
  if (input.status !== undefined) data.status = input.status;
  if (input.dueDate !== undefined) data.dueDate = toISODate(input.dueDate);
  if (input.categoryIds !== undefined) {
    data.categories = {
      set: [],
      connect: input.categoryIds.map((cid) => ({ id: cid })),
    };
  }

  return prisma.task.update({
    where: { id },
    data,
    include: { categories: true },
  });
};

export const deleteTask = async (userId: string, id: string) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new ApiError(404, "Task not found");
  await prisma.task.delete({ where: { id } });
};

export const toggleTask = async (userId: string, id: string) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new ApiError(404, "Task not found");
  return prisma.task.update({
    where: { id },
    data: {
      status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
    },
    include: { categories: true },
  });
};

// NEW — Dashboard analytics
export const getAnalytics = async (userId: string) => {
  const now = new Date();
  const sevenDaysAgo = subDays(now, 6);

  const [allTasks, last7Days] = await Promise.all([
    prisma.task.findMany({
      where: { userId },
      select: {
        status: true,
        priority: true,
        dueDate: true,
        createdAt: true,
      },
    }),
    prisma.task.findMany({
      where: { userId, createdAt: { gte: startOfDay(sevenDaysAgo) } },
      select: { createdAt: true, status: true },
    }),
  ]);

  // Status breakdown
  const statusBreakdown = {
    PENDING: allTasks.filter((t) => t.status === "PENDING").length,
    IN_PROGRESS: allTasks.filter((t) => t.status === "IN_PROGRESS").length,
    COMPLETED: allTasks.filter((t) => t.status === "COMPLETED").length,
  };

  // Priority breakdown
  const priorityBreakdown = {
    LOW: allTasks.filter((t) => t.priority === "LOW").length,
    MEDIUM: allTasks.filter((t) => t.priority === "MEDIUM").length,
    HIGH: allTasks.filter((t) => t.priority === "HIGH").length,
    URGENT: allTasks.filter((t) => t.priority === "URGENT").length,
  };

  // Daily tasks for last 7 days
  const dailyMap: Record<string, { created: number; completed: number }> = {};
  for (let i = 6; i >= 0; i--) {
    const day = format(subDays(now, i), "EEE");
    dailyMap[day] = { created: 0, completed: 0 };
  }
  last7Days.forEach((t) => {
    const day = format(new Date(t.createdAt), "EEE");
    if (dailyMap[day]) {
      dailyMap[day].created += 1;
      if (t.status === "COMPLETED") dailyMap[day].completed += 1;
    }
  });
  const daily = Object.entries(dailyMap).map(([day, v]) => ({
    day,
    ...v,
  }));

  // Overdue count
  const overdue = allTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "COMPLETED",
  ).length;

  // Completion rate
  const completionRate = allTasks.length
    ? Math.round((statusBreakdown.COMPLETED / allTasks.length) * 100)
    : 0;

  return {
    total: allTasks.length,
    statusBreakdown,
    priorityBreakdown,
    daily,
    overdue,
    completionRate,
  };
};
