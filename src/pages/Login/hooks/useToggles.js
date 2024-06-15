import React, { useState } from "react";

const useToggles = () => {
  const [toggles, setToggles] = useState({
    restart_password: false,
  });

  function HandleToggles(name, value) {
    return setToggles({ ...toggles, [name]: value });
  }

  return { toggles, HandleToggles};
};

export default useToggles;
