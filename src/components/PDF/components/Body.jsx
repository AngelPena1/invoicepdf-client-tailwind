
export const Table = ({ pdf, coordinateYtable, rgbStyleColor, rgbBackground, marginX, marginXend }) => {

    const rectHeight = 5
    const unitsColumn = marginX + 10
    const descriptionColumn = marginX + 25
    const unitPriceColumn = marginX + 115
    const itbisColumn = marginX + 145
    const priceColumn = marginX + 185

    let localY = coordinateYtable

    function space(value) {
        return localY += value
    }

    function HeaderTable() {
        pdf.setFillColor(rgbStyleColor?.r, rgbStyleColor?.g, rgbStyleColor?.b)
        pdf.rect(marginX, localY - 3.5, marginXend, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text("Unidades", unitsColumn, localY, "center")
        pdf.text("Descripción", descriptionColumn, localY)
        pdf.text("Precio Unitario", unitPriceColumn, localY, "right")
        pdf.text("Itbis", itbisColumn, localY, "right")
        pdf.text("Precio", priceColumn, localY, "right")
        space(7)
    }

    function ContentTable(description, quantity, unitPrice, itbis, price) {
        // pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        // pdf.rect(marginX, localY - 3.5, marginXend, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text(description, descriptionColumn, localY)
        pdf.text(quantity, unitsColumn, localY, "center")
        pdf.text(unitPrice, unitPriceColumn, localY, "right")
        pdf.text(itbis, itbisColumn, localY, "right")
        pdf.text(price, priceColumn, localY, "right")
        space(6)
    }

    HeaderTable()
    //max 15
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9.00", "9999.00")

    return null
}

export const PricesSection = ({ pdf, marginX, coordinateYprices, fontText, }) => {

    let localY = coordinateYprices

    function space(value) {
        return localY += value
    }

    function Prices(field, value) {
        pdf.setFont(undefined, 'normal')
        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.text(field, marginX + 1, localY, "right")
        pdf.text(value, marginX + 34, localY, "right")
        space(6)
    }

    function TotalPrice(field, value) {
        pdf.setFontSize(fontText);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'normal')
        pdf.text(field, marginX + 1, localY, "right")

        pdf.setFont(undefined, 'bold')
        pdf.setFontSize(fontText + 3);
        pdf.text(value, marginX + 34, localY, "right")
        space(6)
    }

    function CreateChart() {
        const rectWith = 77
        const rectHeight = 35
        pdf.rect(marginX - 40, coordinateYprices - 4, rectWith, rectHeight)
    }

    CreateChart()
    Prices("Subtotal: ", "99999.00")
    Prices("Descuento: ", "999.00")
    Prices("Subtotal con Descuento: ", "999.00")
    Prices("Itbis: ", "99999.00")
    TotalPrice("Total: ", "99999.00")
}

export const CommentsSection = ({ pdf, coordinateYcomments, rgbStyleColor, rgbBackground, marginX, marginXend }) => {

    const rectHeight = 5
    const descriptionColumn = marginX + 1
    let localY = coordinateYcomments

    function space(value) {
        return localY += value
    }

    function HeaderComments() {
        pdf.setFillColor(rgbStyleColor?.r, rgbStyleColor?.g, rgbStyleColor?.b)
        pdf.rect(marginX, localY - 3.5, marginXend, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text("Comentarios: ", descriptionColumn, localY)
        space(3)
    }



    function ContentComments() {
        const withLine = 98.4
        const heightLine = localY + 30
        pdf.setLineWidth(0.2); 
        // pdf.line(marginX, localY, withLine, localY);
        pdf.line(marginX + 0.1, localY - 1.5, marginX, heightLine);
        pdf.line(marginX + 0.1, localY + 30, withLine, heightLine);
        pdf.line(withLine, localY - 1.5, withLine, heightLine);
    }

    HeaderComments()
    ContentComments()

    return null
}
