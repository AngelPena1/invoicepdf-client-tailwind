import { useEffect, useState } from "react";
// import { getDocument } from "pdfjs-dist/build/pdf";
import jsPDF from "jspdf";
import SignLogo from "../assets/Firma-Arianny.png";

const useHandlePdf = ({ fileBase64 }) => {
  const [images, setImages] = useState([]);

  function clearImagesArray() {
    return setImages([])
  }

  function HandleSignPdf({ signByPage, coordinates }) {
    var doc = new jsPDF({
      format: "letter",
    });

    images.forEach((image, index) => {
      doc.addImage(
        image,
        "PNG",
        0,
        0,
        doc.internal.pageSize.width,
        doc.internal.pageSize.height
      );
      
      if (signByPage[index]) {
        const coordinateX = (coordinates[index].x / 185) * 100;
        const coordinateY = (coordinates[index].y / 180) * 100;

        doc.addImage(SignLogo, coordinateX, coordinateY, 106, 78);
      }

      if (index < images.length - 1) {
        doc.addPage();
      }
    });

    doc.save("documento.pdf");
  }

  useEffect(() => {
    const convertToImages = async () => {
      import("pdfjs-dist/build/pdf").then(({ getDocument }) => {
        import("pdfjs-dist/build/pdf.worker.mjs").then(async () => {
          try {
            // Extraer la parte base64 de la cadena si tiene el prefijo
            const base64String = fileBase64.split(",")[1];

            // Decodificar la cadena base64
            const pdfData = Uint8Array.from(atob(base64String), (c) =>
              c.charCodeAt(0)
            );

            const loadingTask = getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;

            const numPages = pdf.numPages;
            const imageArray = [];

            for (let i = 1; i <= numPages; i++) {
              const page = await pdf.getPage(i);
              const viewport = page.getViewport({ scale: 3 });
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");

              canvas.width = viewport.width;
              canvas.height = viewport.height;

              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };

              await page.render(renderContext).promise;

              const imageDataUrl = canvas.toDataURL("image/png");
              imageArray.push(imageDataUrl);
            }

            setImages(imageArray);
          } catch (error) {
            console.log(error?.message);
            console.error("Error al convertir el PDF a imágenes:", error);
          }
        });
      });
    };

    if (fileBase64) {
      convertToImages();
    }
  }, [fileBase64]);

  return { images, clearImagesArray, HandleSignPdf };
};

export default useHandlePdf;
