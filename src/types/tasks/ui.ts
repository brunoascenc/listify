export type UiSubtask = { id: string; title: string; done: boolean };

export type UiTaskStatus = 'today' | 'scheduled' | 'overdue';

export type UiTask = {
  id: string;
  title: string;
  dueDateLabel: string;
  dueTimeLabel: string;
  dueDate: Date | null;
  status: UiTaskStatus;
  completed: boolean;
  subtasks: UiSubtask[];
};

export type TaskStats = {
  today: number;
  scheduled: number;
  overdue: number;
  all: number;
};

export type SectionTitleFilter = UiTaskStatus | 'all';
