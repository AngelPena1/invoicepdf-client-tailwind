import { useState, useEffect } from "react";

const useInputData = ({ clientsData, companyData }) => {
  const [companyInputData, setCompanyInputData] = useState({
    name: null,
    razon_social: null,
    rnc: null,
    phone_1: null,
    phone_2: null,
    address: null,
  });

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
    search: null,
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  function HandleSelectedProducts(value) {
    const localArray = [...selectedProducts];
    localArray.push({ ...value, quantity: 1 });
    return setSelectedProducts(localArray);
  }

  function HandleQuantityProduct({ product_id }) {
    return 
  }

  function HandleInputData({ type, value }) {
    switch (type) {
      case "company":
        setCompanyInputData(value);
        break;

      case "client":
        setClientInputData(value);
        break;

      default:
        break;
    }
  }

  function HandleSearchInput(event) {
    return setInputData({ ...inputData, search: event?.target?.value });
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

  function HandleCompanyData() {
    return setCompanyInputData({
      name: companyData[0]?.name,
      rnc: companyData[0]?.rnc,
      email: companyData[0]?.email,
      phone_1: companyData[0]?.phone_1,
      phone_2: companyData[0]?.phone_2,
      address: companyData[0]?.address,
    });
  }

  function ResetInputValues() {
    return setCompanyInputData({
      name: "",
      category_id: "default",
      subcategory_id: "default",
      subcategories: null,
      price: "",
      cost: "",
      description: "",
      image: "",
      image_size: null,
      product_code: "",
      isActive: true,
    });
  }

  async function HandleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        return setCompanyInputData({ ...companyInputData, image: base64 });
      };

      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (!companyData) return;
    HandleCompanyData();
  }, [companyData]);

  return {
    companyInputData,
    clientInputData,
    inputData,
    selectedProducts,
    ResetInputValues,
    HandleImageChange,
    HandleInputData,
    HandleSearchInput,
    HandleSelectedProducts,
    HandleDataClient,
  };
};

export default useInputData;