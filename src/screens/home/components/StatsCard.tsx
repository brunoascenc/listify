import { Text, View } from 'react-native';

type Props = {
  title: string;
  count: number;
  color: string;
};

export const StatsCard = ({ title, count, color }: Props) => {
  return (
    <View
      className="flex-1 rounded-2xl p-4"
      style={{ backgroundColor: color }}
    >
      <Text className="text-sm text-slate-700">{title}</Text>
      <Text className="mt-2 text-3xl font-semibold text-slate-900">
        {count}
      </Text>
    </View>
  );
}
