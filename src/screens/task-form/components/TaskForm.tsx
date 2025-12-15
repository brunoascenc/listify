import { Text, View } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SubtasksEditor } from '@/screens/task-form/components/SubtasksEditor';
import { TaskFormValues } from '@/screens/task-form/logic/useTaskForm';
import { Subtask } from '@/types/tasks/domain';
import { DatePicker } from '@/components/ui/DatePicker';

type Props = {
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  onSubmit: () => void;
  isSubmitting: boolean;
  onCancel: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  isEditing?: boolean;
  subtasks: Subtask[];
  newSubtask: string;
  onChangeNewSubtask: (value: string) => void;
  onAddSubtask: () => void;
  onRemoveSubtask: (id: string) => void;
};

export const TaskForm = ({
  control,
  errors,
  onSubmit,
  isSubmitting,
  onCancel,
  onDelete,
  isDeleting,
  isEditing,
  subtasks,
  newSubtask,
  onChangeNewSubtask,
  onAddSubtask,
  onRemoveSubtask,
}: Props) => {
  return (
    <>
      <View className="mb-4 gap-1">
        <Text className="text-lg font-semibold text-slate-900">
          Detalhes da tarefa
        </Text>
        <Text className="text-sm text-slate-500">
          Defina um título e programe quando quer concluir.
        </Text>
      </View>

      <View className="gap-4 rounded-3xl p-4 bg-white shadow-sm">
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Titulo e obrigatorio' }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Título"
              value={value}
              onChangeText={onChange}
              placeholder="Ex: Mercado"
              error={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Data e hora"
              value={value}
              onChange={onChange}
              placeholder="Selecionar data e hora"
            />
          )}
        />
      </View>

      <SubtasksEditor
        subtasks={subtasks}
        newSubtask={newSubtask}
        onChangeNewSubtask={onChangeNewSubtask}
        onAddSubtask={onAddSubtask}
        onRemoveSubtask={onRemoveSubtask}
      />

      {errors.root?.message && (
        <Text className="text-sm font-medium text-rose-500">
          {errors.root.message}
        </Text>
      )}

      <View className="mt-8 flex-row gap-3">
        <Button
          onPress={onCancel}
          className="flex-1 bg-slate-200"
          textClassName="text-slate-800"
        >
          Cancelar
        </Button>
        {isEditing && onDelete && (
          <Button
            onPress={onDelete}
            disabled={isDeleting}
            className="flex-1 bg-rose-100"
            textClassName="text-rose-700"
          >
            {isDeleting ? 'Apagando...' : 'Apagar'}
          </Button>
        )}
        <Button onPress={onSubmit} disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </View>
    </>
  );
};
