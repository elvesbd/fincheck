import * as z from 'zod';
import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccount } from '../../../../../app/services/bankAccount';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';


const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório!'),
  name: z.string().nonempty('Nome da conta é obrigatório!'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {required_error: 'Selecione o tipo da conta!'}),
  color: z.string().nonempty('Cor é obrigatória!')
})

type FormData = z.infer<typeof schema>;

export function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset
   } = useForm<FormData>({
    resolver: zodResolver(schema)
   });
  const { isLoading, mutateAsync } = useMutation(bankAccount.create);

  const queyClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance)
      });

      queyClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta cadastrada com sucesso!')
      closeNewAccountModal();
      reset()
    } catch (error) {
      toast.error('Erro ao cadastrar a conta!')
    }
  })

  return {
    isNewAccountModalOpen,
    control,
    errors,
    isLoading,
    closeNewAccountModal,
    register,
    handleSubmit,
  }
}

