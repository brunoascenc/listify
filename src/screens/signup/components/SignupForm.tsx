import { Text, View } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SignupFormValues } from '@/screens/signup/logic/useSignup';
import { FormContainer } from '@/components/form/FormContainer';

type Props = {
  control: Control<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNavigateLogin: () => void;
};

export const SignupForm = ({
  control,
  errors,
  isSubmitting,
  onSubmit,
  onNavigateLogin,
}: Props) => {
  return (
    <View className="flex-1 gap-6">
      <FormContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nome"
              autoCapitalize="words"
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
              placeholder="Escreva seu nome"
              required
            />
          )}
        />
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
              placeholder="email@exemplo.com"
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
              placeholder="Digite sua senha de 6 caracteres"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirmar senha"
              secureTextEntry
              autoComplete="password"
              value={value}
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
              placeholder="Confime sua senha de 6 caracteres"
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
        {isSubmitting ? 'Criando conta...' : 'Criar conta'}
      </Button>

      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-sm text-slate-600">Ja tem conta?</Text>
        <Button onPress={onNavigateLogin} className="bg-white px-0">
          <Text className="text-sm font-semibold text-blue-600">Entrar</Text>
        </Button>
      </View>
    </View>
  );
};
