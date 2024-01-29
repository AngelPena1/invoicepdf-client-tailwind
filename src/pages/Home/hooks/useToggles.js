import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    code: false,
    cost: false,
  });

  function toggleCode() {
    return setToggles({ ...toggles, code: !toggles?.code });
  }

  function toggleCost() {
    return setToggles({ ...toggles, cost: !toggles?.cost });
  }

  return { toggles, toggleCode, toggleCost };
};

export default useToggles;
