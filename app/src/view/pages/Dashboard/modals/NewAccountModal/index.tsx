import { ColorsDropDownInput } from "../../../../Components/ColorsDropDownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewAccountModal } from "./useNewAccountModal";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useNewAccountModal();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form action="">
        <div>
          <span
            className="text-gray-600 tracking-[-0.5px] text-xs"
          >
            Saldo
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
            placeholder="Nome da Conta"
          />

          <Select
            placeholder="Tipo"
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

          <ColorsDropDownInput />

        </div>
      </form>
    </Modal>
  );
}
