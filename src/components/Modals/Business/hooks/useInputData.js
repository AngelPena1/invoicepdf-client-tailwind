import { useState, useEffect } from "react";

const useInputData = ({ companyData }) => {
  const [inputData, setInputData] = useState({});

  const [quoteInput, setQuoteInput] = useState({
    has_images: false,
  });

  function AsignQuoteData(config) {
    return setQuoteInput(config);
  }

  function ResetCompanyValues() {
    return setInputData(companyData);
  }

  function HandleQuoteInput(event) {
    const {name, value} = event?.target
    const getBool = value === 'true' ? true : false
    return setQuoteInput({...quoteInput, [name]:  !getBool});
  }

  function HandleInputData(data) {
    return setInputData(data);
  }

  function CheckForNotEmptyValues() {
    if (inputData?.name.trim() === "" || inputData?.name === null) return true;
    return false;
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
    if(!companyData) return
    ResetCompanyValues(companyData)
    // eslint-disable-next-line
  }, [companyData]);

  return {
    inputData,
    quoteInput,
    CheckForNotEmptyValues,
    AsignQuoteData,
    ResetCompanyValues,
    HandleInputData,
    HandleQuoteInput,
    HandleImageChange,
  };
};

export default useInputData;
