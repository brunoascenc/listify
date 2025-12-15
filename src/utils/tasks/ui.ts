import { UiTaskStatus } from '@/types/tasks/ui';

type Filter = UiTaskStatus | 'all';

const titles: Record<Filter, string> = {
  all: 'Todas as tarefas',
  today: 'Tarefas do dia',
  scheduled: 'Tarefas agendadas',
  overdue: 'Tarefas atrasadas',
};

export const sectionTitle = (value: Filter) => titles[value];
