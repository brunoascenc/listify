import {
  collection,
  FirebaseFirestoreTypes,
  serverTimestamp as serverTimestampFn,
  Timestamp,
} from '@react-native-firebase/firestore';
import { db } from '@/services/firebase';
import { Task } from '@/types/tasks/domain';
import { FirestoreSubtask } from '@/types/tasks/firestore';

export const tasksQueryKey = ['tasks'];

export const serverTimestamp = serverTimestampFn;
export const timestampNow = () => Timestamp.now();
export const normalizeTimestamp = (
  value?: FirebaseFirestoreTypes.Timestamp | null,
) => (value ? value.toDate() : null);

export const tasksCollection = (uid: string) =>
  collection(db, 'users', uid, 'tasks');

export const mapTaskDoc = (
  doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
): Task => {
  const data = doc.data() || {};

  return {
    id: doc.id,
    title: data.title ?? '',
    dueDate: normalizeTimestamp(data.dueDate as Timestamp | null),
    completed: data.completed ?? false,
    subtasks: (data.subtasks ?? []).map((subtask: FirestoreSubtask) => ({
      id: subtask.id,
      title: subtask.title,
      completed: !!subtask.completed,
      createdAt: normalizeTimestamp(subtask.createdAt as Timestamp),
      updatedAt: normalizeTimestamp(subtask.updatedAt as Timestamp),
    })),
    createdAt: normalizeTimestamp(data.createdAt),
    updatedAt: normalizeTimestamp(data.updatedAt),
  };
};

export const maybeAdd = <T, R = T>(
  key: string,
  value: T | undefined,
  payload: Record<string, any>,
  transform?: (val: T) => R,
) => {
  if (value !== undefined) {
    payload[key] = transform ? transform(value) : value;
  }
};
