import { useMemo, useState } from "react";

import { useWindowWidth } from "../../../../../app/hooks";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";


export function useAccounts() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal,
  } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    currentBalance,
    setSliderState,
    toggleValueVisibility,
    openNewAccountModal,
  }
}
