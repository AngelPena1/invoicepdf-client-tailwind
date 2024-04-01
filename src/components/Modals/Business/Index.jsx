import React, { useEffect } from "react";
import useGetCompany from "./hooks/useGetCompanyInfo";
import BusinessForm from "./components/BusinessForm";
import useInputData from "./hooks/useInputData";
import useUpdateCompany from "./hooks/usePostClient";
import useGetCompanyImage from "./hooks/useGetCompanyImage";
import PanelForm from "./components/PanelForm";
import useToggles from "./hooks/useToggles";
import PdfForm from "./components/PdfForm";

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
            HandleInputData={HandleInputData}
            HandleImageChange={HandleImageChange}
            HandleUpdateClient={HandleUpdateClient}
            toggleCompanyInfo={toggleCompanyInfo}
          />
        )}
        {toggles?.pdf && (
          <PdfForm
            inputData={inputData}
            loading_image={loading_image}
            HandleInputData={HandleInputData}
            HandleImageChange={HandleImageChange}
            HandleUpdateClient={HandleUpdateClient}
            toggleCompanyInfo={toggleCompanyInfo}
          />
        )}
        <section className="absolute right-4 bottom-4 place-content-end">
          <div>
            <button
              type="button"
              className="px-2 button-2"
              onClick={() => {
                // toggleCompanyInfo(false);
              }}
            >
              Descartar Cambios
            </button>
            <button
              type="submit"
              className="px-2 ml-4 bg-primary"
              //   onClick={HandleUpdateClient}
            >
              Guardar Cambios
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default Index;
