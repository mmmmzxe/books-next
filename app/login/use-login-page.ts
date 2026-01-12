import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin, loginSchema, type LoginFormData } from '@/domains/auth';
import { useToast } from '@/shared/ui';

export function useLoginPage() {
  const { mutate: login, isPending, error } = useLogin();
  const { addToast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@books.com',
      password: 'admin123',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        addToast('Login successful!', 'success');
      },
      onError: (error) => {
        addToast(error.message || 'Login failed', 'error');
      },
    });
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return {
    // Form
    form,
    register: form.register,
    errors: form.formState.errors,

    // State
    isPending,
    error,

    // Actions
    onSubmit: handleFormSubmit,
  };
}
