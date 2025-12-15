import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type FirestoreDateValue =
  | FirebaseFirestoreTypes.FieldValue
  | FirebaseFirestoreTypes.Timestamp
  | Date
  | null;

export type FirestoreBaseEntity = {
  id: string;
  createdAt?: FirestoreDateValue;
  updatedAt?: FirestoreDateValue;
};

export type FirestoreEntity<T> = T & FirestoreBaseEntity;

export type FirestoreSubtaskFields = {
  title: string;
  completed: boolean;
};

export type FirestoreTaskFields = {
  title: string;
  completed: boolean;
  dueDate: FirestoreDateValue;
};

export type FirestoreSubtask = FirestoreEntity<FirestoreSubtaskFields>;

export type FirestoreTask = FirestoreEntity<
  FirestoreTaskFields & {
    subtasks: FirestoreSubtask[];
  }
>;

export type FirestoreTaskUpdatePayload = Partial<{
  [K in keyof FirestoreTaskFields]: FirestoreTaskFields[K];
}> & {
  subtasks?: Array<
    { id: string } & Partial<FirestoreSubtaskFields> & {
        updatedAt?: FirestoreDateValue;
      }
  >;
  updatedAt: FirestoreDateValue;
};
