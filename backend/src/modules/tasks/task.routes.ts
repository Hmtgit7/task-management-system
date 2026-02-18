// src/modules/tasks/task.routes.ts
import { Router } from "express";
import { validate } from "@middleware/validate";
import { authenticate } from "@middleware/authenticate";
import {
  createTaskSchema,
  getTasksQuerySchema,
  updateTaskSchema,
} from "./task.schema";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
  toggleTaskHandler,
  updateTaskHandler,
} from "./task.controller";

export const taskRouter = Router();

taskRouter.use(authenticate);

taskRouter.get("/", validate(getTasksQuerySchema), getTasksHandler);
taskRouter.post("/", validate(createTaskSchema), createTaskHandler);
taskRouter.get("/:id", getTaskHandler);
taskRouter.patch("/:id", validate(updateTaskSchema), updateTaskHandler);
taskRouter.delete("/:id", deleteTaskHandler);
taskRouter.patch("/:id/toggle", toggleTaskHandler);
