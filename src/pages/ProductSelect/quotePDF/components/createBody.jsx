import { formatToDecimal } from "../../../../utils/formatToDecimal/formatToDecimal";
import no_image from '../../../../assets/no-image2.jpg'

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

export function createBody({
  pdf,
  controlPixelHeight,
  newPage,
  selectedProducts,
  imagesData,
  maxHeight,
  hasCode,
  hasCost,
}) {
  if (hasCost) {
    pdf.autoTable({
      body: [["Descripción", "Cant", "Imagen", "P. Lista", "Precio", "Total"]],
      theme: "grid",
      bodyStyles: {
        fillColor: "#0082bf",
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: "bold",
        minCellHeight: 10,
      },
      columnStyles: { //191.5 total
        0: { cellWidth: 86.3 },
        1: { cellWidth: 11.3, halign: "center" },
        2: { cellWidth: 36.3, halign: "center" },
        3: { cellWidth: 18, halign: "right" }, // cost
        4: { cellWidth: 18.3, halign: "right" },
        5: { cellWidth: 21.3, halign: "right" },
      },
    });
    selectedProducts.forEach((product) => {
      const sizeImg = getSizePixel(product?.size ? product?.size : "small");
      controlPixelHeight += sizeImg;
      const getImage = imagesData.filter((image) => {
        return product?.id === image?.id;
      })[0]?.image;
      const description = product?.description;
      const productCode = product?.code;
      const descriptionSwitch = hasCode
        ? `${description} \n\nCódigo: ${productCode}`
        : `${description}`;
      const quantity = parseFloat(product?.quantity);
      const cost = parseFloat(product?.cost);
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
            descriptionSwitch,
            quantity,
            "",
            formatToDecimal(cost),
            formatToDecimal(price),
            formatToDecimal(total),
          ],
        ],
        theme: "grid",
        bodyStyles: {
          minCellHeight: sizeImg,
          fontSize: 9,
        },
        columnStyles: {
          0: { cellWidth: 86.3 },
          1: { cellWidth: 11.3, halign: "center" },
          2: { cellWidth: 36.3, halign: "center" },
          3: { cellWidth: 18, halign: "right" }, // cost
          4: { cellWidth: 18.3, halign: "right" },
          5: { cellWidth: 21.3, halign: "right" },
        },
        didDrawCell: function (data) {
          if (data.column.index === 3 && data.cell.section === "body") {
            pdf.addImage(
              getImage ? getImage : no_image,
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
  } else {
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
        0: { cellWidth: 90.3 },
        1: { cellWidth: 13.3, halign: "center" },
        2: { cellWidth: 36.3, halign: "center" },
        3: { cellWidth: 24.3, halign: "right" },
        4: { cellWidth: 27.3, halign: "right" },
      },
    });
    selectedProducts.forEach((product) => {
      const sizeImg = getSizePixel(product?.size ? product?.size : "small");
      controlPixelHeight += sizeImg;
      const getImage = imagesData.filter((image) => {
        return product?.id === image?.id;
      })[0]?.image;
      const description = product?.description;
      const productCode = product?.code;
      const descriptionSwitch = hasCode
        ? `${description} \n\nCódigo: ${productCode}`
        : `${description}`;
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
            descriptionSwitch,
            quantity,
            "",
            formatToDecimal(price),
            formatToDecimal(total),
          ],
        ],
        theme: "grid",
        bodyStyles: {
          minCellHeight: sizeImg,
          fontSize: 9,
        },
        columnStyles: {
          //+18
          0: { cellWidth: 90.3 },
          1: { cellWidth: 13.3, halign: "center" },
          2: { cellWidth: 36.3, halign: "center" },
          3: { cellWidth: 24.3, halign: "right" },
          4: { cellWidth: 27.3, halign: "right" },
        },
        didDrawCell: function (data) {
          if (data.column.index === 3 && data.cell.section === "body") {
            pdf.addImage(
              getImage ? getImage : no_image,
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
  //Body
}
