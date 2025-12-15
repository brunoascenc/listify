import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export const FormContainer = ({ children }: Props) => {
  return (
    <View className="gap-4 rounded-2xl bg-white shadow-sm p-4">{children}</View>
  );
};
