import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks";
import { useDashboard } from "../DashBoardContext/useDashboard";


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

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal
  }
}
