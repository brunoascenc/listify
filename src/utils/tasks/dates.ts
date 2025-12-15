import { format, isValid, parse } from 'date-fns';
import { Task } from '@/types/tasks/domain';
import { UiTaskStatus } from '@/types/tasks/ui';

const DATE_TIME_DISPLAY = 'dd/MM/yyyy HH:mm';

export const normalizeDueDate = (value: Task['dueDate']) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof (value as { toDate?: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date(value as unknown as string | number);
};

export const getTaskStatus = (
  dueDate: Date | null,
  now: Date = new Date(),
): UiTaskStatus => {
  if (!dueDate) return 'today';

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
  );

  if (dueDay.getTime() > today.getTime()) return 'scheduled';
  if (dueDay.getTime() < today.getTime()) return 'overdue';
  return 'today';
};

export const formatDueLabel = (dueDate: Date | null) => {
  if (!dueDate) {
    return {
      dateLabel: 'Sem data',
      timeLabel: '',
    };
  }
  return {
    dateLabel: format(dueDate, 'dd/MM/yyyy'),
    timeLabel: format(dueDate, 'HH:mm'),
  };
};

export const parseDateTimeInput = (value?: string) => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const formats = [DATE_TIME_DISPLAY];

  for (const mask of formats) {
    const parsed = parse(trimmed, mask, new Date());
    if (isValid(parsed)) return parsed;
  }

  const native = new Date(trimmed);
  if (isValid(native)) return native;

  return undefined;
};

export const formatDateTimeDisplay = (date: Date) =>
  format(date, DATE_TIME_DISPLAY);
