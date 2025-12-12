import { ArrowUpRight } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Topic } from '@/store/useTaskStore';

type Props = {
  topic: Topic;
  completed: number;
};

export const TopicCard = ({ topic, completed }: Props) => {
  return (
    <View
      className="mb-3 rounded-3xl p-5"
      style={{ backgroundColor: topic.color }}
    >
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xl font-semibold text-slate-900">
            {topic.name}
          </Text>
          <Text className="mt-1 text-sm text-slate-700">
            {topic.notes} Notes
          </Text>
        </View>
        <ArrowUpRight size={18} color="#111827" />
      </View>
      <Text className="mt-3 text-sm font-semibold text-slate-900">
        {completed} Completed
      </Text>
    </View>
  );
}
