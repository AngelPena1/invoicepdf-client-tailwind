import { useEffect, useState } from "react";
// import { getDocument } from "pdfjs-dist/build/pdf";
// import jsPDF from "jspdf";
// import SignLogo from "../assets/Firma-Arianny.png";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const useHandlePdf = ({ fileBase64 }) => {
  const [images, setImages] = useState([]);
  const { auth } = useAuth();
  const username = auth?.username

  function clearImagesArray() {
    return setImages([]);
  }

  function descargarPDFDesdeBase64(base64String, nombreArchivo) {
    // Convertir la cadena base64 en un ArrayBuffer
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], { type: 'application/pdf' });
  
    // Crear un enlace de descarga y hacer clic en él
    const link = document.createElement('a');
    link.href = URL.createObjectURL(fileBlob);
    link.download = nombreArchivo;
    link.click();
  }

  function HandleSignPdf({ signByPage, coordinates }) {
    axios
      .post("http://localhost:8000/api/pdf/sign", {
        coordinates,
        signByPage,
        username
      })
      .then((res) => {
        descargarPDFDesdeBase64(res.data?.fileBase64Signed, 'test');
      })
      .catch((err) => {
        if (err.status === 404) return toast.error('Error al firmar el PDF.')
      });
  }

  useEffect(() => {
    if (!fileBase64) return;

    axios
      .post("http://localhost:8000/api/pdf/get-images", {
        fileBase64,
        username
      })
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        if (err.status === 404) return console.log("aqui");
      });
  }, [fileBase64]);

  // console.log(fileBase64);

  return { images, clearImagesArray, HandleSignPdf };
};

export default useHandlePdf;
