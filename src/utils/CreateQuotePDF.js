import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import { formatToDecimal } from "./formatToDecimal/formatToDecimal";
import calculate from "../pages/Home/utils/calculate";

const maxHeight = 170;

function getSizePixel(value) {
  let pixel;

  switch (value) {
    case "small":
      pixel = 25;
      break;

    case "medium":
      pixel = 50;
      break;
    default:
      break;
  }

  return pixel;
}

function capitalizarPrimeraLetra(palabra) {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

function obtenerFechaActualFormateada() {
  const opcionesDeFecha = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const fechaActual = new Date();

  const fechaFormateada = fechaActual.toLocaleDateString(
    "es-ES",
    opcionesDeFecha
  );
  const palabrasFecha = fechaFormateada.split(" ");

  // Capitalizar la primera letra de cada palabra
  const fechaCapitalizada = palabrasFecha
    .map((palabra, index) =>
      index === 0 ? capitalizarPrimeraLetra(palabra) : palabra.toLowerCase()
    )
    .join(" ");
  return fechaCapitalizada;
}

function createHeading({ pdf, companyData, clientInputData, companyImgData }) {
  //Company info
  const name = companyData[0]?.name;
  const rnc = companyData[0]?.rnc;
  const quote_counter = companyData[0]?.quote_counter;
  const phone = companyData[0]?.phone_1;
  const address = companyData[0]?.address;

  //Client info
  const clientName = clientInputData?.name;
  const clientCompName = clientInputData?.razon_social;
  const clientRnc = clientInputData?.rnc;
  const clientPhone_1 = clientInputData?.phone_1;

  const logoWidth = 50;
  const logoHeight = 25;
  const fontSizeTitle = 12;
  const fontSize = 10;
  const fontStyleTitle = "normal";

  pdf.autoTable({
    body: [[""]],
    theme: "grid",
    bodyStyles: {
      minCellHeight: 50,
    },
    didDrawCell: function (data) {
      if (data.column.index === 0 && data.cell.section === "body") {
        pdf.addImage(
          companyImgData[0]?.image,
          15, // X
          22, // Y
          logoWidth, // X
          logoHeight // Y
        );

        pdf.text("Cotización # RC-" + quote_counter, 18, 57);
        pdf.text(obtenerFechaActualFormateada(), 18, 62);

        //Company Info
        const distanceCompany_X = 75;
        pdf.setFontSize(fontSizeTitle);
        pdf.setFont(fontStyleTitle);
        pdf.text("Información del Negocio: ", distanceCompany_X, 25);
        pdf.setFontSize(fontSize);
        pdf.text("Razón Social: " + name, distanceCompany_X, 32);
        pdf.text("RNC: " + rnc, distanceCompany_X, 37);
        pdf.text("Teléfono: " + phone, distanceCompany_X, 42);
        pdf.text("Dirección: " + address, distanceCompany_X, 47);

        //Client Info
        const distanceClient_X = 140;
        pdf.setFontSize(fontSizeTitle);
        pdf.setFont(fontStyleTitle);
        pdf.text("Información del Cliente: ", distanceClient_X, 25);
        pdf.setFontSize(fontSize);
        pdf.text("Nombre: " + clientName, distanceClient_X, 32);
        pdf.text("Razón Social: " + clientCompName, distanceClient_X, 37);
        pdf.text("RNC: " + clientRnc, distanceClient_X, 42);
        pdf.text("Teléfono: " + clientPhone_1, distanceClient_X, 47);
      }
    },
  });
}

function createBody({
  pdf,
  controlPixelHeight,
  newPage,
  selectedProducts,
  imagesData,
}) {
  //Header
  pdf.autoTable({
    body: [["Descripción", "Cant", "Imagen", "Precio", "Total"]],
    theme: "grid",
    bodyStyles: {
      fillColor: "#0082bf",
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold",
      minCellHeight: 10,
    },
    columnStyles: {
      0: { cellWidth: 86.3 },
      1: { cellWidth: 13.3, halign: "center" },
      2: { cellWidth: 36.3, halign: "center" },
      3: { cellWidth: 24.3, halign: "center" },
      4: { cellWidth: 27.3, halign: "center" },
    },
  });

  //Body
  selectedProducts.forEach((product, index) => {
    const sizeImg = getSizePixel(product?.size);
    controlPixelHeight += sizeImg;
    const getImage = imagesData.filter((image) => {
      return product?.id === image?.id;
    })[0]?.image;
    const description = product?.description;
    const quantity = parseFloat(product?.quantity);
    const price = parseFloat(product?.price);
    const total = quantity * price;

    if (controlPixelHeight > maxHeight) {
      controlPixelHeight = 0;
      newPage = true;
      pdf.addPage();
    }

    //190 max
    pdf.autoTable({
      startY: !newPage ? pdf.lastAutoTable.finalY : 10,
      body: [
        [
          description,
          quantity,
          "",
          formatToDecimal(price),
          formatToDecimal(total),
        ],
      ],
      theme: "grid",
      bodyStyles: {
        minCellHeight: sizeImg,
      },
      columnStyles: {
        0: { cellWidth: 86.3 },
        1: { cellWidth: 13.3, halign: "center" },
        2: { cellWidth: 36.3, halign: "center" },
        3: { cellWidth: 24.3, halign: "right" },
        4: { cellWidth: 27.3, halign: "right" },
      },
      didDrawCell: function (data) {
        if (data.column.index === 3 && data.cell.section === "body") {
          pdf.addImage(
            getImage,
            data?.table?.body[0]?.cells[2]?.x + 1,
            data?.table?.body[0]?.cells[2]?.y + 1,
            36.3 - 2, // X
            sizeImg - 2 // Y
          );
        }
      },
    });

    newPage = false;
  });
}

function createFooter({ pdf, controlPixelHeight, newPage, results }) {
  controlPixelHeight += 40;
  if (controlPixelHeight > maxHeight) {
    controlPixelHeight = 0;
    newPage = true;
    pdf.addPage();
  }

  pdf.autoTable({
    startY: !newPage ? pdf.lastAutoTable.finalY : 10,
    body: [
      [
        "1. Tiempo de Entrega: 5-7 semanas una vez confirmado el pedido con anticipo.",
        "Descuento",
        "0.00",
      ],
      [
        "2. Forma de pago: 70% de anticipo. Saldo contra entrega.",
        "Subtotal",
        formatToDecimal(results?.subtotal),
      ],
      ["3. No incluye ITBIS.", "ITBIS", formatToDecimal(results?.itbis)],
      ["", "Total", formatToDecimal(results?.total)],
      ["", "Anticipo", "0.00"],
      ["", "Con Entrega", "0.00"],
    ],
    theme: "grid",
    bodyStyles: {
      minCellHeight: 8,
    },
    columnStyles: {
      0: { cellWidth: 135.9 },
      1: { cellWidth: 24.3, halign: "right" },
      2: { cellWidth: 27.3, halign: "right" },
    },
  });
}

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

export const GenerarPDF = ({
  companyData,
  selectedProducts,
  imagesData,
  clientInputData,
  companyImgData,
  isPreview
}) => {
  try {
    const pdf = new jsPDF({
      format: "letter",
    });
    let controlPixelHeight = 0;
    let newPage = false;
    const results = calculate({ selectedProducts });
    const quote_counter = companyData[0]?.quote_counter;
    createHeading({ pdf, companyData, clientInputData, companyImgData });
    createBody({
      pdf,
      newPage,
      controlPixelHeight,
      selectedProducts,
      imagesData,
    });
    createFooter({ pdf, newPage, controlPixelHeight, results });
    
    if(isPreview) {
      const pdfWithWatermark = addWaterMark(pdf);
      return pdfWithWatermark.output();
    }
    
    return pdf.save("Cotización RC-" + quote_counter);
  } catch (error) {
    console.error(error);
    toast.error("Error al crear la cotización");
  }
};
