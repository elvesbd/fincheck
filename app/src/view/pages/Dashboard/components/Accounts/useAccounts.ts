import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks";


export function useAccounts() {
  const windowWidth = useWindowWidth();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return { sliderState, setSliderState, windowWidth }
}
