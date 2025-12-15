import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth, db } from '@/services/firebase';
import { CreateTaskInput, Task } from '@/types/tasks/domain';
import {
  mapTaskDoc,
  serverTimestamp,
  tasksCollection,
  tasksQueryKey,
  timestampNow,
} from '@/services/tasks/config';
import {
  collection,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  setDoc,
} from '@react-native-firebase/firestore';
import { FirestoreTask } from '@/types/tasks/firestore';

export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const user = firebaseAuth.currentUser;
  if (!user?.uid) {
    throw new Error('Usuário não autenticado');
  }

  const ref = doc(
    tasksCollection(user.uid),
  ) as FirebaseFirestoreTypes.DocumentReference<FirestoreTask>;
  
  const now = serverTimestamp();

  const subtasks =
    data.subtasks?.map(subtask => ({
      id: doc(collection(db, 'ids')).id,
      title: subtask.title,
      completed: false,
      createdAt: timestampNow(),
      updatedAt: timestampNow(),
    })) ?? [];

  await setDoc(ref, {
    title: data.title,
    dueDate: data.dueDate ?? null,
    completed: false,
    subtasks,
    createdAt: now,
    updatedAt: now,
  });

  const snapshot = await getDoc(ref);
  return mapTaskDoc(snapshot);
};

type UseCreateTaskOptions = {
  mutationConfig?: Parameters<
    typeof useMutation<Task, Error, CreateTaskInput>
  >[0];
};

export const useCreateTask = ({
  mutationConfig,
}: UseCreateTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<Task, Error, CreateTaskInput>({
    mutationFn: createTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
