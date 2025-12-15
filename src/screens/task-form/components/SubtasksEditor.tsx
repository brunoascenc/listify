import { Text, View } from 'react-native';
import { Subtask } from '@/types/tasks/domain';
import { Input } from '@/components/ui/Input';
import { IconButton } from '@/components/ui/IconButton';
import { Plus, Trash } from 'lucide-react-native';

type Props = {
  subtasks: Subtask[];
  newSubtask: string;
  onChangeNewSubtask: (value: string) => void;
  onAddSubtask: () => void;
  onRemoveSubtask: (id: string) => void;
};

export const SubtasksEditor = ({
  subtasks,
  newSubtask,
  onChangeNewSubtask,
  onAddSubtask,
  onRemoveSubtask,
}: Props) => {
  return (
    <View className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
      <View className="mb-2 flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-semibold text-slate-800">
            Subtarefas
          </Text>
          <Text className="text-xs text-slate-500">
            Divida a tarefa em pequenos passos
          </Text>
        </View>
      </View>

      {subtasks.map(sub => (
        <View
          key={sub.id}
          className="mb-2 flex-row items-center justify-between rounded-2xl bg-violet-100 px-3 py-2"
        >
          <Text
            className={`text-base ${
              sub.completed ? 'text-slate-400 line-through' : 'text-slate-900'
            }`}
          >
            {sub.title}
          </Text>
          <IconButton
            onPress={() => onRemoveSubtask(sub.id)}
            className="bg-white"
          >
            <Trash color="#e62525" size={20} />
          </IconButton>
        </View>
      ))}

      <View className="mt-2 flex-row items-center gap-2">
        <View className="flex-1">
          <Input
            value={newSubtask}
            onChangeText={onChangeNewSubtask}
            placeholder="Nova subtarefa"
            onSubmitEditing={onAddSubtask}
          />
        </View>
        <IconButton
          onPress={onAddSubtask}
          className="rounded-4xl p-5"
          textClassName="text-sm"
        >
          <Plus size={24} color="#fff" />
        </IconButton>
      </View>
    </View>
  );
};
