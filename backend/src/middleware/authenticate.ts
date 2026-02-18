// src/middleware/authenticate.ts
import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "@utils/jwt";
import { ApiError } from "@utils/ApiError";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Missing or invalid authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
    };
    return next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};
