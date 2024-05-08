import { formatToDecimal } from "../../../../../../utils/formatToDecimal/formatToDecimal";
import { Footer } from "../../Footer/Index";
//The quote has cost and no img

const TemplateNoImage = ({
  pdf,
  selectedProducts,
  controlPixelHeight,
  style_pdf,
  hasCode,
  newPage,
  maxHeight,
  isDollar,
  hasItbis,
  discount,
  discountIsPorcentage,
  with_delivery,
  deposit,
  price,
  tips,
  itbis,
  withITBIS,
  notesInPdf,
  hasTips,
}) => {
  //194.5
  //body
  pdf.autoTable({
    body: [["Descripción del producto", "Cant", "Precio", "Total"]],
    theme: "grid",
    bodyStyles: {
      // fillColor: style_pdf?.fillColor,
      textColor: style_pdf?.textColorHeading,
      fontSize: 10,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 116.55, fillColor: style_pdf?.fillColorFirstColumn }, //-5
      1: {
        cellWidth: 14.3,
        halign: "center",
        fillColor: style_pdf?.fillColor,
      },
      2: {
        cellWidth: 31.81,
        halign: "right",
        fillColor: style_pdf?.fillColor,
      },
      3: {
        cellWidth: 31.81,
        halign: "right",
        fillColor: style_pdf?.fillColor,
      },
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
        0: { cellWidth: 116.55 }, //-5
        1: { cellWidth: 14.3, halign: "center" },
        2: { cellWidth: 31.81, halign: "right" },
        3: { cellWidth: 31.81, halign: "right" },
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
    column_with_1: 130.85,
    column_with_2: 31.81,
    column_with_3: 31.81,
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

export default TemplateNoImage;
