import { useQuery } from "@tanstack/react-query";
import { transactions } from "../services/transactions";
import { TransactionFilters } from "../services/transactions/interfaces";

export function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactions.getAll(filters),
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetch
  }
}
