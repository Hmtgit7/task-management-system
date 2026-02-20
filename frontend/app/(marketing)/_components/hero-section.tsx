// app/(marketing)/_components/hero-section.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  },
});

// Mini kanban mockup component
function KanbanMockup() {
  const columns = [
    {
      title: "To Do",
      color: "bg-slate-500/20 border-slate-500/30",
      tasks: ["Design new landing", "API integration"],
    },
    {
      title: "In Progress",
      color: "bg-fuchsia-500/20 border-fuchsia-500/30",
      tasks: ["Dashboard redesign", "Auth flow"],
    },
    {
      title: "Completed",
      color: "bg-emerald-500/20 border-emerald-500/30",
      tasks: ["Setup backend", "DB schema"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 blur-3xl -z-10 scale-110" />

      <div className="glass-dark rounded-2xl p-4 sm:p-6 shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border dark:border-white/10">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-foreground/40 dark:text-white/40 font-medium">
            TaskFlow Dashboard
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {columns.map((col) => (
            <div
              key={col.title}
              className={`rounded-xl border p-3 ${col.color}`}
            >
              <p className="text-xs font-semibold text-foreground/70 dark:text-white/70 mb-2">
                {col.title}
              </p>
              <div className="space-y-2">
                {col.tasks.map((t) => (
                  <div
                    key={t}
                    className="bg-foreground/5 dark:bg-white/5 rounded-lg p-2 border border-border dark:border-white/10"
                  >
                    <p className="text-xs text-foreground/80 dark:text-white/80 leading-tight">{t}</p>
                    <div className="mt-1.5 flex gap-1">
                      <div className="h-1 w-8 rounded-full bg-fuchsia-500/50" />
                      <div className="h-1 w-5 rounded-full bg-foreground/20 dark:bg-white/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-fuchsia-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)}>
            <Badge className="bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 px-4 py-1.5 text-xs font-medium hover:bg-fuchsia-500/20 transition-colors gap-1.5">
              <Sparkles className="h-3 w-3" />
              Now with AI-powered task suggestions
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl"
          >
            Simplify Work. <span className="text-gradient">Empower Teams.</span>
            <br />
            Track Tasks{" "}
            <span className="relative">
              Smarter.
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-foreground/50 dark:text-white/50 max-w-xl leading-relaxed"
          >
            TaskFlow helps teams organize projects, hit deadlines, and boost
            productivity — all in one beautifully designed place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white border-0 shadow-xl shadow-fuchsia-500/30 text-sm font-semibold group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-border dark:border-white/10 bg-foreground/5 dark:bg-white/5 text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white text-sm font-semibold"
              >
                Sign in to dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.p {...fadeUp(0.5)} className="text-xs text-foreground/30 dark:text-white/30">
            No credit card required · Free forever plan · Setup in 2 minutes
          </motion.p>

          {/* Mockup */}
          <motion.div {...fadeUp(0.5)} className="w-full mt-4">
            <KanbanMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
