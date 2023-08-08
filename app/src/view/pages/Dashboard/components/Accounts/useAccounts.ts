import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useWindowWidth } from "../../../../../app/hooks";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { bankAccount } from "../../../../../app/services/bankAccount";


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

  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccount.getAll
  })

  const currentBalance = useMemo(() => {
    if(!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0)
  }, [data])

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    accounts: data,
    currentBalance,
    setSliderState,
    toggleValueVisibility,
    openNewAccountModal,
  }
}
