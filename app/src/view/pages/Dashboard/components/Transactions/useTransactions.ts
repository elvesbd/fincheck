import { useState } from "react";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useTransactions() {
  const { areValuesVisible } = useDashboard();
  const [ isFiltersModalOpen, setIsFiltersModalOpen ] = useState(true);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    transactions: [{}],
    isInitialLoading: false,
    isLoading: false,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  }
}
