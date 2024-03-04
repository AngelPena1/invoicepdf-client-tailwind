import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    filters: false
  });

  function toggleFilters() {
    return setToggles({ ...toggles, filters: !toggles?.filters });
  }

  return { toggles, toggleFilters };
};

export default useToggles;
