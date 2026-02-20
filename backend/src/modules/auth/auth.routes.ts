import { Router } from "express";
import { validate } from "@middleware/validate";
import { loginSchema, registerSchema } from "./auth.schema";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from "./auth.controller";
import { authenticate } from "@middleware/authenticate";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerHandler);
authRouter.post("/login", validate(loginSchema), loginHandler);
authRouter.post("/refresh", refreshHandler);
authRouter.post("/logout", authenticate, logoutHandler);
