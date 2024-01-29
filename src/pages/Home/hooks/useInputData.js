import { useState } from "react";

const useInputData = ({ clientsData }) => {
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
  });

  function HandleSearchInput(event) {
    return setInputData({ ...inputData, search: event?.target?.value });
  }

  function clearSearchInput() {
    return setInputData({...inputData, search: ""})
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
      phone_1: getClientSelected?.phone ? getClientSelected?.phone : "",
      phone_2: getClientSelected?.phone_2 ? getClientSelected?.phone_2 : "",
      address: getClientSelected?.address ? getClientSelected?.address : "",
    });
  }

  return {
    clientInputData,
    inputData,
    clearSearchInput,
    HandleSearchInput,
    HandleDataClient,
  };
};

export default useInputData;
