import { useState } from "react";

const useToggles = () => {
  const [window, setWindow] = useState(false);

  function toggleWindow() {
    return setWindow(!window);
  }

  function HideWindow() {
    return setWindow(false);
  }
  return { window, toggleWindow, HideWindow };
};

export default useToggles;
