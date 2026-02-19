// lib/api/auth.api.ts
import api from "@/lib/api";

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export type AuthResponse = {
  success: boolean;
  data: {
    user: AuthUser;
    accessToken: string;
  };
};

export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: {
  name?: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout");
};
