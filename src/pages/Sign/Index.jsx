import React from "react";
import Navigation from "./components/Navigation";
import useNavigation from "./hooks/useNavigation";
import CreateSign from "./components/CreateSign";
import UploadDocument from "./components/UploadDocument";
import useInputData from "./hooks/useInputData";
import SetSign from "./components/SetSign";
import useHandlePdf from "./hooks/useHandlePdf";

const Index = () => {
  const { tabs, HandleChangeTabs } = useNavigation();
  const { inputData, HandlePdfChange } = useInputData({HandleChangeTabs});
  const { images, HandleSignPdf } = useHandlePdf({
    fileBase64: inputData?.pdf_file,
  });

  return (
    <section className="flex h-2xl place-content-center place-items-center px-96">
      <div className="mr-10 w-52">
        <Navigation tabs={tabs} HandleChangeTabs={HandleChangeTabs} />
      </div>
      <div className="w-full ">
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
            HandleSignPdf={HandleSignPdf}
          />
        )}
      </div>
    </section>
  );
};

export default Index;
