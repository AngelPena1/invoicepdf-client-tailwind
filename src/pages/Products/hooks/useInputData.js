import { useState } from "react";

const useInputData = ({categoriesData}) => {
  const [inputData, setInputData] = useState({
    search: null,
    name: null,
    category_id: null,
    subcategory_id: null,
    subcategories: null,
    price: null,
    description: null,
    image: null,
    image_size: null,
    product_code: null,
    isActive: true,
  });

  function HandleInputData(data) {
    return setInputData(data);
  }

  function HandleCategorySelect(category_id) {

    let subcategories;

    categoriesData.forEach((category) => {
      if(category?.id !== category_id) return
      if(!(category?.subcategories?.length > 0)) return
      subcategories = category?.subcategories
    })
    

    return setInputData({...inputData, category_id: category_id, subcategories: subcategories})
  }

  function HandleEditProduct(data) {
    return setInputData({
      search: null,
      product_id: data?.id,
      name: data?.name,
      category_id: data?.category?.id,
      price: data?.price,
      description: data?.description,
      image_size: data?.size,
      product_code: data?.code,
      isActive: data?.isActive
    });
  }

  function CheckForNotEmptyValues() {
    if (inputData?.name.trim() === "" || inputData?.name === null) return true;
    if (
      inputData?.category?.name.trim() === "" ||
      inputData?.category?.name === null ||
      inputData?.category?.name === "default"
    )
      return true;
    if (inputData?.price.trim() === "" || inputData?.price === null)
      return true;
    if (inputData?.description === "" || inputData?.description === null)
      return true;
    // if (inputData?.image === "" || inputData?.image === null) return true;
    if (inputData?.image_size === "" || inputData?.image_size === null)
      return true;
    if (
      inputData?.product_code.trim() === "" ||
      inputData?.product_code === null
    )
      return true;
    return false;
  }

  function ResetInputValues() {
    return setInputData({
      name: "",
      category_id: "default",
      price: "",
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
        return setInputData({ ...inputData, image: base64 });
      };

      reader.readAsDataURL(file);
    }
  }
  return {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleCategorySelect,
    HandleImageChange,
    HandleEditProduct
  };
};

export default useInputData;
