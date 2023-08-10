import * as z from 'zod';
import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccount } from '../../../../../app/services/bankAccount';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useState } from 'react';


const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório!'),
    z.number()
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório!'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {required_error: 'Selecione o tipo da conta!'}),
  color: z.string().nonempty('Cor é obrigatória!')
})

type FormData = z.infer<typeof schema>;

export function useEditAccountModal() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color
    },
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateAccount } = useMutation(bankAccount.update);
  const { isLoading: isLoadingRemove, mutateAsync: removeAccount } = useMutation(bankAccount.remove);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta editada com sucesso!')
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao salvar as alterações!')
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta deletada com sucesso!')
      closeEditAccountModal();
    } catch (error) {
      toast.error('Erro ao deletar a conta!')
    }
  }

  return {
    isEditAccountModalOpen,
    control,
    errors,
    isLoading,
    isDeleteModalOpen,
    isLoadingRemove,
    closeEditAccountModal,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount
  }
}

