import { useQuery } from "@tanstack/react-query";
import { bankAccount } from "../services/bankAccount";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccount.getAll,
    staleTime: Infinity
  })

  return {
    accounts: data ?? [],
    isFetching
  }
}
