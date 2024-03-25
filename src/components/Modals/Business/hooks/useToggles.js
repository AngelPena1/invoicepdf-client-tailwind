import { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    business: true,
    pdf: false,
  });

  function HandleToggleChange(event) {
    const { name, value } = event?.target;
    const convertValue = value === "true" ? true : false;
    return setToggles({ ...toggles, [name]: !convertValue });
  }

  function HandleToggles(event) {
    const name = event?.target?.getAttribute("name");
    const value =
      event?.target?.getAttribute("value") === "true" ? true : false;

    const allFalse = {
      business: false,
      pdf: false,
    };

    if(value) {
      return setToggles({ ...allFalse, [name]: value });
    }
    
    return setToggles({ ...allFalse, [name]: !value });
  }

  return { toggles, HandleToggles, HandleToggleChange };
};

export default useToggles;
