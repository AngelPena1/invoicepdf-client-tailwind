import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    code: false,
    cost: false,
    preview: false,
  });

  function toggleCode() {
    return setToggles({ ...toggles, code: !toggles?.code });
  }

  function toggleCost() {
    return setToggles({ ...toggles, cost: !toggles?.cost });
  }

  function togglePreview(bool) {
    return setToggles({ ...toggles, preview: bool });
  }

  return { toggles, toggleCode, toggleCost, togglePreview };
};

export default useToggles;
