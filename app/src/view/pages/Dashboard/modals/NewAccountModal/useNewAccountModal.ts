import { useDashboard } from "../../components/DashBoardContext/useDashboard";

export function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal
  }
}

