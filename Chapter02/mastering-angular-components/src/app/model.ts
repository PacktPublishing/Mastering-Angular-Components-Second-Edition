export interface Task {
  id?: number;
  title: string;
  done: boolean;
}

export type TaskListFilterType = 'all' | 'open' | 'done';
