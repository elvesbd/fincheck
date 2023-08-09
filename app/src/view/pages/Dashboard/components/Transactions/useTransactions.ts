import { useState } from "react";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";

export function useTransactionsController() {
  const [ isFiltersModalOpen, setIsFiltersModalOpen ] = useState(false);
  const { areValuesVisible } = useDashboard();
  const { transactions, isLoading, isInitialLoading } = useTransactions();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  }
}
