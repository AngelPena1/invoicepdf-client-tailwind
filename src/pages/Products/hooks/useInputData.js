import { useState } from "react";

const useInputData = ({ divisionsData }) => {
  const [inputData, setInputData] = useState({
    search: "",
    name: "",
    description: "",
    brand_id: "",
    finishes_id: "",
    finishes: "",
    category_id: "",
    categories: "",
    subcategory_id: "",
    subcategories: "",
    price: "",
    cost: "",
    image: "",
    image_size: "",
    product_code: "",
    isActive: true,
  });

  function HandleInputData(data) {
    return setInputData(data);
  }

  function HandleEventSearch(event) {
    return setInputData({ ...inputData, search: event?.target?.value });
  }

  function getFinishes(brand_id) {
    let finishes = [];

    divisionsData.forEach((brand) => {
      if (brand?.id !== brand_id) return;
      if (!(brand?.finishes?.length > 0)) return;
      finishes = brand?.finishes;
    });

    return finishes;
  }

  function getCategories(brand_id) {
    let categories = [];

    divisionsData.forEach((brand) => {
      if (brand?.id !== brand_id) return;
      if (!(brand?.categories?.length > 0)) return;
      categories = brand?.categories;
    });

    return categories;
  }

  function getSubcategories(category_id) {
    let subcategories = [];

    divisionsData.forEach((brand) => {
      brand.categories.forEach((category) => {
        if (category?.id !== category_id) return;
        if (!(category?.subcategories?.length > 0)) return;
        subcategories = category?.subcategories;
      });
    });

    return subcategories;
  }

  function HandleBrandSelect(brand_id) {
    let categories = [];
    let finishes = [];

    divisionsData.forEach((brand) => {
      if (brand?.id !== brand_id) return;
      if (!(brand?.categories?.length > 0)) return;
      categories = brand?.categories;
      finishes = brand?.finishes;
    });

    return setInputData({
      ...inputData,
      brand_id: brand_id,
      categories: categories,
      finishes: finishes,
    });
  }

  function HandleCategorySelect(category_id) {
    let subcategories = [];

    divisionsData.forEach((brand) => {
      brand.categories.forEach((category) => {
        if (category?.id !== category_id) return;
        if (!(category?.subcategories?.length > 0)) return;
        subcategories = category?.subcategories;
      });
    });

    return setInputData({
      ...inputData,
      category_id: category_id,
      subcategories: subcategories,
    });
  }

  function HandleFinishesSelect(finishes_id) {
    return setInputData({ ...inputData, finishes_id });
  }

  function HandleSubcategorySelect(subcategory_id) {
    return setInputData({ ...inputData, subcategory_id: subcategory_id });
  }

  function HandleEditProduct(data) {
    return setInputData({
      search: "",
      product_id: data?.id,
      name: data?.name,
      brand_id: data?.brand?.id,
      finishes_id: data?.finish?.id,
      finishes_code: data?.finish?.code,
      finishes: getFinishes(data?.brand?.id),
      category_id: data?.category?.id,
      categories: getCategories(data?.brand?.id),
      subcategory_id: data?.subcategory?.id,
      subcategories: getSubcategories(data?.category?.id),
      price: data?.price,
      cost: data?.cost,
      description: data?.description,
      image_size: data?.size,
      product_code: data?.code,
      isActive: data?.isActive,
    });
  }

  function CheckForNotEmptyValues() {
    if (inputData?.description === "" || inputData?.description === null)
      return true;
    if (
      inputData?.category?.name.trim() === "" ||
      inputData?.category?.name === null ||
      inputData?.category?.name === "default"
    )
      return true;
    if (inputData?.price.trim() === "" || inputData?.price === null)
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
      search: "",
      name: "",
      brand_id: "default",
      category_id: "default",
      category: "",
      subcategory_id: "default",
      subcategories: "",
      finishes_id: "default",
      finishes: "",
      price: "",
      cost: "",
      description: "",
      image: "",
      image_size: "",
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
    HandleEventSearch,
    HandleBrandSelect,
    HandleFinishesSelect,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleImageChange,
    HandleEditProduct,
  };
};

export default useInputData;
