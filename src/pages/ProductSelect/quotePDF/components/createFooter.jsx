import { formatToDecimal } from "../../../../utils/formatToDecimal/formatToDecimal";
import t_foot_itbis_cost from "../templates/footer/t_foot_itbis_cost.jsx";

const bodyHasItbis = (props) => [
  [
    "1. Tiempo de Entrega: 5-7 semanas una vez confirmado el pedido con anticipo.",
    "Descuento",
    formatToDecimal(parseFloat(props?.discount)),
  ],
  [
    "2. Forma de pago: 70% de anticipo. Saldo contra entrega.",
    "Subtotal",
    formatToDecimal(props?.price),
  ],
  ["", "ITBIS", formatToDecimal(props?.itbis)],
  ["", "Total", formatToDecimal(props?.withITBIS)],
  ["", "Anticipo", formatToDecimal(parseFloat(props?.deposit))],
  ["", "Con Entrega", formatToDecimal(parseFloat(props?.with_delivery))],
];

const bodyNoItbis = (props) => [
  [
    "1. Tiempo de Entrega: 5-7 semanas una vez confirmado el pedido con anticipo.",
    "Descuento",
    formatToDecimal(parseFloat(props?.discount)),
  ],
  [
    "2. Forma de pago: 70% de anticipo. Saldo contra entrega.",
    "Total",
    formatToDecimal(props?.price),
  ],
  [
    "3. No incluye ITBIS",
    "Anticipo",
    formatToDecimal(parseFloat(props?.deposit)),
  ],
  ["", "Con Entrega", formatToDecimal(parseFloat(props?.with_delivery))],
];

export function CreateFooter({
  pdf,
  newPage,
  maxHeight,
  controlPixelHeight,
  hasItbis,
  hasCost,
  discount,
  with_delivery,
  deposit,
  cost,
  price,
  itbis,
  withITBIS,
  style_pdf,
  quoteConfig,
}) {
  const hasImages = quoteConfig?.hasImages;
  
  if (!hasCost && !hasImages && hasItbis) {
    return t_foot_itbis_cost({
      pdf,
      newPage,
      maxHeight,
      controlPixelHeight,
      discount,
      with_delivery,
      deposit,
      cost,
      price,
      itbis,
      withITBIS,
      style_pdf,
    });
  }

  if (!hasCost && !hasImages && !hasItbis) {
    return t_foot_itbis_cost({
      pdf,
      newPage,
      maxHeight,
      controlPixelHeight,
      discount,
      with_delivery,
      deposit,
      cost,
      price,
      itbis,
      withITBIS,
      style_pdf,
    });
  }
}
