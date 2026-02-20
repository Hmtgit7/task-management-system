// app/(dashboard)/dashboard/_components/dashboard-header.tsx
"use client";

import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function DashboardHeader({ onNewTask }: { onNewTask: () => void }) {
  const user = useAuthStore((s) => s.user);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {greeting},{" "}
          <span className="text-gradient">
            {user?.name?.split(" ")[0] ?? "there"}!
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&apos;s your productivity overview for today.
        </p>
      </div>

      <Button
        onClick={onNewTask}
        className="h-10 px-5 bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white border-0 shadow-lg shadow-fuchsia-500/25 gap-2 self-start sm:self-auto"
      >
        <Plus className="h-4 w-4" />
        New Task
      </Button>
    </motion.div>
  );
}
