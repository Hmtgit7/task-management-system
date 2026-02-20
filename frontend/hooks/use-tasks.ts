import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  tasksApi,
  categoriesApi,
  type GetTasksParams,
  type Task,
  type TasksResponse,
} from '@/lib/api/tasks.api';
import { toast } from 'sonner';

export const TASK_KEYS = {
  all: ['tasks'] as const,
  lists: () => [...TASK_KEYS.all, 'list'] as const,
  list: (params: GetTasksParams) => [...TASK_KEYS.lists(), params] as const,
  analytics: () => [...TASK_KEYS.all, 'analytics'] as const,
  categories: () => ['categories'] as const,
};

// ── Paginated task list ──
export function useTasks(params: GetTasksParams = {}) {
  return useQuery({
    queryKey: TASK_KEYS.list(params),
    queryFn: () => tasksApi.getAll(params).then((r) => r.data.data),
    placeholderData: (prev) => prev, // keeps previous data while loading
    staleTime: 30_000,
  });
}

// ── Infinite scroll variant (Phase 1 pagination UX) ──
export function useInfiniteTasks(params: Omit<GetTasksParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: [...TASK_KEYS.lists(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      tasksApi.getAll({ ...params, page: pageParam, limit: 10 }).then((r) => r.data.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    staleTime: 30_000,
  });
}

// ── Analytics ──
export function useAnalytics() {
  return useQuery({
    queryKey: TASK_KEYS.analytics(),
    queryFn: () => tasksApi.getAnalytics().then((r) => r.data.data),
    staleTime: 60_000,
  });
}

// ── Categories ──
export function useCategories() {
  return useQuery({
    queryKey: TASK_KEYS.categories(),
    queryFn: () => categoriesApi.getAll().then((r) => r.data.data),
    staleTime: 120_000,
  });
}

// ── Mutations ──
export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASK_KEYS.all });
      toast.success('Task created!');
    },
    onError: () => toast.error('Failed to create task'),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> & { categoryIds?: string[] } }) =>
      tasksApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASK_KEYS.all });
      toast.success('Task updated!');
    },
    onError: () => toast.error('Failed to update task'),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASK_KEYS.all });
      toast.success('Task deleted');
    },
    onError: () => toast.error('Failed to delete task'),
  });
}

export function useToggleTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.toggle,
    // Optimistic update
    onMutate: async (taskId) => {
      await qc.cancelQueries({ queryKey: TASK_KEYS.lists() });
      const prev = qc.getQueriesData({ queryKey: TASK_KEYS.lists() });
      qc.setQueriesData({ queryKey: TASK_KEYS.lists() }, (old: unknown) => {
        if (!old || typeof old !== 'object' || !('tasks' in old)) return old;
        const typedOld = old as TasksResponse;
        return {
          ...typedOld,
          tasks: typedOld.tasks.map((t: Task) =>
            t.id === taskId
              ? {
                  ...t,
                  status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
                }
              : t
          ),
        };
      });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) {
        ctx.prev.forEach(([key, data]) => qc.setQueryData(key, data));
      }
      toast.error('Failed to update task');
    },
    onSettled: () => qc.invalidateQueries({ queryKey: TASK_KEYS.all }),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASK_KEYS.categories() });
      toast.success('Category created!');
    },
    onError: () => toast.error('Failed to create category'),
  });
}
