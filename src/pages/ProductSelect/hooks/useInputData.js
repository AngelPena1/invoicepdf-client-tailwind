import { useState, useEffect } from "react";
import { isDecimalOrPorcentage, isNumberOrDecimal } from "../../../utils/regex/isNumberOrDecimal";

const useInputData = ({ clientsData, quoteData, quoteHasData }) => {
  const [clientInputData, setClientInputData] = useState({
    selected_client_id: null,
    name: null,
    razon_social: null,
    rnc: null,
    phone_1: null,
    phone_2: null,
    address: null,
  });

  const [inputData, setInputData] = useState({
    search: "",
    note: "",
    with_delivery: "",
    deposit: "",
    discount: "",
  });

  function HandleInputData(event) {
    const { name, value } = event.target;

    if (name === "search" || name === "note") {
      return setInputData({ ...inputData, [name]: value });
    }
    else if (name === "discount") {
      if(isDecimalOrPorcentage(value)) {
        return setInputData({ ...inputData, [name]: value });
      }
    }
    else if (isNumberOrDecimal(value)) {
      return setInputData({ ...inputData, [name]: value });
    }
  }

  function resetInputNote() {
    return setInputData({ ...inputData, note: "" });
  }

  function clearSearchInput() {
    return setInputData({ ...inputData, search: "" });
  }

  function HandleDataClient(client_id) {
    const getClientSelected = clientsData.filter((client) => {
      return client?.id === client_id;
    })[0];

    return setClientInputData({
      selected_client_id: getClientSelected?.id,
      name: getClientSelected?.name ? getClientSelected?.name : "",
      razon_social: getClientSelected?.razon_social
        ? getClientSelected?.razon_social
        : "",
      rnc: getClientSelected?.rnc ? getClientSelected?.rnc : "",
      phone_1: getClientSelected?.phone_1 ? getClientSelected?.phone_1 : "",
      phone_2: getClientSelected?.phone_2 ? getClientSelected?.phone_2 : "",
      address: getClientSelected?.address ? getClientSelected?.address : "",
    });
  }

  useEffect(() => {
    if (!quoteHasData) return;
    setInputData({
      with_delivery: quoteData[0]?.with_delivery,
      deposit: quoteData[0]?.deposit,
      discount: quoteData[0]?.discount,
    });

    const client = quoteData[0]?.client;
    setClientInputData({
      selected_client_id: client?.id,
      name: client?.name,
      razon_social: client?.razon_social,
      rnc: client?.rnc,
      phone_1: client?.phone_1,
      phone_2: client?.phone_2,
      address: client?.address,
    });
    // eslint-disable-next-line
  }, [quoteHasData]);

  return {
    clientInputData,
    inputData,
    resetInputNote,
    clearSearchInput,
    HandleInputData,
    HandleDataClient,
  };
};

export default useInputData;
