import { Timestamp } from '@react-native-firebase/firestore';
import {
  mapTaskDoc,
  maybeAdd,
  normalizeTimestamp,
} from '@/services/tasks/config';
import { FirestoreTask, FirestoreSubtask } from '@/types/tasks/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const makeTimestamp = (iso: string) =>
  Timestamp.fromDate(new Date(iso));

describe('normalizeTimestamp', () => {
  it('returns null for falsy', () => {
    expect(normalizeTimestamp(null)).toBeNull();
    expect(normalizeTimestamp(undefined)).toBeNull();
  });

  it('converts Timestamp to Date', () => {
    const ts = makeTimestamp('2025-01-01T00:00:00Z');
    const date = normalizeTimestamp(ts);
    expect(date?.toISOString()).toBe('2025-01-01T00:00:00.000Z');
  });
});

describe('maybeAdd', () => {
  it('skips undefined values', () => {
    const payload: Record<string, unknown> = {};
    maybeAdd('title', undefined, payload);
    expect(payload).toEqual({});
  });

  it('adds raw value', () => {
    const payload: Record<string, unknown> = {};
    maybeAdd('title', 'Task', payload);
    expect(payload.title).toBe('Task');
  });

  it('applies transform when provided', () => {
    const payload: Record<string, unknown> = {};
    maybeAdd('title', ' Task ', payload, val => val.trim());
    expect(payload.title).toBe('Task');
  });
});

describe('mapTaskDoc', () => {
  const baseData: Partial<FirestoreTask> = {
    title: 'My Task',
    completed: true,
    dueDate: makeTimestamp('2025-02-02T00:00:00Z'),
    createdAt: makeTimestamp('2025-02-01T00:00:00Z'),
    updatedAt: makeTimestamp('2025-02-03T00:00:00Z'),
    subtasks: [
      {
        id: 'sub-1',
        title: 'Subtask',
        completed: false,
        createdAt: makeTimestamp('2025-02-01T01:00:00Z'),
        updatedAt: makeTimestamp('2025-02-03T02:00:00Z'),
      } as FirestoreSubtask,
    ],
  };

  it('maps snapshot data to domain task', () => {
    const snapshot = {
      id: 'task-1',
      data: () => baseData,
    } as unknown as FirebaseFirestoreTypes.DocumentSnapshot;

    const task = mapTaskDoc(snapshot);

    expect(task.id).toBe('task-1');
    expect(task.title).toBe('My Task');
    expect(task.completed).toBe(true);
    expect(task.dueDate?.toISOString()).toBe(
      '2025-02-02T00:00:00.000Z',
    );
    expect(task.subtasks[0].id).toBe('sub-1');
    expect(task.subtasks[0].createdAt?.toISOString()).toBe(
      '2025-02-01T01:00:00.000Z',
    );
  });

  it('applies defaults when fields are missing', () => {
    const snapshot = {
      id: 'task-2',
      data: () => ({}),
    } as unknown as FirebaseFirestoreTypes.DocumentSnapshot;

    const task = mapTaskDoc(snapshot);

    expect(task.title).toBe('');
    expect(task.completed).toBe(false);
    expect(task.subtasks).toEqual([]);
  });
});
