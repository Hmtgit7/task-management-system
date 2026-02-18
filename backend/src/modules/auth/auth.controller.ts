// src/modules/auth/auth.controller.ts
import type { Request, Response } from "express";
import {
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
} from "./auth.service";
import type { RegisterInput, LoginInput } from "./auth.schema";

const REFRESH_COOKIE_NAME = "refreshToken";

const setRefreshCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth",
  });
};

export const registerHandler = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await registerUser(
    req.body as RegisterInput,
  );

  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
};

export const loginHandler = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await loginUser(
    req.body as LoginInput,
  );

  setRefreshCookie(res, refreshToken);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
};

export const refreshHandler = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  const {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  } = await refreshTokens(refreshToken);

  setRefreshCookie(res, newRefreshToken);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
};

export const logoutHandler = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (userId) {
    await logoutUser(userId);
  }

  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/auth" });
  res.status(200).json({ success: true });
};
