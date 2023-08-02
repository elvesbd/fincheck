import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks";
import { UseDashboard } from "../DashBoardContext/useDashboard";


export function useAccounts() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValueVisibility } = UseDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility
  }
}
