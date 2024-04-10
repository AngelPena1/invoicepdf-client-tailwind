import React, { useEffect } from "react";
import useGetCompany from "./hooks/useGetCompanyInfo";
import BusinessForm from "./components/BusinessForm";
import useInputData from "./hooks/useInputData";
import useUpdateCompany from "./hooks/useUpdateCompany";
import useGetCompanyImage from "./hooks/useGetCompanyImage";
import PanelForm from "./components/PanelForm";
import useToggles from "./hooks/useToggles";
import PdfForm from "./components/PdfForm";
import useQuoteConfig from "./hooks/useQuoteConfig";

const Index = ({ toggleCompanyInfo }) => {
  const { data, HandleSearch } = useGetCompany();

  const {
    inputData,
    quoteInput,
    AsignQuoteData,
    CheckForNotEmptyValues,
    ResetCompanyValues,
    HandleInputData,
    HandleQuoteInput,
    HandleImageChange,
  } = useInputData({
    companyData: data[0],
  });

  const { resetQuoteValue, HandleUpdateConfig } = useQuoteConfig({
    quoteInput,
    AsignQuoteData,
  });

  const { HandleUpdateClient } = useUpdateCompany({
    data: inputData,
    CheckForNotEmptyValues,
  });

  const { data: companyImage, loading: loading_image } = useGetCompanyImage();

  const { toggles, HandleToggles } = useToggles();

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
    <>
      <div
        id="background"
        className="w-screen h-screen bg-slate-500 opacity-40 fixed z-40 inset-0 flex litems-center justify-center"
        onClick={() => {
          toggleCompanyInfo(false);
        }}
      ></div>
      <section className="w-2xl md:w-3xl lg:w-4xl h-2xl bg-white select-none fixed left-0 right-0 top-0 bottom-0 m-auto z-40  flex rounded-lg ">
        <PanelForm toggles={toggles} HandleToggles={HandleToggles} />
        {toggles?.business && (
          <BusinessForm
            inputData={inputData}
            loading_image={loading_image}
            toggleCompanyInfo={toggleCompanyInfo}
            ResetCompanyValues={ResetCompanyValues}
            HandleInputData={HandleInputData}
            HandleImageChange={HandleImageChange}
            HandleUpdateClient={HandleUpdateClient}
          />
        )}
        {toggles?.pdf && (
          <PdfForm
            quoteInput={quoteInput}
            resetQuoteValue={resetQuoteValue}
            toggleCompanyInfo={toggleCompanyInfo}
            HandleUpdateConfig={HandleUpdateConfig}
            HandleQuoteInput={HandleQuoteInput}
          />
        )}
      </section>
    </>
  );
};

export default Index;
