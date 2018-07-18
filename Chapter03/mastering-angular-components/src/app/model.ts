export interface Task {
  readonly id?: number;
  readonly title: string;
  readonly done: boolean;
}

export type TaskListFilterType = 'all' | 'open' | 'done';
