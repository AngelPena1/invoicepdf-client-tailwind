import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import { createHeading } from "./components/createHeading";
import { createBody } from "./components/createBody";
import { createFooter } from "./components/createFooter";
import { getQuoteCounter } from "../axios/getQuoteCounter";

const maxHeight = 170;

function addWaterMark(pdf) {
  const totalPages = pdf.internal.getNumberOfPages();

  const watermarkText = "Borrador";

  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setTextColor(150);
    pdf.setFontSize(95);
    pdf.text(watermarkText, 65, 100, { angle: -45 });
  }

  return pdf;
}

export async function GenerarPDF({
  name,
  companyData,
  selectedProducts,
  imagesData,
  clientData,
  companyImgData,
  discount,
  with_delivery,
  deposit,
  cost,
  price,
  itbis,
  withITBIS,
  isPreview,
  isAlreadyCreated,
  hasItbis,
  hasCode,
  hasCost,
}) {
  try {
    const pdf = new jsPDF({
      format: "letter",
    });
    let controlPixelHeight = 0;
    let newPage = false;
    createHeading({
      quoteName: name,
      pdf,
      companyData,
      clientData,
      companyImgData,
      hasCost,
      isAlreadyCreated
    });
    createBody({
      pdf,
      newPage,
      controlPixelHeight,
      selectedProducts,
      imagesData,
      maxHeight,
      hasCode,
      hasCost,
    });
    createFooter({
      pdf,
      newPage,
      maxHeight,
      controlPixelHeight,
      hasItbis,
      hasCost,
      discount,
      with_delivery,
      deposit,
      cost,
      price,
      itbis,
      withITBIS,
    });

    const quote_counter = await getQuoteCounter(companyData[0]?.id);

    if (isPreview) {
      const pdfWithWatermark = addWaterMark(pdf);
      return pdfWithWatermark.output(
        "dataurlnewwindow",
        "PREVIEW RC-" + quote_counter
      );
    }

    if (isAlreadyCreated) {
      return pdf.save(name);
    } 
    return pdf.save("Cotización RC-" + quote_counter);
  } catch (error) {
    console.error(error);
    toast.error("Error al crear la cotización");
  }
}
