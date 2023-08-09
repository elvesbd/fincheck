import * as z from 'zod';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { Transaction } from '../../../../../app/services/transactions/interfaces';
import { transactions } from '../../../../../app/services/transactions';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor!'),
    z.number()
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date()
})
type FormData = z.infer<typeof schema>

interface UseEditTransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}


export function useEditTransactionModal({ transaction, onClose }: UseEditTransactionModalProps) {
  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date()
    }
  });
  const { accounts } = useBankAccounts();
  const { categories:  categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactions.update);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (!transaction?.id) return;

      await mutateAsync({
        ...data,
        id: transaction.id,
        value: currencyStringToNumber(data.value),
        type: transaction.type,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] })

      toast.success(
        transaction.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      )
      onClose();
    } catch (error) {
      toast.error(
        transaction?.type === 'EXPENSE'
          ? 'Erro ao editar a despesa!'
          : 'Erro ao editar a receita!'
      )
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  return {
    errors,
    control,
    accounts,
    categories,
    isLoading,
    register,
    handleSubmit,
  }
}

