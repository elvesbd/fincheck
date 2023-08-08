import { Controller } from "react-hook-form";
import { Button } from "../../../../Components/Button";
import { ColorsDropDownInput } from "../../../../Components/ColorsDropDownInput";
import { Input } from "../../../../Components/Input";
import { InputCurrency } from "../../../../Components/InputCurrency";
import { Modal } from "../../../../Components/Modal";
import { Select } from "../../../../Components/Select";
import { useNewAccountModal } from "./useNewAccountModal";

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    handleSubmit,
    control,
    errors
  } = useNewAccountModal();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span
            className="text-gray-600 tracking-[-0.5px] text-xs"
          >
            Saldo inicial
          </span>

          <div className="flex items-center gap-2">
            <span
              className="text-gray-600 tracking-[-0.5px] text-lg"
            >
              R$
            </span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0,00"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
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
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropDownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
