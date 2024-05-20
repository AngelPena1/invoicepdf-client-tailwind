import { useState } from "react";

const useInputData = () => {
  const [inputData, setInputData] = useState("");

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
    const { value } = event.target;
    return setInputData(value);
  }

  function clearInputs() {
    return setInputData("")
  }

  function clearSearchInput() {
    return setInputData({ ...inputData, search: "" });
  }

  return {
    inputData,
    forceRefresh,
    clearSearchInput,
    clearInputs,
    HandleInputData,
    HandleKeyPress,
  };
};

export default useInputData;
