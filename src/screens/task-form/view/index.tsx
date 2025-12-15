import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation';
import { TaskForm } from '@/screens/task-form/components/TaskForm';
import { useTaskForm } from '@/screens/task-form/logic/useTaskForm';
import { ScrollViewContainer } from '@/components/ui/ScrollViewContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

export const TaskFormScreen = ({ navigation, route }: Props) => {
  const editingTask = route.params?.task;

  const {
    control,
    errors,
    onSubmit,
    subtasks,
    newSubtask,
    setNewSubtask,
    handleAddSubtask,
    handleRemoveSubtask,
    isSubmitting,
    isDeleting,
    isEditing,
    handleDeleteTask,
  } = useTaskForm({ navigation, editingTask });

  return (
    <ScrollViewContainer>
      <TaskForm
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onCancel={() => navigation.goBack()}
        isEditing={isEditing}
        isDeleting={isDeleting}
        onDelete={handleDeleteTask}
        subtasks={subtasks}
        newSubtask={newSubtask}
        onChangeNewSubtask={setNewSubtask}
        onAddSubtask={handleAddSubtask}
        onRemoveSubtask={handleRemoveSubtask}
      />
    </ScrollViewContainer>
  );
};
