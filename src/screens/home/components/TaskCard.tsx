import { Pressable, Text, View } from 'react-native';
import { CalendarDays, MoreHorizontal } from 'lucide-react-native';
import { Checkbox } from '@/components/ui/Checkbox';
import { CheckItem } from '@/components/ui/CheckItem';
import { UiTask } from '@/types/tasks/ui';

type Props = {
  task: UiTask;
  onToggleTask: (taskId: string, nextValue: boolean) => void;
  onToggleSubtask: (
    taskId: string,
    subtaskId: string,
    nextValue: boolean,
  ) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onPress?: () => void;
};

export const TaskCard = ({
  task,
  onToggleTask,
  onToggleSubtask,
  onPress,
}: Props) => {
  return (
    <Pressable className="mb-3 rounded-4xl bg-violet-50 p-3" onPress={onPress}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="bg-white p-3 rounded-4xl">
            <Checkbox
              size={26}
              onPress={() => onToggleTask(task.id, !task.completed)}
              selected={task.completed}
              circleColor="#3b82f6"
            />
          </View>
          <View>
            <View className="flex-row items-center gap-1">
              <CalendarDays color="#757575" size={14} />
              <Text className="text-xs font-medium text-slate-500">
                {task.dueDateLabel}
                {task.dueTimeLabel ? ` às ${task.dueTimeLabel}` : ''}
              </Text>
            </View>
            <Text className="text-lg font-semibold text-slate-900">
              {task.title}
            </Text>
          </View>
        </View>
        <View className="bg-white p-1 rounded-4xl mr-2">
          <MoreHorizontal size={20} color="#94a3b8" />
        </View>
      </View>

      {task.subtasks.length > 0 && (
        <View className="mb-2 ml-15">
          {task.subtasks.map(sub => (
            <CheckItem
              key={sub.id}
              onPress={() => onToggleSubtask(task.id, sub.id, !sub.done)}
              className="flex-row items-center gap-3 py-1"
              selected={sub.done}
              circleColor="#88abe2"
            >
              {sub.title}
            </CheckItem>
          ))}
        </View>
      )}
    </Pressable>
  );
};
