import { Button } from "../../../../Components/Button";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewTransactionModal } from "./useNewTransactionModal";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType
   } = useNewTransactionModal();

   const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa': 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form action="">
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
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />

          <Select
            placeholder="Categoria"
            options={[
              {
                value: 'CHECKING',
                label: 'Conta Corrente'
              },
              {
                value: 'INVESTMENT',
                label: 'Investimentos'
              },
              {
                value: 'CASH',
                label: 'Dinheiro Físico'
              }
            ]}
          />

          <Select
            placeholder={isExpense ? 'Pagar com': 'Receber com'}
            options={[
              {
                value: 'CHECKING',
                label: 'Conta Corrente'
              },
              {
                value: 'INVESTMENT',
                label: 'Investimentos'
              },
              {
                value: 'CASH',
                label: 'Dinheiro Físico'
              }
            ]}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
