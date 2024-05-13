import { formatToDecimal } from "../../../../../utils/formatToDecimal/formatToDecimal";

export const Footer = (props) => {
  const notesInPdf = props.notesInPdf
  const maxNotesInPdf = 5

  const elementsArray = [
    ["", "Descuento", props.discountIsPorcentage
      ? `(%) ${formatToDecimal(parseFloat(props?.discount))}`
      : formatToDecimal(parseFloat(props?.discount))],
    props.hasItbis ?   
    [
      "",
      "Subtotal",
      formatToDecimal(props?.price),
    ] : null,
    props.hasItbis ? 
    [
      "",
      "ITBIS",
      formatToDecimal(props?.itbis),
    ] : null,
    props.hasTips ? [
      "",
      "10% Legal",
      formatToDecimal(props?.tips),
    ] : null,
    [
      "",
      "Total",
      props.hasItbis ? formatToDecimal(props?.withITBIS) : formatToDecimal(props?.price),
    ]
  ]

  let cleanArray = elementsArray.filter(element => element !== null);

  for (let index = cleanArray.length; index < 5; index++) {
    cleanArray.push([])
  }

  cleanArray.map((element, index) => {
    if (index === maxNotesInPdf) return element
    
    if(index === 0) element[0] = notesInPdf?.note_1
    if(index === 1) element[0] = notesInPdf?.note_2
    if(index === 2) element[0] = notesInPdf?.note_3
    if(index === 3) element[0] = notesInPdf?.note_4
    if(index === 4) element[0] = notesInPdf?.note_5

    return element
  })
  
  props.pdf.autoTable({
    startY: !props.newPage ? props.pdf.lastAutoTable.finalY + 5 : 10,
    body: cleanArray,
    theme: "grid",
    bodyStyles: {
      fontSize: 9,
      textColor: props.style_pdf?.textColorBody,
      lineColor: props.style_pdf?.lineColor,
    },
    columnStyles: {
      0: { cellWidth: props.footerWith?.column_with_1 },
      1: { cellWidth: props.footerWith?.column_with_2, halign: "right" },
      2: { cellWidth: props.footerWith?.column_with_3, halign: "right" },
    },
  });
}