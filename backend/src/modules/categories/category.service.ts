import { prisma } from "@config/database";
import { ApiError } from "@utils/ApiError";
import type { CreateCategoryInput } from "./category.schema";

export const getCategories = async (userId: string) =>
  prisma.category.findMany({ where: { userId }, orderBy: { name: "asc" } });

export const createCategory = async (
  userId: string,
  input: CreateCategoryInput,
) => {
  const exists = await prisma.category.findFirst({
    where: { userId, name: input.name },
  });
  if (exists) throw new ApiError(409, "Category already exists");
  return prisma.category.create({ data: { ...input, userId } });
};

export const deleteCategory = async (userId: string, id: string) => {
  const cat = await prisma.category.findFirst({ where: { id, userId } });
  if (!cat) throw new ApiError(404, "Category not found");
  await prisma.category.delete({ where: { id } });
};
