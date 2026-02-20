'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LogIn, ListChecks, TrendingUp } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: LogIn,
    title: 'Create your account',
    description: 'Sign up in seconds — no credit card required. Your workspace is ready instantly.',
    color: 'from-fuchsia-500 to-violet-500',
    glow: 'shadow-fuchsia-500/25',
  },
  {
    step: '02',
    icon: ListChecks,
    title: 'Add & organize tasks',
    description:
      'Create tasks with priority, due dates, and categories. Filter and search instantly.',
    color: 'from-violet-500 to-blue-500',
    glow: 'shadow-violet-500/25',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'Track your progress',
    description:
      'Watch your completion rate grow. Spot overdue tasks and hit your goals every week.',
    color: 'from-cyan-500 to-emerald-500',
    glow: 'shadow-cyan-500/25',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 px-4 sm:px-6 bg-muted/5 dark:bg-white/[0.01]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3 block">
            Simple by design
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get started in <span className="text-gradient">3 simple steps</span>
          </h2>
          <p className="text-foreground/40 dark:text-white/40 max-w-lg mx-auto text-sm sm:text-base">
            No onboarding calls, no complex setup. Just sign up and start moving tasks forward.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-px top-8 bottom-8 w-px bg-gradient-to-b from-fuchsia-500/30 via-violet-500/30 to-cyan-500/30" />

          <div className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative lg:flex lg:items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`lg:w-[45%] ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}
                  >
                    <div className="glass-dark rounded-2xl p-6 border border-border dark:border-white/[0.06] hover:border-border/60 dark:hover:border-white/[0.12] transition-colors">
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg ${step.glow} mb-4 ${isEven ? 'lg:ml-auto' : ''}`}
                      >
                        <step.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/40 dark:text-white/40 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step number bubble (center) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-background dark:bg-[#080810] border-2 border-violet-500/50 z-10">
                    <span className="text-xs font-bold text-gradient">{step.step}</span>
                  </div>

                  {/* Spacer on opposite side */}
                  <div className="hidden lg:block lg:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
