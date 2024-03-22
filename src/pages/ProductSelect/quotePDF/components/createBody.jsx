import { formatToDecimal } from "../../../../utils/formatToDecimal/formatToDecimal";
import no_image from "../../../../assets/white.jpg";

function getSizePixel(value) {
  let pixel;

  switch (value) {
    case "small":
      pixel = 18;
      break;

    case "medium":
      pixel = 26;
      break;

    case "large":
      pixel = 36;
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
  style_pdf,
}) {
  if (hasCost) {
    pdf.autoTable({
      body: [
        [
          "Descripción del producto",
          "Cant",
          "Imagen",
          "P. Lista",
          "Precio",
          "Total",
        ],
      ],
      theme: "grid",
      bodyStyles: {
        // fillColor: style_pdf?.fillColor,
        textColor: style_pdf?.textColor,
        fontSize: 10,
        fontStyle: "bold",
        minCellHeight: 10,
      },
      columnStyles: {
        //191.5 total
        0: { cellWidth: 81.3, fillColor: style_pdf?.fillColorFirstColumn }, //-5
        1: {
          cellWidth: 11.3,
          halign: "center",
          fillColor: style_pdf?.fillColor,
        },
        2: {
          cellWidth: 44.3,
          halign: "center",
          fillColor: style_pdf?.fillColor,
        }, //44.3
        3: { cellWidth: 18, halign: "right", fillColor: style_pdf?.fillColor }, // cost
        4: {
          cellWidth: 18.3,
          halign: "right",
          fillColor: style_pdf?.fillColor,
        },
        5: {
          cellWidth: 18.3,
          halign: "right",
          fillColor: style_pdf?.fillColor,
        }, //21.3 - 3
      },
    });
    selectedProducts.forEach((product) => {
      const sizeImg = getSizePixel(product?.size ? product?.size : "small");
      controlPixelHeight += sizeImg;
      const getImage = imagesData.filter((image) => {
        return product?.id === image?.id;
      })[0]?.image;
      let description = product?.description;
      if (product?.notes) {
        product?.notes.forEach((note, index) => {
          if (index === 0) {
            description = `${description}\n\n ${note}`;
          } else {
            description = `${description}\n ${note}`;
          }
        });
      }
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
          minCellHeight: sizeImg + 5,
          fontSize: 9,
        },
        columnStyles: {
          //191.5 total
          0: { cellWidth: 81.3 }, //-5
          1: { cellWidth: 11.3, halign: "center" },
          2: { cellWidth: 44.3, halign: "center" }, //44.3
          3: { cellWidth: 18, halign: "right" }, // cost
          4: { cellWidth: 18.3, halign: "right" },
          5: { cellWidth: 18.3, halign: "right" }, //21.3 - 3
        },
        didDrawCell: function (data) {
          if (
            data.column.index === 3 &&
            data.cell.section === "body" &&
            product?.size === "large"
          ) {
            //when is small
            pdf.addImage(
              getImage ? getImage : no_image,
              data?.table?.body[0]?.cells[2]?.x + 4,
              data?.table?.body[0]?.cells[2]?.y + 2,
              sizeImg, // X //36.3
              sizeImg // Y
            );
          } else if (
            data.column.index === 3 &&
            data.cell.section === "body" &&
            product?.size === "medium"
          ) {
            //when is small
            pdf.addImage(
              getImage ? getImage : no_image,
              data?.table?.body[0]?.cells[2]?.x + 10,
              data?.table?.body[0]?.cells[2]?.y + 2,
              sizeImg, // X //36.3
              sizeImg // Y
            );
          } else if (data.column.index === 3 && data.cell.section === "body") {
            //when is small
            pdf.addImage(
              getImage ? getImage : no_image,
              data?.table?.body[0]?.cells[2]?.x + 13,
              data?.table?.body[0]?.cells[2]?.y + 3,
              sizeImg, // X //36.3
              sizeImg // Y
            );
          }
        },
      });

      newPage = false;
    });
  } else {
    pdf.autoTable({
      body: [["Descripción del producto", "Cant", "Imagen", "Precio", "Total"]],
      theme: "grid",
      bodyStyles: {
        // fillColor: style_pdf?.fillColor,
        textColor: style_pdf?.textColorHeading,
        fontSize: 10,
        fontStyle: "bold",
        minCellHeight: 10,
        lineColor: style_pdf?.lineColor,
      },
      columnStyles: {
        0: { cellWidth: 88.3, fillColor: style_pdf?.fillColorFirstColumn }, //-5 + 3
        1: {
          cellWidth: 13.3,
          halign: "center",
          fillColor: style_pdf?.fillColor,
        },
        2: {
          cellWidth: 44.3,
          halign: "center",
          fillColor: style_pdf?.fillColor,
        }, // +5
        3: {
          cellWidth: 24.3,
          halign: "right",
          fillColor: style_pdf?.fillColor,
        },
        4: {
          cellWidth: 24.3,
          halign: "right",
          fillColor: style_pdf?.fillColor,
        }, // -3
      },
    });
    selectedProducts.forEach((product) => {
      const sizeImg = getSizePixel(product?.size ? product?.size : "small");
      controlPixelHeight += sizeImg;
      const getImage = imagesData.filter((image) => {
        return product?.id === image?.id;
      })[0]?.image;
      let description = product?.description;
      const productCode = product?.code;
      if (product?.notes) {
        product?.notes.forEach((note, index) => {
          if (index === 0) {
            description = `${description}\n\n ${note}`;
          } else {
            description = `${description}\n ${note}`;
          }
        });
      }
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
          minCellHeight: sizeImg + 5,
          fontSize: 9,
          lineColor: style_pdf?.lineColor,
          textColor: style_pdf?.textColorBody,
        },
        columnStyles: {
          0: { cellWidth: 88.3 }, //-5 + 3
          1: { cellWidth: 13.3, halign: "center" },
          2: { cellWidth: 44.3, halign: "center" }, // +5
          3: { cellWidth: 24.3, halign: "right" },
          4: { cellWidth: 24.3, halign: "right" }, // -3
        },
        didDrawCell: function (data) {
          if (
            data.column.index === 3 &&
            data.cell.section === "body" &&
            product?.size === "large"
          ) {
            //when is small
            pdf.addImage(
              getImage ? getImage : no_image,
              data?.table?.body[0]?.cells[2]?.x + 4,
              data?.table?.body[0]?.cells[2]?.y + 2,
              sizeImg, // X //36.3
              sizeImg // Y
            );
          } else if (
            data.column.index === 3 &&
            data.cell.section === "body" &&
            product?.size === "medium"
          ) {
            //when is small
            pdf.addImage(
              getImage ? getImage : no_image,
              data?.table?.body[0]?.cells[2]?.x + 10,
              data?.table?.body[0]?.cells[2]?.y + 2,
              sizeImg, // X //36.3
              sizeImg // Y
            );
          } else if (data.column.index === 3 && data.cell.section === "body") {
            //when is small
            pdf.addImage(
              getImage ? getImage : no_image,
              data?.table?.body[0]?.cells[2]?.x + 13,
              data?.table?.body[0]?.cells[2]?.y + 3,
              sizeImg, // X //36.3
              sizeImg // Y
            );
          }
        },
      });
      newPage = false;
    });
  }
  //Body
}
