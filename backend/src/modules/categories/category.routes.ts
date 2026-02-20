import { Router } from "express";
import { authenticate } from "@middleware/authenticate";
import { validate } from "@middleware/validate";
import { createCategorySchema } from "./category.schema";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
} from "./category.controller";

export const categoryRouter = Router();
categoryRouter.use(authenticate);
categoryRouter.get("/", getCategoriesHandler);
categoryRouter.post("/", validate(createCategorySchema), createCategoryHandler);
categoryRouter.delete("/:id", deleteCategoryHandler);
