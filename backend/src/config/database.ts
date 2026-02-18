// src/config/database.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@config/env";
import { logger } from "@utils/logger";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

prisma
  .$connect()
  .then(() => logger.info("Database connected"))
  .catch((err) => {
    logger.error("Database connection error", { err });
    process.exit(1);
  });

export { prisma };
