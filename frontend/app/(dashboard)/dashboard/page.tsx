// app/(dashboard)/dashboard/page.tsx
"use client";

import { useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ClipboardList,
  CheckCircle2,
  Clock,
  ListTodo,
} from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useAuthStore } from "@/store/auth-store";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskListSkeleton } from "@/components/tasks/task-skeleton";
import { TaskForm } from "@/components/tasks/task-form";
import type { Task } from "@/lib/api/tasks.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// install: npm install use-debounce
type StatusFilter = Task["status"] | "ALL";

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "All tasks" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useTasks({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status: statusFilter === "ALL" ? undefined : statusFilter,
  });

  const tasks = data?.data.tasks ?? [];
  const pagination = data?.data.pagination;
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.pages ?? 1;

  // Stats
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;
  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    [],
  );

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value as StatusFilter);
    setPage(1);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting()}, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {total > 0
              ? `You have ${total} task${total !== 1 ? "s" : ""} total`
              : "No tasks yet — create your first one!"}
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="shrink-0 gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total",
            value: total,
            icon: ListTodo,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "In Progress",
            value: inProgressCount,
            icon: Clock,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
          },
          {
            label: "Completed",
            value: completedCount,
            icon: CheckCircle2,
            color: "text-green-500",
            bg: "bg-green-500/10",
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg} shrink-0`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9 h-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters badge */}
      {(debouncedSearch || statusFilter !== "ALL") && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Filters:</span>
          {debouncedSearch && (
            <Badge variant="secondary" className="text-xs gap-1">
              Search: {debouncedSearch}
              <button
                onClick={() => setSearch("")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {statusFilter !== "ALL" && (
            <Badge variant="secondary" className="text-xs gap-1">
              {statusFilter}
              <button
                onClick={() => setStatusFilter("ALL")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Task List */}
      {isLoading ? (
        <TaskListSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-destructive" />
          </div>
          <p className="font-medium">Failed to load tasks</p>
          <p className="text-sm text-muted-foreground">
            Check your connection and try again
          </p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ClipboardList className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-lg">
              {debouncedSearch || statusFilter !== "ALL"
                ? "No tasks match your filters"
                : "No tasks yet"}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {debouncedSearch || statusFilter !== "ALL"
                ? "Try adjusting your search or filters"
                : "Create your first task to get started"}
            </p>
          </div>
          {!debouncedSearch && statusFilter === "ALL" && (
            <Button
              onClick={() => setShowCreate(true)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create your first task
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Create Task Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your list. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <TaskForm onSuccess={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
