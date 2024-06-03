import { useState } from "react";

const useInputData = () => {
  const [inputData, setInputData] = useState({
    search: "",
    name: "",
    email: "",
    razon_social: "",
    rnc: "",
    phone: "",
    phone_2: "",
    isActive: true,
  });

  function HandleInputData(data) {
    return setInputData(data);
  }

  function HandleSearchInput(event) {
    return setInputData({...inputData, search: event?.target?.value});
  }

  function HandleEditClient(data) {
    return setInputData({
      search: "",
      client_id: data?.id,
      company_id: data?.company_id,
      name: data?.name,
      email: data?.email,
      razon_social: data?.razon_social,
      rnc: data?.rnc,
      phone: data?.phone,
      phone_2: data?.phone_2,
      isActive: data?.isActive,
    });
  }

  function CheckForNotEmptyValues() {
    if (inputData?.name.trim() === "" || inputData?.name === null) return true;
    return false;
  }

  function ResetInputValues() {
    return setInputData({
      name: "",
      email: "",
      razon_social: "",
      rnc: "",
      phone: "",
      phone_2: "",
      isActive: true,
    });
  }

  return {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleEditClient,
    HandleSearchInput
  };
};

export default useInputData;
