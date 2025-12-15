import { format } from 'date-fns';
import {
  formatDateTimeDisplay,
  formatDueLabel,
  getTaskStatus,
  normalizeDueDate,
  parseDateTimeInput,
} from '@/utils/tasks/dates';

type HasToDate = {
  toDate: () => Date;
};

describe('normalizeDueDate', () => {
  it('returns null when value is falsy', () => {
    expect(normalizeDueDate(null)).toBeNull();
    expect(normalizeDueDate(undefined)).toBeNull();
  });

  it('returns the same Date instance', () => {
    const date = new Date('2025-01-01T00:00:00Z');
    expect(normalizeDueDate(date)).toBe(date);
  });

  it('uses toDate when available', () => {
    const date = new Date('2025-02-02T00:00:00Z');
    const value: HasToDate = { toDate: () => date };
    expect(normalizeDueDate(value)).toBe(date);
  });

  it('falls back to Date constructor', () => {
    const date = normalizeDueDate('2025-03-03T00:00:00Z');
    expect(date?.toISOString()).toBe('2025-03-03T00:00:00.000Z');
  });
});

describe('getTaskStatus', () => {
  const today = new Date(2025, 0, 10, 12, 0, 0);

  it('returns today when no due date', () => {
    expect(getTaskStatus(null, today)).toBe('today');
  });

  it('returns scheduled when due date is after today', () => {
    expect(
      getTaskStatus(new Date(2025, 0, 11, 0, 0, 0), today),
    ).toBe('scheduled');
  });

  it('returns overdue when due date is before today', () => {
    expect(
      getTaskStatus(new Date(2025, 0, 9, 0, 0, 0), today),
    ).toBe('overdue');
  });

  it('returns today when same calendar day', () => {
    expect(
      getTaskStatus(new Date(2025, 0, 10, 23, 59, 59), today),
    ).toBe('today');
  });
});

describe('formatDueLabel', () => {
  it('returns fallback labels when null', () => {
    const result = formatDueLabel(null);
    expect(result).toEqual({ dateLabel: 'Sem data', timeLabel: '' });
  });

  it('formats date and time when provided', () => {
    const date = new Date(2025, 3, 5, 14, 30, 0);
    const result = formatDueLabel(date);
    expect(result.dateLabel).toBe('05/04/2025');
    expect(result.timeLabel).toBe('14:30');
  });
});

describe('parseDateTimeInput', () => {
  it('returns null for empty values', () => {
    expect(parseDateTimeInput('')).toBeNull();
    expect(parseDateTimeInput(undefined)).toBeNull();
  });

  it('parses the display mask', () => {
    const parsed = parseDateTimeInput('10/01/2025 18:45');
    expect(parsed).toBeInstanceOf(Date);
    expect(format(parsed as Date, "yyyy-MM-dd'T'HH:mm")).toBe(
      '2025-01-10T18:45',
    );
  });

  it('parses native date strings as fallback', () => {
    const parsed = parseDateTimeInput('2025-05-06T12:00:00Z');
    expect(parsed?.toISOString()).toBe('2025-05-06T12:00:00.000Z');
  });

  it('returns undefined for invalid values', () => {
    expect(parseDateTimeInput('invalid-date')).toBeUndefined();
  });
});

describe('formatDateTimeDisplay', () => {
  it('formats using the display mask', () => {
    const date = new Date(2025, 6, 8, 9, 15, 0);
    expect(formatDateTimeDisplay(date)).toBe('08/07/2025 09:15');
  });
});
