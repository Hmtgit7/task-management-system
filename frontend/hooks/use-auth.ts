// hooks/use-auth.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginApi, logoutApi, registerApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth-store";

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth(data.data.user, data.data.accessToken);
      toast.success(
        `Welcome back, ${data.data.user.name || data.data.user.email}!`,
      );
      // Use window.location.href to ensure middleware re-runs
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setAuth(data.data.user, data.data.accessToken);
      toast.success("Account created! Welcome to TaskFlow 🎉");
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      toast.success("Signed out successfully");
      router.push("/");
    },
    onError: () => {
      // Force logout even on API failure
      logout();
      router.push("/");
    },
  });
}
