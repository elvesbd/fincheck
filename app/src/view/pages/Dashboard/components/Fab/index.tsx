import { PlusIcon } from "@radix-ui/react-icons";

import { DropDownMenu } from "../../../../Components/DropDownMenu";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../Components/icons/BankAccountIcon";
import { useDashboard } from "../DashBoardContext/useDashboard";


export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropDownMenu.Root>
        <DropDownMenu.Trigger>
          <button
            className="bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white"
          >
            <PlusIcon className="w-6 h-6"/>
          </button>
        </DropDownMenu.Trigger>

        <DropDownMenu.Content>
          <DropDownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropDownMenu.Item>

          <DropDownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
          <CategoryIcon type="income" />
            Nova Receita
          </DropDownMenu.Item>

          <DropDownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu.Root>
    </div>
  );
}
