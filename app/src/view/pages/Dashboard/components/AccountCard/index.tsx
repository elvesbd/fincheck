import { formatCurrency } from "../../../../../app/utils";
import { CategoryIcon } from "../../../../Components/icons/categories/CategoryIcon";


interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
}

export function AccountCard({ color, name, balance }: AccountCardProps) {
  return(
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-teal-950 border-b-4"
      style={{ borderBottomColor: color }}
    >
      <div>
        <CategoryIcon type="income" />
        <span
          className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block"
        >
          {name}
        </span>
      </div>

      <div className="">
        <span className="text-gray-800 font-medium tracking-[-0.5px] block">
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">
          Saldo atual
        </small>
      </div>
    </div>
  );
}
