import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { SignupParams } from '../../../app/services/auth/interfaces';
import { authService } from '../../../app/services/auth';
import { useAuth } from '../../../app/hooks';


const schema = z.object({
  name: z.string()
    .nonempty('Nome é obrigatório'),
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
})

type FormData = z.infer<typeof schema>;

export function useRegister() {
  const { signin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    }
  })

   const handleSubmit = hookFormSubmit(async(data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch {
      toast.error("Não foi possível criar sua conta!")
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
