import { useEffect, useState } from "react";
import { getDocument } from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.mjs";
import jsPDF from "jspdf";
import SignLogo from "../assets/Firma-Arianny.png";

const useHandlePdf = ({ fileBase64 }) => {
  const [images, setImages] = useState([]);
  
  function HandleSignPdf(coordinateX, coordinateY) {
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

      if(index < images.length - 1) {
        doc.addPage()
      }
    })
    
    const testX = ((coordinateX / 178) * 100) 
    const testY = ((coordinateY / 169) * 100) 
    doc.addImage(SignLogo, testX , testY , 55, 25)

   
    doc.save("documento.pdf");
  }

  useEffect(() => {
    const convertToImages = async () => {
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
          const viewport = page.getViewport({ scale: 1.5 });
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
    };

    if (fileBase64) {
      convertToImages();
    }
  }, [fileBase64]);

  return { images, HandleSignPdf };
};

export default useHandlePdf;
