import { useState, useEffect } from "react";

const useToggles = ({ quoteData, quoteHasData }) => {
  const [toggles, setToggles] = useState({
    code: false,
    cost: false,
    preview: false,
    itbis: true,
  });

  function HandleToggleChange(event) {
    const { name, value } = event?.target;
    const convertValue = value === "true" ? true : false;
    return setToggles({ ...toggles, [name]: !convertValue });
  }

  function togglePreview(bool) {
    return setToggles({ ...toggles, preview: bool });
  }

  useEffect(() => {
    if (!quoteHasData) return;
    setToggles({
      ...toggles,
      code: quoteData[0]?.has_code,
      cost: quoteData[0]?.has_cost,
      itbis: quoteData[0]?.has_itbis,
    });
    // eslint-disable-next-line
  }, [quoteHasData]);

  return { toggles, togglePreview, HandleToggleChange };
};

export default useToggles;
