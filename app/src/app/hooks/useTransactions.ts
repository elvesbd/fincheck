import { useQuery } from "@tanstack/react-query";
import { transactions } from "../services/transactions";

export function useTransactions() {
  const { data, isFetching, isInitialLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactions.getAll({
      month: 7,
      year: 2023,
    })
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading
  }
}
