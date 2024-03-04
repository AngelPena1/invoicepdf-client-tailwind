import { useState } from "react";

const useInputData = () => {
  const [inputData, setInputData] = useState({
    search: "",
    brand_selected: null,
    category_selected: null,
    subcategory_selected: null,
    finishes_selected: null,
  });

  const [forceRefresh, setForceRefresh] = useState(false)

  function toggleRefresh() {
    return setForceRefresh(!forceRefresh)
  }

  function HandleKeyPress(event) {
    if (event.key === 'Enter') {
      return toggleRefresh()
    }
  }

  function HandleInputData(event) {
    const { name, value } = event.target;
    return setInputData({ ...inputData, [name]: value });
  }
  
  function HandleClickFilters(selects) {
    setInputData({
      ...inputData,
      brand_selected: selects?.brand_selected,
      category_selected: selects?.category_selected,
      subcategory_selected: selects?.subcategory_selected,
      finishes_selected: selects?.finishes_selected,
    });

    return toggleRefresh()
  }

  function clearSearchInput() {
    return setInputData({ ...inputData, search: "" });
  }

  return {
    inputData,
    forceRefresh,
    clearSearchInput,
    HandleInputData,
    HandleKeyPress,
    HandleClickFilters,
  };
};

export default useInputData;
