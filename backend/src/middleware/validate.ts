import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";
import { ApiError } from "@utils/ApiError";

export const validate =
  (schema: ZodObject, target: "body" | "query" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(target === "query" ? req.query : req.body);
    if (!result.success) {
      throw new ApiError(400, "Invalid request data");
    }

    // Type assertion needed because Zod output doesn't match Express types exactly
    if (target === "query") {
      (req.query as any) = result.data;
    } else {
      req.body = result.data as any;
    }
    return next();
  };
