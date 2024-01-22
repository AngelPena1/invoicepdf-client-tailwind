import { useState } from "react";

const useInputData = () => {
  const [companyInputData, setCompanyInputData] = useState({
    name: null,
    razon_social: null,
    rnc: null,
    phone_1: null,
    phone_2: null,
    address: null
  });

  const [clientInputData, setClientInputData] = useState({
    name: null,
    razon_social: null,
    rnc: null,
    phone_1: null,
    phone_2: null,
    address: null
  });

  function HandleInputData({type, value}) {
    if(type === "company") {
      return setCompanyInputData(value)
    }
    
    else if(type === "client") {
      return setClientInputData(value)
    }
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
      isActive: true
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
  return {
    companyInputData,
    clientInputData,
    ResetInputValues,
    HandleImageChange,
    HandleInputData,
  };
};

export default useInputData;
