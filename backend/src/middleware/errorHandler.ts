// src/middleware/errorHandler.ts
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "@utils/ApiError";
import { logger } from "@utils/logger";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
  }

  logger.error("API Error", {
    statusCode,
    message,
    stack: err instanceof Error ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};
