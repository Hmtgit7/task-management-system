import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { env } from "@config/env";
import { logger, morganStream } from "@utils/logger";
import { errorHandler } from "@middleware/errorHandler";
import { notFoundHandler } from "@middleware/notFound";
import { authRouter } from "@modules/auth/auth.routes";
import { taskRouter } from "@modules/tasks/task.routes";
// Add alongside taskRouter:
import { categoryRouter } from "@modules/categories/category.routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan(env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: morganStream,
  }),
);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
// 404 handler
app.use(notFoundHandler);

// Centralized error handler (must be last)
app.use(errorHandler);

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason });
});
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", { error });
});
