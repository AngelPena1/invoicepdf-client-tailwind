
export const Heading = ({ pdf, marginX, rgbGreen, rgbBackground, fontText }) => {
    const fontBusinessTitle = 18
    const fontDetailsInvoiceTitle = 13
    const rectWith = 70
    const rectHeight = 5

    let coordinateY = 26
    const marginXforSecondColumn = 115 + marginX


    function space(gap) {
        return coordinateY += gap
    }

    function TitleBusinessDetails(titleMarginY) {
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFontSize(fontBusinessTitle);
        pdf.text("Blue Logistic Services", marginX, titleMarginY)
    }

    function BusinessDetails(text) {
        pdf.setFontSize(fontText);
        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        pdf.rect(marginX, coordinateY - 3.5, rectWith, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text(text, marginX + 1, coordinateY)
        space(6)
    }


    function TitleInvoiceDetails(marginXlocal, titleMarginY) {
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFontSize(fontDetailsInvoiceTitle);
        pdf.text("Detalles Factura ", marginXlocal, titleMarginY)
    }


    function InvoiceDetails(field, value) {
        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.text(field, marginXforSecondColumn + 1, coordinateY)

        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        const adjustRectWithLocal = rectWith - 40
        pdf.rect(marginXforSecondColumn + 30, coordinateY - 3.5, adjustRectWithLocal, rectHeight, 'F');
        pdf.text(value, marginXforSecondColumn + 31, coordinateY)
        space(6)
    }

    function TitleClientDetails() {
        pdf.setFillColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b)
        pdf.rect(marginX, coordinateY - 3.5, rectWith, rectHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.text("Facturar a: ", marginX + 1, coordinateY)
        space(9)
    }

    function ClientDetails(field, value) {
        pdf.setTextColor(0, 0, 0);
        pdf.text(field + ": " + value, marginX + 1, coordinateY)
        space(4.5)
    }


    TitleBusinessDetails(15)
    BusinessDetails("Rnc: 131455026")
    BusinessDetails("Dirección: C/General Domingo Mallol")
    BusinessDetails("Correo: blue@gmail.com")
    BusinessDetails("Teléfono: 809-223-2243")

    coordinateY = 26
    TitleInvoiceDetails(marginXforSecondColumn, 15)
    InvoiceDetails("Fecha de factura: ", "DD/MM/YYYY")
    InvoiceDetails("No. Factura: ", "#00001")
    InvoiceDetails("No. Cliente: ", "Cliente123")
    InvoiceDetails("Fecha Vencimiento: ", "DD/MM/YYYY")

    coordinateY = 60
    TitleClientDetails()
    ClientDetails("Nombre del cliente", "Cliente Prueba")
    ClientDetails("RNC", "130000000")
    ClientDetails("Dirección", "C/prueba sector el millon")
    ClientDetails("Teléfono", "809-000-1111")

    return null
}
