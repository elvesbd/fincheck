import { useEffect, useState } from "react";

import { useDashboard } from "../DashBoardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionFilters } from "../../../../../app/services/transactions/interfaces";


export function useTransactionsController() {
  const [ isFiltersModalOpen, setIsFiltersModalOpen ] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const { areValuesVisible } = useDashboard();
  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetch
  } = useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch])

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleApplyFilters({ bankAccountId, year }: { bankAccountId: string | undefined, year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    isFiltersModalOpen,
    filters,
    areValuesVisible,
    transactions,
    isLoading,
    isInitialLoading,
    handleChangeFilters,
    handleApplyFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  }
}
