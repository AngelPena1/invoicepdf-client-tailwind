import { useEffect } from "react";
import { useState } from "react";

const useSelectData = ({ divisionData }) => {
  const [selectData, setSelectData] = useState({
    brands: [],
    brand_selected: null,
    categories: [],
    category_selected: null,
    subcategories: [],
    subcategory_selected: null,
    finishes: [],
    finishes_selected: null,
  });

  function cleanData() {
    return {
      brands: [],
      brand_selected: null,
      categories: [],
      category_selected: null,
      subcategories: [],
      subcategory_selected: null,
      finishes: [],
      finishes_selected: null,
    };
  }

  function ReturnDataFormat() {
    return {
      brand_selected: selectData?.brand_selected,
      category_selected: selectData?.category_selected,
      subcategory_selected: selectData?.subcategory_selected,
      finishes_selected: selectData?.finishes_selected,
    };
  }

  function getBrandOnly() {
    let localArray = divisionData.map((data) => {
      return { id: data?.id, name: data?.name };
    });
    return setSelectData({ ...selectData, brands: localArray });
  }

  function getCategoriesOnly(brand_id) {
    let localArray = [];
    divisionData.forEach((data) => {
      if (data?.id !== brand_id) return;
      localArray.push(...data?.categories);
    });
    return localArray;
  }

  function getFinishesOnly(brand_id) {
    let localArray = [];
    divisionData.forEach((data) => {
      if (data?.id !== brand_id) return;
      localArray.push(...data?.finishes);
    });
    return localArray;
  }

  function getSubcategoriesOnly(category_id) {
    let localArray = [];
    selectData?.categories.forEach((data) => {
      if (data?.id !== category_id) return;
      localArray.push(...data?.subcategories);
    });
    return localArray;
  }

  function HandleBrandSelect(brand_id) {
    return setSelectData({
      ...selectData,
      brand_selected: brand_id,
      categories: getCategoriesOnly(brand_id),
      finishes: getFinishesOnly(brand_id),
    });
  }

  function HandleCategorySelect(category_id) {
    return setSelectData({
      ...selectData,
      category_selected: category_id,
      subcategories: getSubcategoriesOnly(category_id),
    });
  }

  function HandleSubcategorySelect(subcategory_id) {
    return setSelectData({
      ...selectData,
      subcategory_selected: subcategory_id,
    });
  }

  function HandleFinishesSelected(finishes_id) {
    return setSelectData({
      ...selectData,
      finishes_selected: finishes_id,
    });
  }

  useEffect(() => {
    getBrandOnly();
    // eslint-disable-next-line
  }, [divisionData]);

  return {
    selectData,
    cleanData,
    ReturnDataFormat,
    HandleBrandSelect,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleFinishesSelected,
  };
};

export default useSelectData;
