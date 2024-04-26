
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

    function TitleBusinessDetails(value, titleMarginY) {
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFont(undefined, 'bold')
        pdf.setFontSize(fontBusinessTitle)
        pdf.text(value, marginX, titleMarginY)
    }

    function BusinessDetails(text) {
        pdf.setFontSize(fontText);
        pdf.setFont(undefined, 'normal')
        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        pdf.rect(marginX, coordinateY - 3.5, rectWith, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text(text, marginX + 1, coordinateY)
        space(6)
    }


    function TitleInvoiceDetails(marginXlocal, titleMarginY) {
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFontSize(fontDetailsInvoiceTitle);
        pdf.setFont(undefined, 'bold')
        pdf.text("Detalles Factura ", marginXlocal, titleMarginY)
    }


    function InvoiceTypeTitle(value, marginXlocal, titleMarginY) {
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFontSize(fontDetailsInvoiceTitle);
        pdf.setFont(undefined, 'bold')
        pdf.text(value, marginXlocal, titleMarginY)
        space(9)
    }

    function InvoiceDetails(field, value) {
        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'bold')
        pdf.text(field, marginXforSecondColumn + 1, coordinateY)

        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        const adjustRectWithLocal = rectWith - 40
        pdf.rect(marginXforSecondColumn + 40, coordinateY - 3.5, adjustRectWithLocal, rectHeight, 'F');
        pdf.setFont(undefined, 'normal')
        pdf.text(value, marginXforSecondColumn + 41, coordinateY)
        space(6)
    }

    function TitleClientDetails() {
        pdf.setFillColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b)
        pdf.rect(marginX, coordinateY - 3.5, rectWith, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text("Facturar a: ", marginX + 1, coordinateY)
        space(9)
    }

    function ClientDetails(field, value) {
        pdf.setTextColor(0, 0, 0);

        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'bold')
        pdf.text(field, marginX + 1, coordinateY)

        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        pdf.setFont(undefined, 'normal')
        pdf.text(value, marginX + 35, coordinateY)
        space(4.5)
        // pdf.text(field + ": " + value, marginX + 1, coordinateY)
        // space(4.5)
    }


    TitleBusinessDetails("Nombre de compañia", 15)
    BusinessDetails("Rnc: 131000000")
    BusinessDetails("Dirección: C/prueba #7")
    BusinessDetails("Correo: blue@gmail.com")
    BusinessDetails("Teléfono: 809-000-0000")

    coordinateY = 26
    TitleInvoiceDetails(marginXforSecondColumn, 15)
    InvoiceDetails("Fecha de factura: ", "DD/MM/YYYY")
    InvoiceDetails("No. factura: ", "#00001")

    space(10)

    InvoiceTypeTitle("Consumidor Final", marginXforSecondColumn, coordinateY)
    InvoiceDetails("Num. del comprobante: ", "0000001")
    InvoiceDetails("Fecha vencimiento: ", "DD/MM/YYYY")

    coordinateY = 60
    TitleClientDetails()
    ClientDetails("Nombre del cliente:", "Cliente Prueba")
    ClientDetails("RNC:", "130000000")
    ClientDetails("Dirección:", "C/prueba sector el millon")
    ClientDetails("Teléfono:", "809-000-1111")

    return null
}
