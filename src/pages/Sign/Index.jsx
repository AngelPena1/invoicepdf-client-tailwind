import React from "react";
import Navigation from "./components/Navigation";
import useNavigation from "./hooks/useNavigation";
import CreateSign from "./components/CreateSign";
import UploadDocument from "./components/UploadDocument";
import useInputData from "./hooks/useInputData";
import SetSign from "./components/SetPDF/SetSign";
import useHandlePdf from "./hooks/useHandlePdf";

const Index = () => {
  const { tabs, HandleChangeTabs } = useNavigation();
  const { inputData, clearSelectedPDF, HandlePdfChange } = useInputData({HandleChangeTabs});
  const { images, HandleSignPdf } = useHandlePdf({
    fileBase64: inputData?.pdf_file,
  });

  return (
    <section className="grid grid-cols-2 h-2xl place-content-center place-items-center lg:px-80">
      <div className="lg:mr-32">
        <Navigation tabs={tabs} HandleChangeTabs={HandleChangeTabs} />
      </div>
      <div className="">
        {tabs?.create_sign && (
          <CreateSign HandleChangeTabs={HandleChangeTabs} />
        )}
        {tabs?.document && (
          <UploadDocument
            inputData={inputData}
            HandlePdfChange={HandlePdfChange}
            HandleChangeTabs={HandleChangeTabs}
          />
        )}
        {tabs?.set_sign && (
          <SetSign
            images={images}
            clearSelectedPDF={clearSelectedPDF}
            HandleChangeTabs={HandleChangeTabs}
            HandleSignPdf={HandleSignPdf}
          />
        )}
      </div>
    </section>
  );
};

export default Index;
