import { useEffect } from "react";
import { useState } from "react";

const useSelectData = ({ divisionData }) => {
  const [selectData, setSelectData] = useState({
    groups: [],
    group_selected: null,
    categories: [],
    category_selected: null,
    subcategories: [],
    subcategory_selected: null,
    finishes: [],
    finishes_selected: null,
  });

  function cleanData() {
    return {
      groups: [],
      group_selected: null,
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
      group_selected: selectData?.group_selected,
      category_selected: selectData?.category_selected,
      subcategory_selected: selectData?.subcategory_selected,
      finishes_selected: selectData?.finishes_selected,
    };
  }

  function getGroupOnly() {
    let localArray = divisionData.map((data) => {
      return { id: data?.id, name: data?.name };
    });
    return setSelectData({ ...selectData, groups: localArray });
  }

  function getCategoriesOnly(group_id) {
    let localArray = [];
    divisionData.forEach((data) => {
      if (data?.id !== group_id) return;
      localArray.push(...data?.categories);
    });
    return localArray;
  }

  function getFinishesOnly(group_id) {
    let localArray = [];
    divisionData.forEach((data) => {
      if (data?.id !== group_id) return;
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

  function HandleGroupSelect(group_id) {
    return setSelectData({
      ...selectData,
      group_selected: group_id,
      categories: getCategoriesOnly(group_id),
      finishes: getFinishesOnly(group_id),
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
    getGroupOnly();
    // eslint-disable-next-line
  }, [divisionData]);

  return {
    selectData,
    cleanData,
    ReturnDataFormat,
    HandleGroupSelect,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleFinishesSelected,
  };
};

export default useSelectData;
