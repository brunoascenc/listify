import { ScrollView, Text } from 'react-native';
import { TopicCard } from '@/screens/tasks/components/TopicCard';
import { useTaskStore } from '@/store/useTaskStore';

export const Home = () => {
  const tasks = useTaskStore(state => state.tasks);
  const topics = useTaskStore(state => state.topics);

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="mt-4 mb-3 text-lg font-semibold text-slate-900">
        All Task List
      </Text>
      {topics.map(topic => {
        const completed = tasks.filter(
          task => task.topicId === topic.id && task.completed,
        ).length;
        return <TopicCard key={topic.id} topic={topic} completed={completed} />;
      })}
    </ScrollView>
  );
};
