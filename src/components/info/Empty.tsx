import { Text, View } from 'react-native';

type Props = {
  message?: string;
};

export const EmptyState = ({
  message = 'Nenhum item encontrado.',
}: Props) => {
  return (
    <View className="rounded-xl bg-slate-50 p-3">
      <Text className="text-sm text-slate-500">{message}</Text>
    </View>
  );
};
