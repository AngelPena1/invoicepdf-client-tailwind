import { formatToDecimal } from "../../../../../utils/formatToDecimal/formatToDecimal";

export const FooterWithItbis = (props) => {
  const notesInPdf = props.notesInPdf
  return [
    [
      notesInPdf?.note_1,
      "Descuento",
      props.discountIsPorcentage
        ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
        : formatToDecimal(parseFloat(props?.discount)),
    ],
    [
      notesInPdf?.note_2,
      "Subtotal",
      formatToDecimal(props?.price),
    ],
    [notesInPdf?.note_3, "ITBIS", formatToDecimal(props?.itbis)],
    [notesInPdf?.note_4, "Total", formatToDecimal(props?.withITBIS)],
    [notesInPdf?.note_5, "Anticipo", formatToDecimal(parseFloat(props?.deposit))],
    ["", "Con Entrega", formatToDecimal(parseFloat(props?.with_delivery))],
  ];
};

export const FooterNoItbis = (props) => {
  const notesInPdf = props?.notesInPdf ? props?.notesInPdf : ""
  return [
    [
      "No Incluye ITBIS.",
      "Descuento",
      props.discountIsPorcentage
        ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
        : formatToDecimal(parseFloat(props?.discount)),
    ],
    [
      notesInPdf?.note_1,
      "Total",
      formatToDecimal(props?.price),
    ],
    [
      notesInPdf?.note_2,
      "Anticipo",
      formatToDecimal(parseFloat(props?.deposit)),
    ],
    [notesInPdf?.note_3, "Con Entrega", formatToDecimal(parseFloat(props?.with_delivery))],
    [notesInPdf?.note_4, "", ""],
    [notesInPdf?.note_5, "", ""]
  ];
};
