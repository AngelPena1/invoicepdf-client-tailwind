import { formatToDecimal } from "../../../../../utils/formatToDecimal/formatToDecimal";

export const FooterWithItbis = (props) => {
  return [
    [
      "",
      "Descuento",
      props.discountIsPorcentage
        ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
        : formatToDecimal(parseFloat(props?.discount)),
    ],
    [
      "",
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
      "",
      "Descuento",
      props.discountIsPorcentage
        ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
        : formatToDecimal(parseFloat(props?.discount)),
    ],
    [
      "",
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
