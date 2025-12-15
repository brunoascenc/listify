import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollViewContainer } from '@/components/ui/ScrollViewContainer';
import { LoginForm } from '@/screens/login/components/LoginForm';
import { useLogin } from '@/screens/login/logic/useLogin';
import { RootStackParamList } from '@/navigation';

export const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { control, errors, isSubmitting, onSubmit } = useLogin();

  return (
    <ScrollViewContainer>
      <View className="flex-1  justify-center">
        <View className="mb-10 mt-10 gap-1 flex-column items-center">
          <Text className="text-2xl font-semibold text-slate-900">
            Bem-vindo ao Listify
          </Text>
          <Text className="text-base text-slate-500">
            Entre para organizar as suas tarefas
          </Text>
        </View>

        <LoginForm
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onNavigateSignup={() => navigation.navigate('Signup')}
        />
      </View>
    </ScrollViewContainer>
  );
};
