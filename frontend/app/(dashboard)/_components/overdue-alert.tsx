// app/(dashboard)/dashboard/_components/overdue-alert.tsx
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OverdueAlert({
  count,
  onView,
}: {
  count: number;
  onView: () => void;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400"
    >
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <p className="text-sm flex-1">
        <span className="font-semibold">
          {count} task{count > 1 ? "s are" : " is"} overdue.
        </span>{" "}
        <span className="text-rose-400/70">Review them to stay on track.</span>
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={onView}
        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h-7 px-2 text-xs gap-1"
      >
        View <ArrowRight className="h-3 w-3" />
      </Button>
      <button
        onClick={() => setDismissed(true)}
        className="text-rose-400/50 hover:text-rose-400 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
