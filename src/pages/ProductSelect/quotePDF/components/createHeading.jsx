// import no_image from '../../../../assets/no-image.png'
import no_image from '../../../../assets/no-image2.jpg'

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

export function CreateHeading({
  quoteName,
  pdf,
  companyData,
  clientData,
  companyImgData,
  isAlreadyCreated,
  quote_counter,
  style_pdf
}) {
  //Company info
  const name = companyData[0]?.name ? companyData[0]?.name : "";
  const rnc = companyData[0]?.rnc ? companyData[0]?.rnc : "";
  const phone = companyData[0]?.phone_1 ? companyData[0]?.phone_1 : "";
  const address = companyData[0]?.address ? companyData[0]?.address : "";
  
  const nameQuote = isAlreadyCreated ? quoteName : "Cotización # RC-" + quote_counter

  //Client info
  const clientName = clientData?.name ? clientData?.name : "";
  const clientCompName = clientData?.razon_social ? clientData?.razon_social : "";
  const clientRnc = clientData?.rnc ? clientData?.rnc : "";
  const clientPhone_1 = clientData?.phone_1 ? clientData?.phone_1 : "";

  const logoWidth = 45;
  const logoHeight = 25;
  const fontSizeTitle = 12;
  const fontSize = 10;
  const fontStyleTitle = "normal";

  pdf.autoTable({
    body: [[""]],
    theme: "grid",
    bodyStyles: {
      minCellHeight: 50,
      textColor: style_pdf?.textColorBody,
      lineColor: style_pdf?.lineColor
    },
    tableWidth: 194.5,
    didDrawCell: function (data) {
      if (data.column.index === 0 && data.cell.section === "body") {
        pdf.addImage(
          companyImgData[0]?.image ? companyImgData[0]?.image : no_image,
          15, // X
          22, // Y
          logoWidth, // X
          logoHeight // Y
        );

        pdf.text(nameQuote, 18, 57);
        pdf.text(obtenerFechaActualFormateada(), 18, 62);

        //Company Info
        const distanceCompany_X = 70;
        pdf.setFontSize(fontSizeTitle);
        pdf.setFont(fontStyleTitle);
        pdf.text("Información del Negocio: ", distanceCompany_X, 25);
        pdf.setFontSize(fontSize);
        pdf.text("Razón Social: " + name?.substring(0, 30), distanceCompany_X, 32);
        pdf.text("RNC: " + rnc?.substring(0, 30), distanceCompany_X, 37);
        pdf.text("Teléfono: " + phone?.substring(0, 30), distanceCompany_X, 42);
        pdf.text("Dirección: " + address?.substring(0, 30), distanceCompany_X, 47);

        //Client Info
        const distanceClient_X = 140;
        pdf.setFontSize(fontSizeTitle);
        pdf.setFont(fontStyleTitle);
        pdf.text("Información del Cliente: ", distanceClient_X, 25);
        pdf.setFontSize(fontSize);
        pdf.text("Nombre: " + clientName?.substring(0, 30), distanceClient_X, 32);
        pdf.text("Razón Social: " + clientCompName?.substring(0, 30), distanceClient_X, 37);
        pdf.text("RNC: " + clientRnc?.substring(0, 30), distanceClient_X, 42);
        pdf.text("Teléfono: " + clientPhone_1?.substring(0, 30), distanceClient_X, 47);
      }
    },
  });
}
