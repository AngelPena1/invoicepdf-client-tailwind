import { useState } from "react";
import toast from "react-hot-toast";
import { isDecimalOrPorcentage } from "../../../utils/regex/isNumberOrDecimal";

const useInputData = ({ divisionsData }) => {
  const [inputData, setInputData] = useState({
    search: "",
    name: "",
    description: "",
    group_id: "",
    finishes_id: "",
    finishes: "",
    category_id: "",
    categories: "",
    subcategory_id: "",
    subcategories: "",
    price: "",
    price_us: "",
    cost: "",
    image: "",
    image_size: "",
    product_code: "",
    isActive: true,
  });

  function HandleInputData(event) {
    const { value, name } = event?.target;

    if (name === "cost" || name === "price" || name === "price_us") {
      if (isDecimalOrPorcentage(value)) {
        return setInputData({ ...inputData, [name]: value });
      }
    } else if (name === "isActive") {
      return setInputData({ ...inputData, [name]: !inputData?.isActive });
    } else return setInputData({ ...inputData, [name]: value });
  }

  function HandleEventSearch(event) {
    return setInputData({ ...inputData, search: event?.target?.value });
  }

  function ResetImage() {
    return setInputData({ ...inputData, image: "" });
  }

  function getFinishes(group_id) {
    let finishes = [];

    divisionsData.forEach((group) => {
      if (group?.id !== group_id) return;
      if (!(group?.finishes?.length > 0)) return;
      finishes = group?.finishes;
    });

    return finishes;
  }

  function getCategories(group_id) {
    let categories = [];

    divisionsData.forEach((group) => {
      if (group?.id !== group_id) return;
      if (!(group?.categories?.length > 0)) return;
      categories = group?.categories;
    });

    return categories;
  }

  function getSubcategories(category_id) {
    let subcategories = [];

    divisionsData.forEach((group) => {
      group.categories.forEach((category) => {
        if (category?.id !== category_id) return;
        if (!(category?.subcategories?.length > 0)) return;
        subcategories = category?.subcategories;
      });
    });

    return subcategories;
  }

  function HandleGroupSelect(group_id) {
    let categories = [];
    let finishes = [];

    divisionsData.forEach((group) => {
      if (group?.id !== group_id) return;
      if (!(group?.categories?.length > 0)) return;
      categories = group?.categories;
      finishes = group?.finishes;
    });

    return setInputData({
      ...inputData,
      group_id: group_id,
      categories: categories,
      finishes: finishes,
    });
  }

  function HandleCategorySelect(category_id) {
    let subcategories = [];

    divisionsData.forEach((group) => {
      group.categories.forEach((category) => {
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
      group_id: data?.group?.id,
      finishes_id: data?.finish?.id,
      finishes_code: data?.finish?.code,
      finishes: getFinishes(data?.group?.id),
      category_id: data?.category?.id,
      categories: getCategories(data?.group?.id),
      subcategory_id: data?.subcategory?.id,
      subcategories: getSubcategories(data?.category?.id),
      price: data?.price,
      price_us: data?.price_us,
      cost: data?.cost,
      description: data?.description,
      image_size: data?.size,
      product_code: data?.code,
      isActive: data?.isActive,
    });
  }

  function CheckForNotEmptyValues() {
    try {
      if (inputData?.description === "" || inputData?.description === null)
        return true;
      // if (
      //   inputData?.category?.name.trim() === "" ||
      //   inputData?.category?.name === null ||
      //   inputData?.category?.name === "default"
      // )
      //   return true;
      if (inputData?.price.trim() === "" || inputData?.price === null)
        return true;

      // if (inputData?.image === "" || inputData?.image === null) return true;
      // if (inputData?.image_size === "" || inputData?.image_size === null)
      //   return true;
      // if (
      //   inputData?.product_code.trim() === "" ||
      //   inputData?.product_code === null
      // )
      //   return true;
      return false;
    } catch (error) {
      toast.error("Error al comprobar campos.");
      console.error(error);
    }
  }

  function ResetInputValues() {
    return setInputData({
      search: "",
      name: "",
      group_id: "",
      category_id: "",
      category: "",
      subcategory_id: "",
      subcategories: "",
      finishes_id: "",
      finishes: "",
      price: "",
      price_us: "",
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
    ResetImage,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleEventSearch,
    HandleGroupSelect,
    HandleFinishesSelect,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleImageChange,
    HandleEditProduct,
  };
};

export default useInputData;
