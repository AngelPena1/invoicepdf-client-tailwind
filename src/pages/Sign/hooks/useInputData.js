import { useState } from "react";

const useInputData = ({HandleChangeTabs}) => {
  const [inputData, setInputData] = useState({
    pdf_file: "",
  });

  function clearSelectedPDF() {
    return setInputData({...inputData, pdf_file: ""})
  }

  async function HandlePdfChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convertir el archivo PDF a base64
        const pdfData = reader.result;
        setInputData({ ...inputData, pdf_file: pdfData });
        HandleChangeTabs('set_sign')
      };
      reader.readAsDataURL(file);
    }
  }
  
  return { inputData, clearSelectedPDF, HandlePdfChange };
};

export default useInputData;
