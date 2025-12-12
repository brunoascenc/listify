import { useState } from 'react';
import { Text, View } from 'react-native';
import { MoreHorizontal } from 'lucide-react-native';
import { Task, useTaskStore } from '@/store/useTaskStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { CheckItem } from '@/components/ui/CheckItem';

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const toggleTask = useTaskStore(state => state.toggleTask);
  const toggleSubtask = useTaskStore(state => state.toggleSubtask);
  const addSubtask = useTaskStore(state => state.addSubtask);

  const handleAddSubtask = () => {
    if (!title.trim()) return;
    addSubtask(task.id, title.trim());
    setTitle('');
    setAdding(false);
  };

  return (
    <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Checkbox
            size={24}
            onPress={() => toggleTask(task.id)}
            selected={task.completed}
          />
          <View>
            <Text className="text-xs font-medium text-slate-500">
              {task.dueLabel}
            </Text>
            <Text className="text-lg font-semibold text-slate-900">
              {task.title}
            </Text>
          </View>
        </View>
        <MoreHorizontal size={20} color="#94a3b8" />
      </View>

      {task.subtasks.length > 0 && (
        <View className="mb-2">
          {task.subtasks.map(sub => (
            <CheckItem
              key={sub.id}
              onPress={() => toggleSubtask(task.id, sub.id)}
              className="flex-row items-center gap-3 py-1"
              selected={sub.done}
            >
              {sub.title}
            </CheckItem>
          ))}
        </View>
      )}

      {adding ? (
        <View className="mt-2 flex-row items-center gap-2 rounded-xl bg-slate-100 p-2">
          <Input
            value={title}
            onChangeText={setTitle}
            placeholder="Nova subtarefa"
            className="text-sm text-slate-900"
            onSubmitEditing={handleAddSubtask}
          />
          <Button onPress={handleAddSubtask} textClassName="text-sm">
            Adicionar
          </Button>
        </View>
      ) : (
        <Button
          onPress={() => setAdding(true)}
          className="mt-1 w-fit rounded-lg bg-slate-100 px-3 py-2"
          textClassName='text-sm font-semibold text-blue-500'
        >
          + Add item
        </Button>
      )}
    </View>
  );
}
