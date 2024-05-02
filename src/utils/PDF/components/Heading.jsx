
export const Heading = ({ pdf, HeadingData, marginX, rgbGreen, rgbBackground, fontText }) => {
    
    const businessData = HeadingData?.business
    const clientData = HeadingData?.client
    const invoiceData = HeadingData?.invoice_detail

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
        const currentValue = value ? value : ""
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFont(undefined, 'bold')
        pdf.setFontSize(fontBusinessTitle)
        pdf.text(currentValue, marginX, titleMarginY)
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
        const currentValue = value ? value : "" 
        pdf.setTextColor(rgbGreen?.r, rgbGreen?.g, rgbGreen?.b);
        pdf.setFontSize(fontDetailsInvoiceTitle);
        pdf.setFont(undefined, 'bold')
        pdf.text(currentValue, marginXlocal, titleMarginY)
        space(9)
    }

    function InvoiceDetails(field, value) {
        const currentValue = value ? value : "" 
        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'bold')
        pdf.text(field, marginXforSecondColumn + 1, coordinateY)

        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        const adjustRectWithLocal = rectWith - 40
        pdf.rect(marginXforSecondColumn + 40, coordinateY - 3.5, adjustRectWithLocal, rectHeight, 'F');
        pdf.setFont(undefined, 'normal')
        pdf.text(currentValue, marginXforSecondColumn + 41, coordinateY)
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
        const currentValue = value ? value : ""
        pdf.setTextColor(0, 0, 0);

        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'bold')
        pdf.text(field, marginX + 1, coordinateY)

        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        pdf.setFont(undefined, 'normal')
        pdf.text(currentValue, marginX + 35, coordinateY)
        space(4.5)
    }


    TitleBusinessDetails(businessData?.title, 15)
    BusinessDetails("Rnc: " +  businessData?.rnc)
    BusinessDetails("Dirección: " + businessData?.address)
    BusinessDetails("Correo: " + businessData?.email)
    BusinessDetails("Teléfono: " + businessData?.phone)

    coordinateY = 26
    TitleInvoiceDetails(marginXforSecondColumn, 15)
    InvoiceDetails("Fecha de factura: ", invoiceData?.date)
    InvoiceDetails("No. factura: ", invoiceData?.number)

    space(10)

    InvoiceTypeTitle(invoiceData?.comprobant_type, marginXforSecondColumn, coordinateY)
    InvoiceDetails("Num. del comprobante: ", invoiceData?.comprobant_number)
    InvoiceDetails("Fecha vencimiento: ", invoiceData?.expire_date)

    coordinateY = 60
    TitleClientDetails()
    ClientDetails("Nombre del cliente:", clientData?.name)
    ClientDetails("RNC:", clientData?.rnc)
    ClientDetails("Dirección:", clientData?.address)
    ClientDetails("Teléfono:", clientData?.phone)

    return null
}
