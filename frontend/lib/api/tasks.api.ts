import api from '../api';

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface GetTasksParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  sort?: 'createdAt' | 'dueDate' | 'priority';
  direction?: 'asc' | 'desc';
  search?: string;
  category?: string;
}

export interface Analytics {
  total: number;
  statusBreakdown: { PENDING: number; IN_PROGRESS: number; COMPLETED: number };
  priorityBreakdown: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    URGENT: number;
  };
  daily: { day: string; created: number; completed: number }[];
  overdue: number;
  completionRate: number;
}

export const tasksApi = {
  getAll: (params?: GetTasksParams) =>
    api.get<{ success: true; data: TasksResponse }>('/tasks', { params }),

  getOne: (id: string) => api.get<{ success: true; data: Task }>(`/tasks/${id}`),

  create: (data: Partial<Task> & { categoryIds?: string[] }) =>
    api.post<{ success: true; data: Task }>('/tasks', data),

  update: (id: string, data: Partial<Task> & { categoryIds?: string[] }) =>
    api.patch<{ success: true; data: Task }>(`/tasks/${id}`, data),

  delete: (id: string) => api.delete(`/tasks/${id}`),

  toggle: (id: string) => api.patch<{ success: true; data: Task }>(`/tasks/${id}/toggle`),

  getAnalytics: () => api.get<{ success: true; data: Analytics }>('/tasks/analytics'),
};

export const categoriesApi = {
  getAll: () => api.get<{ success: true; data: Category[] }>('/categories'),

  create: (data: { name: string; color: string }) =>
    api.post<{ success: true; data: Category }>('/categories', data),

  delete: (id: string) => api.delete(`/categories/${id}`),
};
