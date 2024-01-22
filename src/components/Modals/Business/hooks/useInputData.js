import { useState, useEffect } from "react";

const useInputData = ({ dataArray }) => {
  const [inputData, setInputData] = useState({
    name: null,
    email: null,
    rnc: null,
    phone_1: null,
    phone_2: null,
    address: null,
    image: null,
  });

  function HandleInputData(data) {
    return setInputData(data);
  }

  function CheckForNotEmptyValues() {
    if (inputData?.name.trim() === "" || inputData?.name === null) return true;
    return false;
  }

  function ResetInputValues() {
    return setInputData({
      name: null,
      email: null,
      rnc: null,
      phone_1: null,
      phone_2: null,
      image: null,
    });
  }

  async function HandleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        return setInputData({ ...inputData, image: base64 });
      };

      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    setInputData({
      name: dataArray?.name,
      email: dataArray?.email,
      rnc: dataArray?.rnc,
      phone_1: dataArray?.phone_1,
      phone_2: dataArray?.phone_2,
      address: dataArray?.address,
    });
  }, [dataArray]);

  return {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleImageChange
  };
};

export default useInputData;
