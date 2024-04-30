import React from "react";
import Form from "./components/Form";
import useGetCountbook from "./hooks/useGetCountbook";
import useInputData from "./hooks/useInputData";

const Index = () => {
  const { data: countbookData } = useGetCountbook();
  const { inputData, HandleInputData, onClickSelect } = useInputData();

  return (
    <Form
      countbookData={countbookData}
      inputData={inputData}
      HandleInputData={HandleInputData}
      onClickSelect={onClickSelect}
    />
  );
};

export default Index;
