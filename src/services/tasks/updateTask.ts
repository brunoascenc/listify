import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '@/services/firebase';
import {
  maybeAdd,
  serverTimestamp,
  tasksCollection,
  tasksQueryKey,
  timestampNow,
} from '@/services/tasks/config';
import { UpdateTaskInput } from '@/types/tasks/domain';
import { FirestoreTaskUpdatePayload } from '@/types/tasks/firestore';
import { doc, setDoc } from '@react-native-firebase/firestore';

export const updateTask = async (data: UpdateTaskInput): Promise<void> => {
  const user = firebaseAuth.currentUser;
  if (!user?.uid) {
    throw new Error('Usuário não autenticado');
  }

  const ref = doc(tasksCollection(user.uid), data.taskId);
  const payload: FirestoreTaskUpdatePayload = { updatedAt: serverTimestamp() };

  maybeAdd('title', data.title, payload, val => val.trim());
  maybeAdd('dueDate', data.dueDate, payload, val => val ?? null);
  maybeAdd('completed', data.completed, payload);

  if (data.subtasks) {
    payload.subtasks = data.subtasks.map(sub => ({
      ...sub,
      updatedAt: timestampNow(),
    }));
  }

  await setDoc(ref, payload, { merge: true });
};

type UseUpdateTaskOptions = {
  mutationConfig?: Parameters<
    typeof useMutation<void, Error, UpdateTaskInput>
  >[0];
};

export const useUpdateTask = ({
  mutationConfig,
}: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, UpdateTaskInput>({
    mutationFn: updateTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
