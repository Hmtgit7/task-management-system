import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "@config/env";

type JwtPayload = {
  sub: string;
  email: string;
};

export const signAccessToken = (userId: string, email: string): string => {
  return jwt.sign(
    { sub: userId, email },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    } as SignOptions,
  );
};

export const signRefreshToken = (userId: string, email: string): string => {
  return jwt.sign(
    { sub: userId, email },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    } as SignOptions,
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload;
};
