import { useState } from "react";

const useNavigation = () => {
  const [tabs, setTabs] = useState({
    create_sign: true,
    document: false,
    set_sign: false,
  });

  function HandleChangeTabs(name) {
    let disabled_tabs = {
      create_sign: false,
      document: false,
      set_sign: false,
    };
    return setTabs({ ...disabled_tabs, [name]: true });
  }

  return { tabs, HandleChangeTabs };
};

export default useNavigation;
