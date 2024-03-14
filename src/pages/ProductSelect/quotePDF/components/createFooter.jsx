import { formatToDecimal } from "../../../../utils/formatToDecimal/formatToDecimal";

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
  [
    "",
    "Con Entrega",
    formatToDecimal(parseFloat(props?.with_delivery)),
  ],
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

const columnStyleItbis = {
  0: { cellWidth: 145.9 },
  1: { cellWidth: 24.3, halign: "right" },
  2: { cellWidth: 24.3, halign: "right" },
};

const columnStyleCost = {
  0: { cellWidth: 154.9 },
  1: { cellWidth: 18.3, halign: "right" },
  2: { cellWidth: 18.3, halign: "right" },
};

function getOptionsBody(props) {
  if (props?.hasItbis) {
    return bodyHasItbis(props);
  }
  return bodyNoItbis(props);
}

function getColumnsOptions(props) {
  if (props?.hasCost) {
    return columnStyleCost;
  }
  return columnStyleItbis;
}

export function createFooter(props) {
  props.controlPixelHeight += 40;
  if (props?.controlPixelHeight > props?.maxHeight) {
    props.controlPixelHeight = 0;
    props.newPage = true;
    props.pdf.addPage();
  }

  props.pdf.autoTable({
    startY: !props?.newPage ? props?.pdf.lastAutoTable.finalY : 10,
    body: getOptionsBody(props),
    theme: "grid",
    bodyStyles: {
      minCellHeight: 8,
      fontSize: 9,
    },
    columnStyles: getColumnsOptions(props),
  });
}
