// src/utils/logger.ts
import { createLogger, format, transports } from "winston";
import type { StreamOptions } from "morgan";
import { env } from "@config/env";

const { combine, timestamp, printf, colorize, json } = format;

const devFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, ...meta }) => {
    return `[${timestamp}] ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  }),
);

const prodFormat = combine(timestamp(), json());

export const logger = createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: env.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [new transports.Console()],
});

export const morganStream: StreamOptions = {
  write: (message: string) => {
    logger.http ? logger.http(message.trim()) : logger.info(message.trim());
  },
};
