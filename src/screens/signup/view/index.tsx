import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollViewContainer } from '@/components/ui/ScrollViewContainer';
import { SignupForm } from '@/screens/signup/components/SignupForm';
import { useSignup } from '@/screens/signup/logic/useSignup';
import { RootStackParamList } from '@/navigation';

export const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { control, errors, isSubmitting, onSubmit } = useSignup();

  return (
    <ScrollViewContainer>
      <View className="mb-4 mt-10 gap-1 flex-column items-center">
        <Text className="text-2xl font-semibold text-slate-900">
          Crie sua conta
        </Text>
        <Text className="text-base text-slate-500">
          Preencha seus dados para começar
        </Text>
      </View>

      <SignupForm
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onNavigateLogin={() => navigation.navigate('Login')}
      />
    </ScrollViewContainer>
  );
};
