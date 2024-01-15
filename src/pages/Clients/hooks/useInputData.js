import { useState } from "react";

const useInputData = () => {
  const [inputData, setInputData] = useState({
    search: null,
    name: null,
    email: null,
    razon_social: null,
    rnc: null,
    phone: null,
    phone_2: null,
    isActive: true,
  });

  function HandleInputData(data) {
    return setInputData(data);
  }

  function HandleEditClient(data) {
    return setInputData({
      search: null,
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
      name: null,
      email: null,
      razon_social: null,
      rnc: null,
      phone: null,
      phone_2: null,
      isActive: true,
    });
  }

  return {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleEditClient,
  };
};

export default useInputData;
