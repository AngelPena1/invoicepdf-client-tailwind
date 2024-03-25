import { useState, useEffect } from "react";

const useInputData = ({ dataArray }) => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    rnc: "",
    phone_1: "",
    phone_2: "",
    address: "",
    image: "",
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
      name: "",
      email: "",
      rnc: "",
      phone_1: "",
      phone_2: "",
      image: "",
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
