// app/(dashboard)/dashboard/_components/analytics-charts.tsx
"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Analytics } from "@/lib/api/tasks.api";

// Custom tooltip
interface BarTooltipPayload {
  name: string;
  value: number;
  color: string;
}
interface BarTooltipProps {
  active?: boolean;
  payload?: BarTooltipPayload[];
  label?: string;
}
interface PieTooltipPayload {
  name: string;
  value: number;
  payload: { fill: string };
}
interface PieTooltipProps {
  active?: boolean;
  payload?: PieTooltipPayload[];
}

function CustomBarTooltip({ active, payload, label }: BarTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="capitalize">
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }: PieTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold" style={{ color: payload[0].payload.fill }}>
        {payload[0].name}: {payload[0].value}
      </p>
    </div>
  );
}

export function AnalyticsCharts({
  analytics,
  loading,
}: {
  analytics: Analytics | undefined;
  loading: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const tickColor = resolvedTheme === "dark" ? "#94a3b8" : "#64748b";

  const statusData = useMemo(
    () => [
      {
        name: "Pending",
        value: analytics?.statusBreakdown.PENDING ?? 0,
        fill: "#818cf8",
      },
      {
        name: "In Progress",
        value: analytics?.statusBreakdown.IN_PROGRESS ?? 0,
        fill: "#f472b6",
      },
      {
        name: "Completed",
        value: analytics?.statusBreakdown.COMPLETED ?? 0,
        fill: "#34d399",
      },
    ],
    [analytics],
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      {/* Bar chart — 7-day activity */}
      <Card className="lg:col-span-2 border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            7-Day Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pr-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={analytics?.daily ?? []}
              barGap={4}
              margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
            >
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: tickColor }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: tickColor }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomBarTooltip />}
                cursor={{
                  fill:
                    resolvedTheme === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                  radius: 6,
                }}
              />
              <Bar
                dataKey="created"
                name="Created"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="completed"
                name="Completed"
                fill="#34d399"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 px-2">
            {[
              { color: "#8b5cf6", label: "Created" },
              { color: "#34d399", label: "Completed" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: l.color }}
                />
                <span className="text-xs text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Donut chart — status breakdown */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Task Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-0">
          <div className="relative">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-foreground">
                {analytics?.completionRate ?? 0}%
              </span>
              <span className="text-[10px] text-muted-foreground">done</span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full space-y-2 mt-2">
            {statusData.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: s.fill }}
                  />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-semibold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
