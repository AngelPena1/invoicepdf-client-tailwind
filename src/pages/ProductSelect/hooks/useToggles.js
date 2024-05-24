import { useState, useEffect } from "react";

const useToggles = ({ quoteData, quoteHasData }) => {
  const [toggles, setToggles] = useState({
    code: false,
    cost: false,
    preview: false,
    itbis: true,
    dollar: false,
    tips: false,
    notes: false
  });

  function HandleToggleChange(event) {
    const { name, value } = event?.target;
    const convertValue = value === "true" ? true : false;
    return setToggles({ ...toggles, [name]: !convertValue });
  }

  function togglePreview(bool) {
    return setToggles({ ...toggles, preview: bool });
  }

  function toggleNotes(bool) {
    return setToggles({ ...toggles, notes: bool });
  }

  useEffect(() => {
    if (!quoteHasData) return;
    setToggles({
      ...toggles,
      dollar: quoteData[0]?.isDollar,
      tips: quoteData[0]?.has_tips,
      code: quoteData[0]?.has_code,
      cost: quoteData[0]?.has_cost,
      itbis: quoteData[0]?.has_itbis,
    });
    // eslint-disable-next-line
  }, [quoteHasData]);

  return { toggles, togglePreview, toggleNotes, HandleToggleChange };
};

export default useToggles;
