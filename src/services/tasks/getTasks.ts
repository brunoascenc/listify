import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '@/services/firebase';
import { Task } from '@/types/tasks/domain';
import {
  mapTaskDoc,
  tasksCollection,
  tasksQueryKey,
} from '@/services/tasks/config';
import { getDocs, orderBy, query } from '@react-native-firebase/firestore';

export const getTasks = async (): Promise<Task[]> => {
  const user = firebaseAuth.currentUser;
  if (!user?.uid) {
    throw new Error('Usuário não autenticado');
  }

  const tasksQuery = query(
    tasksCollection(user.uid),
    orderBy('createdAt', 'desc'),
  );
  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map(mapTaskDoc);
};

type UseGetTasksOptions<TSelected = Task[]> = {
  enabled?: boolean;
  select?: (data: Task[]) => TSelected;
};

export const useGetTasks = <TSelected = Task[]>({
  enabled = true,
  select,
}: UseGetTasksOptions<TSelected> = {}) => {
  return useQuery<Task[], Error, TSelected>({
    queryKey: tasksQueryKey,
    queryFn: getTasks,
    enabled,
    select,
  });
};
