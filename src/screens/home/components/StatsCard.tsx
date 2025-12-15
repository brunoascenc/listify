import { Pressable, Text, View } from 'react-native';

type Props = {
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export const StatsCard = ({ title, count, color, icon, onPress }: Props) => {
  return (
    <Pressable
      className="flex-1 rounded-2xl p-4"
      style={{
        backgroundColor: color,
      }}
      onPress={onPress}
    >
      <View>{icon}</View>
      <View className="flex-row justify-between items-end space-between">
        <Text className="text-base">{title}</Text>
        <Text className="text-3xl font-semibold">
          {count}
        </Text>
      </View>
    </Pressable>
  );
};
