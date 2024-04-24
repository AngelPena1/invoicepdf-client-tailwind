
export const Table = ({ pdf, coordinateYtable, rgbStyleColor, rgbBackground, marginX, marginXend }) => {

    const rectHeight = 5
    const descriptionColumn = marginX + 1
    const unitsColumn = marginX + 80
    const unitPriceColumn = marginX + 120
    const priceColumn = marginX + 165

    let localY = coordinateYtable

    function space(value) {
        return localY += value
    }

    function HeaderTable() {
        pdf.setFillColor(rgbStyleColor?.r, rgbStyleColor?.g, rgbStyleColor?.b)
        pdf.rect(marginX, localY - 3.5, marginXend, rectHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.text("Descripción", descriptionColumn, localY)
        pdf.text("Unidades", unitsColumn, localY)
        pdf.text("Precio Unitario", unitPriceColumn, localY)
        pdf.text("Precio", priceColumn, localY)
        space(7)
    }

    function ContentTable(description, quantity, unitPrice, price) {
        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        pdf.rect(marginX, localY - 3.5, marginXend, rectHeight, 'F');
        pdf.setTextColor(0, 0, 0);
        pdf.text(description, descriptionColumn, localY)
        pdf.text(quantity, unitsColumn + 6, localY, "center")
        pdf.text(unitPrice, unitPriceColumn + 18, localY, "right")
        pdf.text(price, priceColumn + 8, localY, "right")
        space(6)
    }

    HeaderTable()
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")
    ContentTable("Nombre del articulo / servicio", "1", "99.00", "9999.00")

    return null
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
        pdf.setTextColor(255, 255, 255);
        pdf.text("Comentarios: ", descriptionColumn, localY)
        space(3)
    }



    function ContentComments() {
        pdf.setFillColor(rgbBackground?.r, rgbBackground?.g, rgbBackground?.b)
        pdf.rect(marginX, localY, marginXend, rectHeight * 10, 'F');
    }

    HeaderComments()
    ContentComments()

    return null
}
