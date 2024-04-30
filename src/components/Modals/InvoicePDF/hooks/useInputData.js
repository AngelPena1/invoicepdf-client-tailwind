import { useState } from "react";

const useInputData = () => {
  const [inputData, setInputData] = useState({
    invoice_type: "",
  });

  function HandleInputData(event) {
    const { name, value } = event?.target;
    return setInputData({ ...inputData, [name]: value });
  }

  function onClickSelect(value) {
    
  }

  return { inputData, HandleInputData, onClickSelect };
};

export default useInputData;
