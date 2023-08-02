import { useDashboard } from "../DashBoardContext/useDashboard";

export function useTransactions() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    transactions: [{}],
    isInitialLoading: false,
    isLoading: false
  }
}
