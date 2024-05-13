import TemplateImageCost from "../templates/body/Image/TemplateImageCost";
import TemplateNoImageCost from "../templates/body/NoImage/TemplateNoImageCost";
import TemplateNoImage from "../templates/body/NoImage/TemplateNoImage";
import TemplateImage from "../templates/body/Image/TemplateImage";

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
  tips,
  itbis,
  withITBIS,
  hasTips,
  notesInPdf,
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
        tips,
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
        tips,
        withITBIS,
        notesInPdf,
        hasTips
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
        tips,
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
        hasTips,
        tips
      });
    }

  }
}
