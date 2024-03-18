import React, { useEffect } from "react";
import useGetCompany from "./hooks/useGetCompanyInfo";
import BusinessForm from "./components/BusinessForm";
import useInputData from "./hooks/useInputData";
import useUpdateCompany from "./hooks/usePostClient";
import useGetCompanyImage from "./hooks/useGetCompanyImage";

const Index = ({ toggleCompanyInfo }) => {
  const { data, HandleSearch } = useGetCompany();

  const {
    inputData,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleImageChange,
  } = useInputData({
    dataArray: data[0],
  });

  const { HandleUpdateClient } = useUpdateCompany({
    data: inputData,
    CheckForNotEmptyValues,
  });

  const { data: companyImage, loading: loading_image } = useGetCompanyImage();

  useEffect(() => {
    if (!companyImage) return;
    HandleInputData({ ...inputData, image: companyImage[0]?.image });
    // eslint-disable-next-line
  }, [companyImage]);

  useEffect(() => {
    HandleSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <BusinessForm
      inputData={inputData}
      loading_image={loading_image}
      HandleInputData={HandleInputData}
      HandleImageChange={HandleImageChange}
      HandleUpdateClient={HandleUpdateClient}
      toggleCompanyInfo={toggleCompanyInfo}
    />
  );
};

export default Index;
