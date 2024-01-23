import { useState } from "react";

const useTabNavigation = () => {
  const [tab, setTab] = useState("default");

  function HandleChangeTab(event) {
    return setTab(event);
  }

  return { tab, HandleChangeTab };
};

export default useTabNavigation;
