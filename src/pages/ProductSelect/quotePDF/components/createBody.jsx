import TemplateImageCost from "../templates/Body/Image/TemplateImageCost";
import TemplateNoImageCost from "../templates/Body/NoImage/TemplateNoImageCost";
import TemplateNoImage from "../templates/Body/NoImage/TemplateNoImage";
import TemplateImage from "../templates/Body/Image/TemplateImage";

const addPricingLabel = ({pdf, isDollar, hasImages}) => {
  pdf.setFontSize(8);
  hasImages ? 
    pdf.text(isDollar ? "**Precios en US$**" : "**Precios en RD$**", 160, 70) :
    pdf.text(isDollar ? "**Precios en US$**" : "**Precios en RD$**", 150, 70)
  
  pdf.setFont('bold');
}

export function CreateBody({
  pdf,
  controlPixelHeight,
  newPage,
  selectedProducts,
  imagesData,
  maxHeight,
  hasCode,
  hasCost,
  style_pdf,
  quoteConfig,
  isDollar,
  hasItbis,
  discount,
  discountIsPorcentage,
  with_delivery,
  deposit,
  price,
  itbis,
  withITBIS,
  hasTips,
  notesInPdf
}) {
  const hasImages = quoteConfig?.has_images;

  addPricingLabel({pdf, isDollar, hasImages})

  if (!hasImages) { //ready
    if (hasCost) {
      return TemplateNoImageCost({
        pdf,
        selectedProducts,
        controlPixelHeight,
        style_pdf,
        hasCode,
        newPage,
        maxHeight,
        isDollar,
        hasItbis,
        hasTips,
        discountIsPorcentage,
        discount,
        with_delivery,
        deposit,
        price,
        itbis,
        withITBIS,
        notesInPdf
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
        newPage,
        maxHeight,
        isDollar,
        hasItbis,
        discountIsPorcentage,
        discount,
        with_delivery,
        deposit,
        price,
        itbis,
        withITBIS,
        notesInPdf
      });
    }
  }

  if (hasImages) {
    if (hasCost) {
      return TemplateImageCost({ //ready
        pdf,
        selectedProducts,
        controlPixelHeight,
        style_pdf,
        imagesData,
        hasCode,
        newPage,
        maxHeight,
        isDollar,
        hasItbis,
        discountIsPorcentage,
        discount,
        with_delivery,
        deposit,
        price,
        itbis,
        withITBIS,
        notesInPdf,
        hasTips
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
        newPage,
        maxHeight,
        isDollar,
        hasItbis,
        discountIsPorcentage,
        discount,
        with_delivery,
        deposit,
        price,
        itbis,
        withITBIS,
        notesInPdf,
        hasTips
      });
    }

  }
}
