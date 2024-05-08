import { formatToDecimal } from "../../../../../../utils/formatToDecimal/formatToDecimal";
import { getSizePixel } from "../../../../utils/getSizePixel";
import no_image from "../../../../../../assets/white.jpg";
import { Footer } from "../../Footer/Index";

//The quote has cost and img

const TemplateImageCost = ({
  pdf,
  selectedProducts,
  controlPixelHeight,
  style_pdf,
  imagesData,
  hasCode,
  newPage,
  maxHeight,
  hasItbis,
  discountIsPorcentage,
  discount,
  with_delivery,
  deposit,
  price,
  itbis,
  tips,
  withITBIS,
  notesInPdf,
  isDollar,
  hasTips
}) => {
  //194.5 max
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
      textColor: style_pdf?.textColorHeading,
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
        cellWidth: 19.8,
        halign: "right",
        fillColor: style_pdf?.fillColor,
      },
      5: {
        cellWidth: 19.8,
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
    const price = isDollar ? parseFloat(product?.price_us) : parseFloat(product?.price);
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
        4: { cellWidth: 19.8, halign: "right" },
        5: { cellWidth: 19.8, halign: "right" }, //21.3 - 3
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

  //Footer
  controlPixelHeight += 45;
  if (controlPixelHeight > maxHeight) {
    controlPixelHeight = 0;
    newPage = true;
    pdf.addPage();
  }

  let footerWith = {
    column_with_1: 154.9,
    column_with_2: 19.8,
    column_with_3: 19.8,
  }

  Footer({
    pdf,
    footerWith,
    newPage,
    style_pdf,
    hasItbis,
    discount,
    discountIsPorcentage,
    with_delivery,
    deposit,
    price,
    itbis,
    withITBIS,
    notesInPdf,
    hasTips,
    tips
  })
};

export default TemplateImageCost;
