import { useQuery } from "@tanstack/react-query";
import { bankAccount } from "../services/bankAccount";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccount.getAll
  })

  return {
    accounts: data ?? [],
    isFetching
  }
}
