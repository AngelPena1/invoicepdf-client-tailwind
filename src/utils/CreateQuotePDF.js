import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/cocacola.png";
import perro from "../assets/perro.jpeg";
// import cachorra from "../assets/cachorra 1.jpg";

export const GenerarPDF = ({ selectedProducts }) => {
  const pdf = new jsPDF();

  const logoWidth = 50;
  const logoHeight = 25;
  const maxHeight = 190;

  const client = "Grupo Demo";
  const phone = "(809) 111 - 2222";
  const address = "Constructora DUPLA/ Arq.: STUDIO FINI Arquitectura";

  // const data = [
  //   {
  //     nombre: "Herramienta",
  //     imagen: perro,
  //     size: "small",
  //     cantidad: 1,
  //     precio: 100,
  //     total: 1000,
  //   },
  // ];

  function getSizePixel(value) {
    let pixel;

    switch (value) {
      case "small":
        pixel = 25;
        break;

      case "medium":
        pixel = 50;
        break;
    }

    return pixel;
  }

  ////Header/////
  pdf.autoTable({
    body: [[""]],
    theme: "grid",
    bodyStyles: {
      minCellHeight: 40,
    },
    didDrawCell: function (data) {
      if (data.column.index === 0 && data.cell.section === "body") {
        pdf.addImage(
          logo,
          15, // X
          17, // Y
          logoWidth, // X
          logoHeight // Y
        );
        pdf.text("Clientes: " + client, 75, 25);
        pdf.text(
          "Asesores de Ventas Jorge Widmann / Zamira Logrono " + phone,
          75,
          30
        );
        pdf.text(address, 75, 35);
      }
    },
  });

  pdf.autoTable({
    // startY: pdf.lastAutoTable.finalY,
    body: [["Descripción", "Cant", "Imagen", "Precio", "Total"]],
    theme: "grid",
    bodyStyles: {
      minCellHeight: 15,
    },
    bodyStyles: {
      fillColor: "#0082bf",
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 86.3 },
      1: { cellWidth: 16.3, halign: "center" },
      2: { cellWidth: 36.3, halign: "center" },
      3: { cellWidth: 26.3, halign: "center" },
      4: { cellWidth: 16.3, halign: "center" },
    },
  });

  /////Body///////
  let controlPixelHeight = 0;
  let newPage = false;
  
  selectedProducts.forEach((d) => {
    const sizeImg = getSizePixel(d?.size);
    controlPixelHeight += sizeImg;
    const description = d?.description;
    const image = perro;
    const quantity = d?.quantity;
    const price = d?.price;
    const total = parseInt(quantity) * parseInt(price);

    if (controlPixelHeight > maxHeight) {
      controlPixelHeight = 0;
      newPage = true;
      pdf.addPage();
    }

    //180 max
    pdf.autoTable({
      startY: !newPage ? pdf.lastAutoTable.finalY : 10,
      body: [[description, quantity, "", price, total]],
      theme: "grid",
      bodyStyles: {
        minCellHeight: sizeImg,
      },
      columnStyles: {
        0: { cellWidth: 86.3 },
        1: { cellWidth: 16.3, halign: "center" },
        2: { cellWidth: 36.3, halign: "center" },
        3: { cellWidth: 26.3, halign: "right" },
        4: { cellWidth: 16.3, halign: "right" },
      },
      didDrawCell: function (data) {
        if (data.column.index === 3 && data.cell.section === "body") {
          pdf.addImage(
            image,
            data?.table?.body[0]?.cells[2]?.x,
            data?.table?.body[0]?.cells[2]?.y,
            36.3, // X
            sizeImg // Y
          );
        }
      },
    });

    newPage = false;
  });

  controlPixelHeight += 40;
  if (controlPixelHeight > maxHeight) {
    controlPixelHeight = 0;
    newPage = true;
    pdf.addPage();
  }

  pdf.autoTable({
    startY: !newPage ? pdf.lastAutoTable.finalY : 10,
    body: [
      [
        "1. Tiempo de Entrega: 5-7 semanas una vez confirmado el pedido con anticipo.",
        "Subtotal",
        "0000",
      ],
      [
        "2. Forma de pago: 70% de anticipo. Saldo contra entrega.",
        "ITBIS",
        "0000",
      ],
      ["3. No incluye ITBIS.", "Total", "0000"],
      ["", "Anticipo", "0000"],
      ["", "Con Entrega", "0000"],
    ],
    theme: "grid",
    bodyStyles: {
      minCellHeight: 8,
    },
    columnStyles: {
      0: { cellWidth: 138.9 },
      1: { cellWidth: 26.3, halign: "right" },
      2: { cellWidth: 16.3, halign: "right" },
    },
  });

  // Guardar el documento
  pdf.save("documento_con_imagenes.pdf");
};
