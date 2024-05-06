import { formatToDecimal } from "../../../../../../utils/formatToDecimal/formatToDecimal";
import { FooterWithItbis, FooterNoItbis } from "../../Footer/Index";
//The quote has cost and no img

const TemplateNoImageCost = ({
  pdf,
  selectedProducts,
  controlPixelHeight,
  style_pdf,
  hasCode,
  hasItbis,
  newPage,
  maxHeight,
  discountIsPorcentage,
  discount,
  with_delivery,
  deposit,
  price,
  itbis,
  withITBIS,
  notesInPdf,
  isDollar
}) => {
  //194.5
  //body
  pdf.autoTable({
    body: [
      ["Descripción del producto", "Cant", "P. de Lista", "Precio", "Total"],
    ],
    theme: "grid",
    bodyStyles: {
      // fillColor: style_pdf?.fillColor,
      textColor: style_pdf?.textColorHeading,
      fontSize: 10,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 108.6, fillColor: style_pdf?.fillColorFirstColumn }, //-5
      1: {
        cellWidth: 14.3,
        halign: "center",
        fillColor: style_pdf?.fillColor,
      },
      2: { cellWidth: 23.86, halign: "right", fillColor: style_pdf?.fillColor }, // cost
      3: {
        cellWidth: 23.86,
        halign: "right",
        fillColor: style_pdf?.fillColor,
      },
      4: {
        cellWidth: 23.86,
        halign: "right",
        fillColor: style_pdf?.fillColor,
      }, //21.3 - 3
    },
  });
  selectedProducts.forEach((product) => {
    controlPixelHeight += 5;
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
          formatToDecimal(cost),
          formatToDecimal(price),
          formatToDecimal(total),
        ],
      ],
      theme: "grid",
      bodyStyles: {
        fontSize: 9,
      },
      columnStyles: {
        //194.5 total
        0: { cellWidth: 108.6 }, //-5
        1: { cellWidth: 14.3, halign: "center" },
        2: { cellWidth: 23.86, halign: "right" }, // cost
        3: { cellWidth: 23.86, halign: "right" },
        4: { cellWidth: 23.86, halign: "right" }, //21.3 - 3
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

  pdf.autoTable({
    startY: !newPage ? pdf.lastAutoTable.finalY + 5 : 10,
    body: hasItbis
      ? FooterWithItbis({
          discount,
          discountIsPorcentage,
          with_delivery,
          deposit,
          price,
          itbis,
          withITBIS,
          notesInPdf
        })
      : FooterNoItbis({
          discount,
          discountIsPorcentage,
          with_delivery,
          deposit,
          price,
          notesInPdf
        }),
    theme: "grid",
    bodyStyles: {
      fontSize: 9,
      textColor: style_pdf?.textColorBody,
      lineColor: style_pdf?.lineColor,
    },
    columnStyles: {
      0: { cellWidth: 146.78 },
      1: { cellWidth: 23.86, halign: "right" },
      2: { cellWidth: 23.86, halign: "right" },
    },
  });
  //footer
};

export default TemplateNoImageCost;
