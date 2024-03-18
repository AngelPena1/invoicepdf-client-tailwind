import React from "react";
import Form from "./Form";
import useToggles from "./hooks/useToggles";
import useGetDivisions from "./hooks/useGetDivisions";
import useSelectData from "./hooks/useSelectData";

const Filters = ({ onClick }) => {
  const { window, toggleWindow, HideWindow } = useToggles();

  const { data: divisionData } = useGetDivisions();

  const {
    selectData,
    cleanData,
    ReturnDataFormat,
    HandleBrandSelect,
    HandleCategorySelect,
    HandleSubcategorySelect,
    HandleFinishesSelected,
  } = useSelectData({ divisionData });

  return (
    <Form
      onClick={onClick}
      selectData={selectData}
      window={window}
      toggleWindow={toggleWindow}
      HideWindow={HideWindow}
      cleanData={cleanData}
      ReturnDataFormat={ReturnDataFormat}
      HandleBrandSelect={HandleBrandSelect}
      HandleCategorySelect={HandleCategorySelect}
      HandleSubcategorySelect={HandleSubcategorySelect}
      HandleFinishesSelected={HandleFinishesSelected}
    />
  );
};

export default Filters;
