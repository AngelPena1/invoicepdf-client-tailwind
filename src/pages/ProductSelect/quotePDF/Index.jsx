import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import { CreateHeading } from "./components/CreateHeading";
import { CreateBody } from "./components/CreateBody";
// import { CreateFooter } from "./components/CreateFooter";
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


function stylesPDF(type) {
  let styles = {}

  switch (type) {
    case 1:
      styles = {
        fillColorFirstColumn: "#0082bf",
        fillColor: "#0082bf",
        textColorHeading: [255, 255, 255],
        textColorBody: [0, 0, 0],
        lineColor: "#cdcdcd",
      }
      break;

    case 2:
      styles = {
        fillColorFirstColumn: "#f1dbda",
        fillColor: [255, 255, 255],
        textColorHeading: "#0b0992",
        textColorBody: "#0b0992",
        lineColor: [0, 0, 0],
      }
      break;
  
    default:
      break;
  }

  return styles
}

export async function GenerarPDF({
  name,
  companyData,
  selectedProducts,
  imagesData,
  clientData,
  companyImgData,
  discountIsPorcentage,
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
  quoteId,
  quoteHasData,
  quoteConfig
}) {
  try {
    const pdf = new jsPDF({
      format: "letter",
    });
    let controlPixelHeight = 0;
    let newPage = false;
    const quote_counter = !quoteHasData ? await getQuoteCounter(companyData[0]?.id) : quoteId

    const style_pdf = stylesPDF(companyData[0]?.style_pdf)

    CreateHeading({
      quoteName: name,
      pdf,
      companyData,
      clientData,
      companyImgData,
      hasCost,
      isAlreadyCreated,
      quote_counter,
      style_pdf
    });
    CreateBody({
      pdf,
      newPage,
      controlPixelHeight,
      selectedProducts,
      imagesData,
      maxHeight,
      hasCode,
      hasCost,
      hasItbis,
      style_pdf,
      quoteConfig,
      discountIsPorcentage,
      discount,
      with_delivery,
      deposit,
      cost,
      price,
      itbis,
      withITBIS,
    });

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
