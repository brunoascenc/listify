import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { signIn } from '@/services/auth/signIn';

const schema = z.object({
  email: z.email('Informe um e-mail válido'),
  password: z.string().min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
});

export type LoginFormValues = z.infer<typeof schema>;

export const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });
  const setUser = useAuthStore(state => state.setUser);

  const onSubmit = handleSubmit(async data => {
    try {
      const user = await signIn({
        email: data.email,
        password: data.password,
      });
      setUser(user);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao entrar. Tente novamente.';
      setError('root', { message });
    }
  });

  return {
    control,
    errors,
    isSubmitting,
    onSubmit,
  };
};
