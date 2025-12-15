import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { signUp } from '@/services/auth/signUp';

const schema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.email('Informe um e-mail valido'),
    password: z.string().min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas nao conferem.',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof schema>;

export const useSignup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const setUser = useAuthStore(state => state.setUser);

  const onSubmit = handleSubmit(async data => {
    try {
      const user = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setUser(user);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao criar conta. Tente novamente.';
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
