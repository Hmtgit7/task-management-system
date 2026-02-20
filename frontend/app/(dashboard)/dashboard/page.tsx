'use client';

import { Suspense, useState, useCallback, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useAnalytics, useInfiniteTasks, useCategories } from '@/hooks/use-tasks';
import { DashboardHeader } from '../_components/dashboard-header';
import { StatsRow } from '../_components/stats-row';
import { AnalyticsCharts } from '../_components/analytics-charts';
import { OverdueAlert } from '../_components/overdue-alert';
import { TaskFilters } from '../_components/task-filters';
import { TaskList } from '../_components/task-list';
import { TaskFormModal } from '@/components/tasks/task-form-modal';
import { Skeleton } from '@/components/ui/skeleton';
import type { GetTasksParams, Task } from '@/lib/api/tasks.api';

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter state
  const [filters, setFilters] = useState<GetTasksParams>({
    sort: 'createdAt',
    direction: 'desc',
  });
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);

  const activeParams = useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined }),
    [filters, debouncedSearch]
  );

  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: tasksLoading,
  } = useInfiniteTasks(activeParams);

  const { data: categories = [] } = useCategories();

  const tasks = useMemo(() => infiniteData?.pages.flatMap((p) => p.tasks) ?? [], [infiniteData]);

  const handleFilter = useCallback(
    (key: keyof GetTasksParams, value: GetTasksParams[keyof GetTasksParams]) => {
      setFilters((prev) => ({ ...prev, [key]: value || undefined }));
    },
    []
  );

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingTask(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <DashboardHeader onNewTask={() => setShowForm(true)} />

        {/* Stats */}
        <Suspense fallback={<StatsRowSkeleton />}>
          <StatsRow analytics={analytics} loading={analyticsLoading} />
        </Suspense>

        {/* Overdue Alert */}
        {analytics && analytics.overdue > 0 && (
          <OverdueAlert
            count={analytics.overdue}
            onView={() => handleFilter('status', 'PENDING')}
          />
        )}

        {/* Charts */}
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsCharts analytics={analytics} loading={analyticsLoading} />
        </Suspense>

        {/* Filters */}
        <TaskFilters
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFilterChange={handleFilter}
          categories={categories}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={tasksLoading}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onFetchNextPage={fetchNextPage}
          onEdit={handleEdit}
          categories={categories}
        />
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        open={showForm}
        onClose={handleCloseForm}
        task={editingTask}
        categories={categories}
      />
    </div>
  );
}

function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}
