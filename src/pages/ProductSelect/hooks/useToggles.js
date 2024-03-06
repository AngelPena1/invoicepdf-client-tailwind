import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    code: false,
    cost: false,
    preview: false,
    itbis: true,
  });

  function HandleToggleChange(event) {
    const { name, value } = event?.target;
    const convertValue = value === 'true' ? true : false
    return setToggles({ ...toggles, [name]: !convertValue});
  }

  function togglePreview(bool) {
    return setToggles({ ...toggles, preview: bool });
  }

  return { toggles, togglePreview, HandleToggleChange };
};

export default useToggles;
