import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatDateTimeDisplay, parseDateTimeInput } from '@/utils/tasks/dates';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation';
import { Subtask, Task } from '@/types/tasks/domain';
import { useCreateTask } from '@/services/tasks/createTask';
import { useUpdateTask } from '@/services/tasks/updateTask';
import { useDeleteTask } from '@/services/tasks/deleteTask';

export type TaskFormValues = {
  title: string;
  dueDate?: string;
};

type UseTaskFormParams = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  editingTask?: Task | null;
};

export const useTaskForm = ({ navigation, editingTask }: UseTaskFormParams) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = useState('');

  const isEditing = useMemo(() => !!editingTask, [editingTask]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: editingTask?.title ?? '',
      dueDate: editingTask?.dueDate
        ? formatDateTimeDisplay(new Date(editingTask.dueDate))
        : '',
    },
  });

  const createTaskMutation = useCreateTask({
    mutationConfig: {
      onSuccess: () => navigation.goBack(),
      onError: error => {
        console.error(error);
        setError('root', { message: 'Erro ao salvar' });
      },
    },
  });

  const updateTaskMutation = useUpdateTask({
    mutationConfig: {
      onSuccess: () => navigation.goBack(),
      onError: error => {
        console.error(error);
        setError('root', { message: 'Erro ao salvar' });
      },
    },
  });

  const deleteTaskMutation = useDeleteTask({
    mutationConfig: {
      onSuccess: () => navigation.goBack(),
      onError: error => {
        console.error(error);
        setError('root', { message: 'Erro ao apagar tarefa' });
      },
    },
  });

  useEffect(() => {
    setSubtasks(
      editingTask?.subtasks?.map(sub => ({
        id: sub.id,
        title: sub.title,
        completed: sub.completed,
        createdAt: sub.createdAt ?? null,
        updatedAt: sub.updatedAt ?? null,
      })) ?? [],
    );
    setNewSubtask('');
    navigation.setOptions({
      title: isEditing ? 'Editar tarefa' : 'Nova tarefa',
    });
  }, [editingTask, isEditing, navigation]);

  const handleAddSubtask = useCallback(() => {
    const newSub = newSubtask.trim();

    if (!newSub) return;
    setSubtasks(prev => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        title: newSub,
        completed: false,
        createdAt: null,
        updatedAt: null,
      },
    ]);
    setNewSubtask('');
  }, [newSubtask]);

  const handleToggleSubtask = useCallback((id: string) => {
    setSubtasks(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, completed: !sub.completed } : sub,
      ),
    );
  }, []);

  const handleRemoveSubtask = useCallback((id: string) => {
    setSubtasks(prev => prev.filter(sub => sub.id !== id));
  }, []);

  const onSubmit = handleSubmit(data => {
    const parsedDate = parseDateTimeInput(data.dueDate);
    if (parsedDate === undefined) {
      setError('dueDate', {
        message: 'Data inválida.',
      });
      return;
    }

    if (isEditing && editingTask) {
      const normalized: Subtask[] = subtasks.map(sub => ({
        id: sub.id,
        title: sub.title,
        completed: sub.completed,
        createdAt: sub.createdAt ?? null,
        updatedAt: new Date(),
      }));

      updateTaskMutation.mutate({
        taskId: editingTask.id,
        title: data.title.trim(),
        dueDate: parsedDate,
        subtasks: normalized,
      });
    } else {
      createTaskMutation.mutate({
        title: data.title.trim(),
        dueDate: parsedDate,
        subtasks: subtasks.map(sub => ({ title: sub.title })),
      });
    }
  });

  return {
    control,
    errors,
    onSubmit,
    isSubmitting: createTaskMutation.isPending || updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
    isEditing,
    handleDeleteTask: () => {
      if (!editingTask) return;
      deleteTaskMutation.mutate({ taskId: editingTask.id });
    },
    subtasks,
    newSubtask,
    setNewSubtask,
    handleAddSubtask,
    handleToggleSubtask,
    handleRemoveSubtask,
  };
};



