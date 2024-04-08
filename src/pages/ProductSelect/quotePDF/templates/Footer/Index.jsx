import { formatToDecimal } from "../../../../../utils/formatToDecimal/formatToDecimal";

export const FooterWithItbis = (props) => {
  return [
    [
      "1. Tiempo de Entrega: 5-7 semanas una vez confirmado el pedido con anticipo.",
      "Descuento",
      props.discountIsPorcentage
        ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
        : formatToDecimal(parseFloat(props?.discount)),
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
};

export const FooterNoItbis = (props) => {
  return [
    [
      "1. Tiempo de Entrega: 5-7 semanas una vez confirmado el pedido con anticipo.",
      "Descuento",
      props.discountIsPorcentage
        ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
        : formatToDecimal(parseFloat(props?.discount)),
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
};
