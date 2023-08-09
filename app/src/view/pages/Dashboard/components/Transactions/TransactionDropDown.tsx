import { ChevronDownIcon } from "@radix-ui/react-icons";

import { ExpensesIcon, IncomeIcon, TransactionsIcon } from "../../../../Components/icons";
import { DropDownMenu } from "../../../../Components/DropDownMenu";


interface TransactionDropDownProps {
  onSelect: (type: 'INCOME' | 'EXPENSE' | undefined) => void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionDropDown({ onSelect, selectedType }: TransactionDropDownProps) {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === undefined && 'Transações'}
          </span>

          <ChevronDownIcon className="text-gray-900"/>
        </button>
      </DropDownMenu.Trigger>

      <DropDownMenu.Content className="w-[230px]">
        <DropDownMenu.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropDownMenu.Item>

        <DropDownMenu.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropDownMenu.Item>

        <DropDownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropDownMenu.Item>
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  );
}
