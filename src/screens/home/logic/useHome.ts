import { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation';
import { useGetTasks } from '@/services/tasks/getTasks';
import { useUpdateTask } from '@/services/tasks/updateTask';
import { TaskStats, UiTask, UiTaskStatus } from '@/types/tasks/ui';
import {
  formatDueLabel,
  getTaskStatus,
  normalizeDueDate,
} from '@/utils/tasks/dates';
import { useAuthStore } from '@/store/useAuthStore';
import { Task } from '@/types/tasks/domain';
import { signOut } from '@/services/auth/signOut';

export const useHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filter, setFilter] = useState<UiTaskStatus | 'all'>('today');
  const mapTasks = useCallback((tasks: Task[]) => {
    const now = new Date();

    const uiTasks: UiTask[] = tasks.map(task => {
      const dueDate = normalizeDueDate(task.dueDate);
      const { dateLabel, timeLabel } = formatDueLabel(dueDate);
      return {
        id: task.id,
        title: task.title,
        dueDate,
        dueDateLabel: dateLabel,
        dueTimeLabel: timeLabel,
        status: getTaskStatus(dueDate, now),
        completed: task.completed,
        subtasks:
          task.subtasks?.map(sub => ({
            id: sub.id,
            title: sub.title,
            done: sub.completed,
          })) ?? [],
      };
    });

    const stats: TaskStats = {
      today: uiTasks.filter(task => task.status === 'today').length,
      scheduled: uiTasks.filter(task => task.status === 'scheduled').length,
      overdue: uiTasks.filter(task => task.status === 'overdue').length,
      all: uiTasks.length,
    };

    const todayAndOverdue = uiTasks
      .filter(task => task.status === 'today' || task.status === 'overdue')
      .sort((a, b) => {
        const aTime = a.dueDate ? a.dueDate.getTime() : Number.MAX_SAFE_INTEGER;
        const bTime = b.dueDate ? b.dueDate.getTime() : Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
      });

    const sortedAll = [...uiTasks].sort((a, b) => {
      const aTime = a.dueDate ? a.dueDate.getTime() : Number.MAX_SAFE_INTEGER;
      const bTime = b.dueDate ? b.dueDate.getTime() : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });

    return { uiTasks: sortedAll, stats, todayAndOverdue, rawTasks: tasks };
  }, []);

  const {
    data: mapped = {
      uiTasks: [],
      stats: { today: 0, scheduled: 0, overdue: 0, all: 0 },
      todayAndOverdue: [],
      rawTasks: [],
    },
    isLoading,
    isError,
  } = useGetTasks({ select: mapTasks });

  const tasks = mapped.rawTasks;
  const uiTasks = mapped.uiTasks;
  const stats = mapped.stats;
  const userName = useAuthStore(state => state.user?.name);
  const setUser = useAuthStore(state => state.setUser);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return uiTasks;
    return uiTasks.filter(task => task.status === filter);
  }, [filter, uiTasks]);

  const updateTaskMutation = useUpdateTask({
    mutationConfig: {
      onSuccess: () => console.log('Sucesso'),
      onError: error => console.error(error),
    },
  });

  const handleCreateTask = () => navigation.navigate('TaskForm');

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(item => item.id === taskId);
    if (!task) return;
    navigation.navigate('TaskForm', { task });
  };

  const handleToggleTask = (taskId: string, nextValue: boolean) => {
    updateTaskMutation.mutate({ taskId, completed: nextValue });
  };

  const handleToggleSubtask = (
    taskId: string,
    subtaskId: string,
    nextValue: boolean,
  ) => {
    const task = tasks.find(item => item.id === taskId);
    if (!task) return;

    const updated = task.subtasks.map(sub =>
      sub.id === subtaskId ? { ...sub, completed: nextValue } : sub,
    );
    updateTaskMutation.mutate({ taskId, subtasks: updated });
  };

  const handleAddSubtask = (taskId: string, title: string) => {
    const task = tasks.find(item => item.id === taskId);
    if (!task) return;

    const newSubtasks = [
      ...task.subtasks,
      {
        id: `${Date.now()}`,
        title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    updateTaskMutation.mutate({ taskId, subtasks: newSubtasks });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    stats,
    tasks: filteredTasks,
    filter,
    setFilter,
    isLoading,
    isError,
    userName,
    handleLogout,
    handleCreateTask,
    handleEditTask,
    handleToggleTask,
    handleToggleSubtask,
    handleAddSubtask,
  };
};
