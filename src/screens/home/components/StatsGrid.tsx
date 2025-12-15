import { View } from 'react-native';
import { StatsCard } from '@/screens/home/components/StatsCard';
import { TaskStats, UiTaskStatus } from '@/types/tasks/ui';
import { Clock, ClockCheck, ClockFading, History } from 'lucide-react-native';

type Props = {
  stats: TaskStats;
  onSelect: (filter: UiTaskStatus | 'all') => void;
};

const iconStyle = {
  color: '#fff',
  size: 30,
};

export const StatsGrid = ({ stats, onSelect }: Props) => {
  const cards = [
    {
      key: 'today' as const,
      title: 'Hoje',
      count: stats.today,
      color: '#bbd2ff',
      icon: <Clock size={iconStyle.size} color={iconStyle.color} />,
    },
    {
      key: 'scheduled' as const,
      title: 'Agendado',
      count: stats.scheduled,
      color: '#f1e19a',
      icon: <ClockCheck size={iconStyle.size} color={iconStyle.color} />,
    },
    {
      key: 'all' as const,
      title: 'Todas',
      count: stats.all,
      color: '#abe6d5',
      icon: <History size={iconStyle.size} color={iconStyle.color} />,
    },
    {
      key: 'overdue' as const,
      title: 'Atrasadas',
      count: stats.overdue,
      color: '#fdc9ed',
      icon: <ClockFading size={iconStyle.size} color={iconStyle.color} />,
    },
  ];

  return (
    <>
      <View className="flex-row gap-3">
        {cards.slice(0, 2).map(card => (
          <StatsCard
            key={card.key}
            title={card.title}
            count={card.count}
            color={card.color}
            icon={card.icon}
            onPress={() => onSelect(card.key)}
          />
        ))}
      </View>
      <View className="mt-3 flex-row gap-3">
        {cards.slice(2).map(card => (
          <StatsCard
            key={card.key}
            title={card.title}
            count={card.count}
            color={card.color}
            icon={card.icon}
            onPress={() => onSelect(card.key)}
          />
        ))}
      </View>
    </>
  );
};
