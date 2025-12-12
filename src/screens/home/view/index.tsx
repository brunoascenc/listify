import { Bell, Plus, Search } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { StatsCard } from '@/screens/home/components/StatsCard';
import { TaskCard } from '@/screens/home/components/TaskCard';
import { useTaskStore } from '@/store/useTaskStore';
import { IconButton } from '@/components/ui/IconButton';

export const Home = () => {
  const tasks = useTaskStore(state => state.tasks);

  const stats = {
    today: tasks.filter(task => task.status === 'today').length,
    scheduled: tasks.filter(task => task.status === 'scheduled').length,
    overdue: tasks.filter(task => task.status === 'overdue').length,
    all: tasks.length,
  };

  const todayAndOverdue = tasks
    .filter(task => task.status === 'today' || task.status === 'overdue')
    .sort((a, b) => a.dueLabel.localeCompare(b.dueLabel));

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-slate-900">
            Olá Bruno,
          </Text>
          <Text className="text-sm text-slate-500">Você tem tarefas para hoje</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Search size={20} color="#94a3b8" />
          <Bell size={20} color="#94a3b8" />
        </View>
      </View>

      <View className="flex-row gap-3">
        <StatsCard title="Today" count={stats.today} color="#d4e2ff" />
        <StatsCard title="Scheduled" count={stats.scheduled} color="#fff4c2" />
      </View>
      <View className="mt-3 flex-row gap-3">
        <StatsCard title="All" count={stats.all} color="#d6f2ea" />
        <StatsCard title="Overdue" count={stats.overdue} color="#ffd9f3" />
      </View>

      <View className="mt-6 mb-3 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-semibold text-slate-900">
            Tarefas de hoje
          </Text>
          <Text className="text-sm text-slate-500">
            Fique de olho no que precisa ser feito
          </Text>
        </View>
        <IconButton>
          <Plus size={20} color="#fff" />
        </IconButton>
      </View>

      {todayAndOverdue.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ScrollView>
  );
};
