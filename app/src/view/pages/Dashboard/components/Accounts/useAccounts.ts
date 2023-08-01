import { useState } from "react";


export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return { sliderState, setSliderState }
}
