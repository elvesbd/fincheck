import { Controller } from "react-hook-form";

import { useEditTransactionModal } from "./useEditTransactionModal";
import { Input } from "../../../../Components/Input";
import { Modal } from "../../../../Components/Modal";
import { Button } from "../../../../Components/Button";
import { Select } from "../../../../Components/Select";
import { TrashIcon } from "../../../../Components/icons/TrashIcon";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { DatePickerInput } from "../../../../Components/DatePickerInput";
import { ConfirmDeleteModal } from "../../../../Components/ConfirmDeleteModal";
import { Transaction } from "../../../../../app/services/transactions/interfaces";


interface EditTransactionModalProps {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

export function EditTransactionModal({ transaction, open, onClose }: EditTransactionModalProps) {
  const {
    control,
    errors,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingRemove,
    register,
    handleSubmit,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal
  } = useEditTransactionModal({transaction, onClose});

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
        isLoading={isLoadingRemove}
        title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}`}
      />
    )
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa': 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span
            className="text-gray-600 tracking-[-0.5px] text-xs"
          >
            Valor {isExpense ? 'da despesa': 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span
              className="text-gray-600 tracking-[-0.5px] text-lg"
            >
              R$
            </span>

            <Controller
              control={control}
              name="value"
              defaultValue="0,00"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />


          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => (
                  {
                    value: category.id,
                    label: category.name
                  }
                ))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com': 'Receber com'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => (
                  {
                    value: account.id,
                    label: account.name
                  }
                ))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
