import { cn, formatCurrency } from "../../../../../app/utils";
import { BankAccountTypeIcon } from "../../../../Components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashBoardContext/useDashboard";


interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING'| 'INVESTMENT';
}

export function Card({ color, name, balance, type }: AccountCardProps) {
  const { areValuesVisible } = useDashboard();

  return(
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-teal-950 border-b-4"
      style={{ borderBottomColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span
          className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block"
        >
          {name}
        </span>
      </div>

      <div>
        <span className={cn(
          "text-gray-800 font-medium tracking-[-0.5px] block",
          !areValuesVisible && 'blur-sm'
          )}
        >
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">
          Saldo atual
        </small>
      </div>
    </div>
  );
}
