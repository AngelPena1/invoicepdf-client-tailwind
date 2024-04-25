
export const Footer = ({ pdf, fontText, marginX, coordinateYfooter }) => {
    pdf.setFontSize(fontText)
    pdf.setTextColor(120, 120, 120);
    pdf.text("Gracias por hacer negocios con nosotros.", marginX, coordinateYfooter, "center")
    pdf.text("Si tiene preguntas acerca de esta factura, llame al 809-000-0000.", marginX, coordinateYfooter + 5,  "center")
}