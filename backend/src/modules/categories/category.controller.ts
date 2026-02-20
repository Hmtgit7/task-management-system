import type { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "./category.service";
import type { CreateCategoryInput } from "./category.schema";

export const getCategoriesHandler = async (req: Request, res: Response) => {
  const data = await getCategories(req.user!.id);
  res.json({ success: true, data });
};

export const createCategoryHandler = async (req: Request, res: Response) => {
  const data = await createCategory(
    req.user!.id,
    req.body as CreateCategoryInput,
  );
  res.status(201).json({ success: true, data });
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  await deleteCategory(req.user!.id, req.params.id as string);
  res.status(204).send();
};
