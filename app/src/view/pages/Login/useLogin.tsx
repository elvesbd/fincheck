import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { authService } from '../../../app/services/auth';
import { SigninParams } from '../../../app/services/auth/interfaces';
import { useAuth } from '../../../app/hooks';


const schema = z.object({
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
})

type FormData = z.infer<typeof schema>;

export function useLogin() {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    }
  })

  const handleSubmit = hookFormSubmit(async(data) => {
    try {
      await mutateAsync(data);
      signin();
    } catch {
      toast.error("Credenciais inválidas!")
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
