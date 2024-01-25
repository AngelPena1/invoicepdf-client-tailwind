import jsPDF from "jspdf";
import "jspdf-autotable";
import perro from "../assets/perro.jpeg";
import logo from "../assets/cocacola.png";

export const generarPDF = () => {
  const pdf = new jsPDF();

  const logoWidth = 50;
  const logoHeight = 25;
  const maxHeight = 180;

  const client = "Grupo Demo";
  const phone = "(809) 111 - 2222";
  const address = "Constructora DUPLA/ Arq.: STUDIO FINI Arquitectura";

  const data = [
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "medium",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
    {
      nombre: "perro",
      imagen: perro,
      size: "small",
      cantidad: 1,
      precio: 100,
      total: 1000,
    },
  ];

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
      0: { cellWidth: 96.3 },
      1: { cellWidth: 16.3 },
      2: { cellWidth: 36.3 },
      3: { cellWidth: 16.3 },
      4: { cellWidth: 16.3 },
    },
  });

  //   console.log(Object.values(data[0]));

  let controlPixelHeight = 0;

  data.forEach((d) => {
    const sizeImg = getSizePixel(d?.size);
    controlPixelHeight += sizeImg;
    const name = d?.nombre;
    const image = d?.imagen;
    const cantidad = d?.cantidad;
    const precio = d?.precio;
    const total = d?.total;

    console.log(controlPixelHeight, maxHeight,  controlPixelHeight > maxHeight);

    if (controlPixelHeight > maxHeight) {
        controlPixelHeight = 0
        pdf.addPage();
    }

    //180 max

    pdf.autoTable({
      startY: pdf.lastAutoTable.finalY,
      body: [[name, cantidad, "", precio, total]],
      theme: "grid",
      bodyStyles: {
        minCellHeight: sizeImg,
      },
      columnStyles: {
        0: { cellWidth: 96.3 },
        1: { cellWidth: 16.3 },
        2: { cellWidth: 36.3, halign: "center" },
        3: { cellWidth: 16.3 },
        4: { cellWidth: 16.3 },
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
  });

  // Guardar el documento
  pdf.save("documento_con_imagenes.pdf");
};
