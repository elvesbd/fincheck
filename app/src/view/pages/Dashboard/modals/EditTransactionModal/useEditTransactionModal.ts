import * as z from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { Transaction } from '../../../../../app/services/transactions/interfaces';

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


export function useEditTransactionModal(transaction: Transaction | null) {
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

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log({data})
  })

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  return {
    errors,
    control,
    accounts,
    categories,
    isLoading: false,
    register,
    handleSubmit,
  }
}

