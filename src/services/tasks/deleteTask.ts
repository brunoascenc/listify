import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseAuth } from '@/services/firebase';
import { tasksCollection, tasksQueryKey } from '@/services/tasks/config';
import { DeleteTaskInput } from '@/types/tasks/domain';
import { deleteDoc, doc } from '@react-native-firebase/firestore';

export const deleteTask = async (data: DeleteTaskInput): Promise<void> => {
  const user = firebaseAuth.currentUser;
  if (!user?.uid) {
    throw new Error('Usuário não autenticado');
  }

  await deleteDoc(doc(tasksCollection(user.uid), data.taskId));
};

type UseDeleteTaskOptions = {
  mutationConfig?: Parameters<
    typeof useMutation<void, Error, DeleteTaskInput>
  >[0];
};

export const useDeleteTask = ({
  mutationConfig,
}: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeleteTaskInput>({
    mutationFn: deleteTask,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: tasksQueryKey });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
