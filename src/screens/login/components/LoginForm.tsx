import { Pressable, Text, View } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginFormValues } from '@/screens/login/logic/useLogin';
import { FormContainer } from '@/components/form/FormContainer';

type Props = {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNavigateSignup: () => void;
};

export const LoginForm = ({
  control,
  errors,
  isSubmitting,
  onSubmit,
  onNavigateSignup,
}: Props) => {
  return (
    <View className="gap-6">
      <FormContainer>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              placeholder="Seu e-mail"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Senha"
              secureTextEntry
              autoComplete="password"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              placeholder="Sua senha"
              required
            />
          )}
        />
      </FormContainer>

      {errors.root?.message && (
        <Text className="text-sm font-medium text-rose-500">
          {errors.root.message}
        </Text>
      )}

      <Button onPress={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>

      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-sm text-slate-600">Não tem conta?</Text>
        <Pressable onPress={onNavigateSignup}>
          <Text className="text-sm font-semibold text-blue-600">
            Criar conta
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
