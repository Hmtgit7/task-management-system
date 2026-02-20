'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Analytics } from '@/lib/api/tasks.api';

const statConfig = [
  {
    key: 'total' as const,
    label: 'Total Tasks',
    icon: TrendingUp,
    gradient: 'from-fuchsia-500/20 to-violet-500/20',
    iconColor: 'text-fuchsia-400',
    getValue: (a: Analytics) => a.total.toString(),
    getSub: (a: Analytics) => `${a.statusBreakdown.IN_PROGRESS} in progress`,
  },
  {
    key: 'completed' as const,
    label: 'Completed',
    icon: CheckCircle2,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    getValue: (a: Analytics) => a.statusBreakdown.COMPLETED.toString(),
    getSub: (a: Analytics) => `${a.completionRate}% completion rate`,
  },
  {
    key: 'pending' as const,
    label: 'Pending',
    icon: Clock,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    getValue: (a: Analytics) => a.statusBreakdown.PENDING.toString(),
    getSub: (a: Analytics) => `${a.statusBreakdown.IN_PROGRESS} in progress`,
  },
  {
    key: 'overdue' as const,
    label: 'Overdue',
    icon: AlertTriangle,
    gradient: 'from-rose-500/20 to-orange-500/20',
    iconColor: 'text-rose-400',
    getValue: (a: Analytics) => a.overdue.toString(),
    getSub: (a: Analytics) => (a.overdue === 0 ? 'All on track! 🎉' : 'Need attention'),
  },
];

export function StatsRow({
  analytics,
  loading,
}: {
  analytics: Analytics | undefined;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map((stat, i) => {
        const Icon = stat.icon;
        const value = analytics ? stat.getValue(analytics) : '0';
        const sub = analytics ? stat.getSub(analytics) : '—';

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="border-border/60 hover:border-border transition-colors group overflow-hidden relative">
              {/* Gradient top accent */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${stat.gradient.replace('/20', '')}`}
              />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                  >
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-0.5">{value}</p>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground/60 mt-1 truncate">{sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
