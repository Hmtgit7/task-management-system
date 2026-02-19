// src/modules/tasks/task.controller.ts
import type { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  toggleTask,
  updateTask,
} from "./task.service";
import type { CreateTaskInput, UpdateTaskInput } from "./task.schema";

export const createTaskHandler = async (req: Request, res: Response) => {
  const task = await createTask(req.user!.id, req.body as CreateTaskInput);
  res.status(201).json({
    success: true,
    data: task,
  });
};

export const getTasksHandler = async (req: Request, res: Response) => {
  const query = req.query as any;
  const tasks = await getTasks(req.user!.id, query);
  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskHandler = async (req: Request, res: Response) => {
  const task = await getTask(req.user!.id, req.params.id as string);
  res.status(200).json({
    success: true,
    data: task,
  });
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  const updated = await updateTask(
    req.user!.id,
    req.params.id as string,
    req.body as UpdateTaskInput,
  );
  res.status(200).json({
    success: true,
    data: updated,
  });
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  await deleteTask(req.user!.id, req.params.id as string);
  res.status(204).send();
};

export const toggleTaskHandler = async (req: Request, res: Response) => {
  const updated = await toggleTask(req.user!.id, req.params.id as string);
  res.status(200).json({
    success: true,
    data: updated,
  });
};
