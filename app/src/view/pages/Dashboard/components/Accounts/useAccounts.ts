import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useWindowWidth } from "../../../../../app/hooks";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { bankAccount } from "../../../../../app/services/bankAccount";


export function useAccounts() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValueVisibility,
    openNewAccountModal
  } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccount.getAll
  })

  return {
    sliderState,
    windowWidth,
    areValuesVisible,
    isLoading: isFetching,
    accounts: data,
    setSliderState,
    toggleValueVisibility,
    openNewAccountModal
  }
}
