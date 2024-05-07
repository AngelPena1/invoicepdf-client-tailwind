import TemplateImageCost from "../templates/Body/Image/TemplateImageCost";
import TemplateNoImageCost from "../templates/Body/NoImage/TemplateNoImageCost";
import TemplateNoImage from "../templates/Body/NoImage/TemplateNoImage";
import TemplateImage from "../templates/Body/Image/TemplateImage";

export function CreateBody({
  pdf,
  controlPixelHeight,
  newPage,
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
  notesInPdf,
  isDollar
}) {
  const hasImages = quoteConfig?.has_images;

  pdf.setFontSize(8);
  pdf.text(isDollar ? "**Precios en US$**" : "**Precios en RD$**", 150, 70)
  pdf.setFont('bold');

  if (!hasImages) { //ready
    if(hasCost) {
      return TemplateNoImageCost({
        pdf,
        selectedProducts,
        controlPixelHeight,
        style_pdf,
        imagesData,
        hasCode,
        hasItbis,
        newPage,
        maxHeight,
        discountIsPorcentage,
        discount,
        with_delivery,
        deposit,
        cost,
        price,
        itbis,
        withITBIS,
        notesInPdf,
        isDollar
      });
    }
    else {
      return TemplateNoImage({
        pdf,
        selectedProducts,
        controlPixelHeight,
        style_pdf,
        imagesData,
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
      });
    }
  }

  if (hasImages) {
    if(hasCost) {
      return TemplateImageCost({ //ready
        pdf,
        selectedProducts,
        controlPixelHeight,
        style_pdf,
        imagesData,
        hasCode,
        hasItbis,
        newPage,
        maxHeight,
        discount,
        discountIsPorcentage,
        with_delivery,
        deposit,
        cost,
        price,
        itbis,
        withITBIS,
        notesInPdf,
        isDollar
      });
    }
    else {
      return TemplateImage({ //ready
        pdf,
        selectedProducts,
        controlPixelHeight,
        style_pdf,
        imagesData,
        hasCode,
        hasItbis,
        newPage,
        maxHeight,
        discount,
        with_delivery,
        deposit,
        price,
        itbis,
        withITBIS,
        notesInPdf,
        isDollar
      });
    }
    
  }
}
