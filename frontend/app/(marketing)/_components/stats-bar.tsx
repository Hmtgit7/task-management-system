// app/(marketing)/_components/stats-bar.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Tasks Completed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "User Rating" },
];

export function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-12 border-y border-border dark:border-white/5 bg-muted/20 dark:bg-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-3xl font-bold text-gradient">
                {stat.value}
              </span>
              <span className="text-sm text-foreground/40 dark:text-white/40">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
