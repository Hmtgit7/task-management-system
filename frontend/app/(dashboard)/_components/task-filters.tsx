'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { Category, GetTasksParams } from '@/lib/api/tasks.api';

interface TaskFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  filters: GetTasksParams;
  onFilterChange: (key: keyof GetTasksParams, value: GetTasksParams[keyof GetTasksParams]) => void;
  categories: Category[];
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
];

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

export function TaskFilters({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  categories,
}: TaskFiltersProps) {
  const activeFilterCount = [filters.status, filters.priority, filters.category].filter(
    Boolean
  ).length;

  const clearAll = () => {
    onFilterChange('status', undefined);
    onFilterChange('priority', undefined);
    onFilterChange('category', undefined);
    onSearchChange('');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 bg-secondary/50 border-border/60"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status */}
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(v) => onFilterChange('status', v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-full sm:w-[148px] h-10 bg-secondary/50 border-border/60">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select
          value={filters.priority ?? 'all'}
          onValueChange={(v) => onFilterChange('priority', v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-full sm:w-[148px] h-10 bg-secondary/50 border-border/60">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            {PRIORITY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sort ?? 'createdAt'}
          onValueChange={(v) => onFilterChange('sort', v)}
        >
          <SelectTrigger className="w-full sm:w-[148px] h-10 bg-secondary/50 border-border/60">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories row + active filters */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground">Categories:</span>

        <button
          onClick={() => onFilterChange('category', undefined)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
            !filters.category
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border/60 text-muted-foreground hover:border-border'
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              onFilterChange('category', filters.category === cat.id ? undefined : cat.id)
            }
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1.5 ${
              filters.category === cat.id
                ? 'border-transparent text-white'
                : 'border-border/60 text-muted-foreground hover:border-border'
            }`}
            style={
              filters.category === cat.id
                ? { background: cat.color + 'cc', borderColor: cat.color }
                : {}
            }
          >
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: cat.color }} />
            {cat.name}
          </button>
        ))}

        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto"
          >
            <X className="h-3 w-3" /> Clear all ({activeFilterCount})
          </button>
        )}
      </div>
    </div>
  );
}
