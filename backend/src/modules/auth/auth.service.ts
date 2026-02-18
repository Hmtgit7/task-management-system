// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import { prisma } from "@config/database";
import { ApiError } from "@utils/ApiError";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@utils/jwt";
import type { LoginInput, RegisterInput } from "./auth.schema";

const SALT_ROUNDS = 10;

export const registerUser = async (input: RegisterInput) => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      name: input.name,
    },
  });

  const accessToken = signAccessToken(user.id, user.email);
  const refreshToken = signRefreshToken(user.id, user.email);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { user, accessToken, refreshToken };
};

export const loginUser = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = signAccessToken(user.id, user.email);
  const refreshToken = signRefreshToken(user.id, user.email);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { user, accessToken, refreshToken };
};

export const refreshTokens = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    throw new ApiError(401, "Missing refresh token");
  }

  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
  });
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = signAccessToken(user.id, user.email);
  const newRefreshToken = signRefreshToken(user.id, user.email);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newRefreshToken },
  });

  return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};
