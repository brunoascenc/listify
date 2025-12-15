import { Text, View } from 'react-native';

type Props = {
  message?: string;
};

export const ErrorState = ({
  message = 'Erro ao carregar dados. Tente novamente.',
}: Props) => {
  return (
    <View className="rounded-xl bg-rose-50 p-3">
      <Text className="text-sm text-rose-600">{message}</Text>
    </View>
  );
};
