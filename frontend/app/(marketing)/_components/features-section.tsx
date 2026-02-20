'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LayoutDashboard, Tags, Bell, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive Dashboard',
    description:
      "Get a bird's-eye view of all your tasks, deadlines, and progress in one clean interface.",
    gradient: 'from-fuchsia-500/20 to-violet-500/20',
    iconColor: 'text-fuchsia-400',
    border: 'hover:border-fuchsia-500/30',
  },
  {
    icon: Tags,
    title: 'Smart Categories',
    description:
      'Organize tasks with color-coded categories and tags. Filter by Work, Personal, Health, and more.',
    gradient: 'from-violet-500/20 to-blue-500/20',
    iconColor: 'text-violet-400',
    border: 'hover:border-violet-500/30',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Track completion rates, spot bottlenecks, and visualize your productivity trends over time.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
  },
  {
    icon: Bell,
    title: 'Deadline Tracking',
    description:
      'Never miss a deadline. Get smart alerts for overdue and upcoming tasks automatically.',
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    border: 'hover:border-orange-500/30',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimistic updates, real-time sync, and instant search — everything responds instantly.',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
    border: 'hover:border-yellow-500/30',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'JWT auth, encrypted tokens, rate limiting, and per-user data isolation out of the box.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-fuchsia-400 tracking-widest uppercase mb-3 block">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Powerful Features For <span className="text-gradient">Seamless Productivity</span>
          </h2>
          <p className="text-foreground/40 dark:text-white/40 max-w-xl mx-auto text-sm sm:text-base">
            Work smarter with tools that keep tasks clear and progress visible.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`glass-dark rounded-2xl p-6 group cursor-default border border-border dark:border-white/[0.06] ${feat.border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feat.gradient} mb-4`}
              >
                <feat.icon className={`h-5 w-5 ${feat.iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-foreground dark:text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-foreground/40 dark:text-white/40 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
