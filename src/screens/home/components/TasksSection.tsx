import { Text, View } from 'react-native';
import { TaskCard } from '@/screens/home/components/TaskCard';
import { ErrorState } from '@/components/error/Error';
import { LoadingState } from '@/components/loading/Loading';
import { EmptyState } from '@/components/info/Empty';
import { SectionTitleFilter, UiTask } from '@/types/tasks/ui';
import { IconButton } from '@/components/ui/IconButton';
import { Plus } from 'lucide-react-native';
import { sectionTitle } from '@/utils/tasks/ui';

type Props = {
  tasks: UiTask[];
  isLoading: boolean;
  isError: boolean;
  onEditTask: (taskId: string) => void;
  onToggleTask: (taskId: string, nextValue: boolean) => void;
  onToggleSubtask: (
    taskId: string,
    subtaskId: string,
    nextValue: boolean,
  ) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onCreateTask: () => void;
  filter: SectionTitleFilter;
};

export const TasksSection = ({
  tasks,
  isLoading,
  isError,
  filter,
  onEditTask,
  onToggleTask,
  onToggleSubtask,
  onAddSubtask,
  onCreateTask,
}: Props) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingState message="Carregando tarefas..." />;
    }

    if (isError) {
      return (
        <ErrorState message="Erro ao carregar tarefas. Tente novamente." />
      );
    }

    if (tasks.length === 0) {
      return <EmptyState message="Nenhuma tarefa encontrada" />;
    }

    return tasks.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        onToggleTask={onToggleTask}
        onToggleSubtask={onToggleSubtask}
        onAddSubtask={onAddSubtask}
        onPress={() => onEditTask(task.id)}
      />
    ));
  };

  return (
    <View className="mt-6">
      <View className="mb-3 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-slate-900">
            {sectionTitle(filter)}
          </Text>
          <Text className="text-sm text-slate-500">
            Fique de olho nas suas tarefas
          </Text>
        </View>
        <IconButton onPress={onCreateTask}>
          <Plus size={20} color="#fff" />
        </IconButton>
      </View>

      {renderContent()}
    </View>
  );
};
