import { IconButton } from '@/components/ui/IconButton';
import { LogOut } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
  userName?: string;
  onLogout?: () => void;
};

export const HomeHeader = ({ userName, onLogout }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="mb-6 flex-row items-center justify-between"
      style={{ paddingTop: insets.top }}
    >
      <View>
        <Text className="text-lg font-semibold text-slate-900">
          Olá {userName},
        </Text>
        <Text className="text-sm text-slate-500">Não perca nenhuma tarefa</Text>
      </View>
      <IconButton className="bg-white" onPress={onLogout}>
        <LogOut />
      </IconButton>
    </View>
  );
};
