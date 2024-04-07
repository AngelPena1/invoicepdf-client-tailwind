import t_body_image_cost from "../templates/body/t_body_image_cost";
import t_body_image from "../templates/body/t_body_image";
import TemplateItbisCost from "../templates/TemplateItbisCost";

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
  discount,
  with_delivery,
  deposit,
  cost,
  price,
  itbis,
  withITBIS,
}) {
  const hasImages = quoteConfig?.hasImages;

  if (hasCost && !hasImages) {
    return TemplateItbisCost({
      pdf,
      selectedProducts,
      controlPixelHeight,
      style_pdf,
      imagesData,
      hasCode,
      newPage,
      maxHeight,
      discount,
      with_delivery,
      deposit,
      cost,
      price,
      itbis,
      withITBIS,
    });
  }

  if (hasCost && hasImages) {
    return t_body_image_cost({
      pdf,
      selectedProducts,
      controlPixelHeight,
      style_pdf,
      imagesData,
      hasCode,
      newPage,
      maxHeight,
    });
  }

  if (!hasCost && hasImages) {
    return t_body_image({
      pdf,
      selectedProducts,
      controlPixelHeight,
      style_pdf,
      imagesData,
      hasCode,
      newPage,
      maxHeight,
    });
  }
}
