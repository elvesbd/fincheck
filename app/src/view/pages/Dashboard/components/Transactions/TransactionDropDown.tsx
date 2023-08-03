import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ExpensesIcon, IncomeIcon, TransactionsIcon } from "../../../../Components/icons";
import { DropDownMenu } from "../../../../Components/DropDownMenu";

export function TransactionDropDown() {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <button className="flex items-center gap-2">
          <TransactionsIcon />

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            Transações
          </span>

          <ChevronDownIcon className="text-gray-900"/>
        </button>
      </DropDownMenu.Trigger>

      <DropDownMenu.Content className="w-[230px]">
        <DropDownMenu.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </DropDownMenu.Item>

        <DropDownMenu.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropDownMenu.Item>

        <DropDownMenu.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </DropDownMenu.Item>
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  );
}
