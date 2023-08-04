import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../Components/Modal";
import { Button } from "../../../../Components/Button";


interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Receitas">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>
      </div>

      <div className="space-y-2 mt-2">
        <button className="p-2 rounded-2xl !bg-gray-200 w-full text-left hover:bg-gray-50 transition-colors">
          Nubank
        </button>

        <button className="p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors">
          XP Investimentos
        </button>

        <button className="p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors">
          Dinheiro
        </button>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">
          Ano
        </span>


        <div className="mt-2 w-52 flex items-center justify-center">
          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6 " />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">2023</span>
          </div>

          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6 " />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
