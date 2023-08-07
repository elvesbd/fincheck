import { useDashboard } from "../../components/DashBoardContext/useDashboard";

export function useNewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
  }
}

