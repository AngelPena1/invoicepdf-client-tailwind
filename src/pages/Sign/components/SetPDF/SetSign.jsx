import React, { useEffect, useRef } from "react";
import SignLogo from "../../assets/Firma-Arianny.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faMinus,
  faPlus,
  faPrint,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import usePage from "./hooks/usePage";
import useCoordinates from "./hooks/useCoordinates";

const SetSign = ({
  images,
  clearSelectedPDF,
  clearImagesArray,
  HandleChangeTabs,
  HandleSignPdf,
}) => {
  const contenedorRef = useRef(null);
  const elementoRef = useRef(null);

  const maxPages = images?.length;

  const { page, signByPage, leftPage, rightPage, HandleSetSignInPage } =
    usePage({
      maxPages,
    });

  const { coordinates, HandleCoordinate } = useCoordinates({ maxPages });

  const handleMouseDown = (e) => {
    // Calculamos el desplazamiento del mouse con respecto al elemento
    const offsetX =
      e.clientX - elementoRef.current.getBoundingClientRect().left;
    const offsetY = e.clientY - elementoRef.current.getBoundingClientRect().top;

    // Agregamos un event listener para mover el elemento mientras se arrastra
    const handleMouseMove = (e) => {
      const newX =
        e.clientX -
        offsetX -
        contenedorRef.current.getBoundingClientRect().left;
      const newY =
        e.clientY - offsetY - contenedorRef.current.getBoundingClientRect().top;
      elementoRef.current.style.left = newX + "px";
      elementoRef.current.style.top = newY + "px";
    };

    // Cuando se suelte el mouse, eliminamos el event listener
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Obtenemos las coordenadas finales del elemento
      const finalX = parseInt(elementoRef.current.style.left);
      const finalY = parseInt(elementoRef.current.style.top);
      HandleCoordinate(page, finalX, finalY);
      // setCoordinates({
      //   x: finalX,
      //   y: finalY,
      // });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const currentMinPage = page === 0;
  const currentMaxPage = page + 1 === maxPages;

  useEffect(() => {
    if (!elementoRef.current) return;
    elementoRef.current.style.left = `${coordinates[page].x}px`;
    elementoRef.current.style.top = `${coordinates[page].y}px`;
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="">
      <section className="flex place-content-center">
        <section name="button-left" className="">
          <button
            className="w-12 block"
            onClick={() => {
              clearSelectedPDF();
              clearImagesArray()
              HandleChangeTabs("document");
            }}
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        </section>
        <div className="max-h-xl w-96 overflow-hidden mb-5 shadow-style-2 rounded-lg">
          {!(images.length > 0) && <div className="skeleton h-xl w-full"></div>}
          {images?.map((image, index) => {
            if (page !== index) return null;
            return (
              <div
                ref={contenedorRef}
                className="relative overflow-y-auto  overflow-x-hidden shadow-style-2"
                key={index}
              >
                <img
                  id="elemento"
                  className="shadow-lg pointer-events-none"
                  src={image}
                  alt=""
                />
                {signByPage[page] && (
                  <img
                    ref={elementoRef}
                    className="absolute inset-0 w-24 cursor-default"
                    // style={{ position: "absolute", top: '0', bottom: '0', width: "100px", height: "75px", cursor: 'grabbing' }}
                    onMouseDown={handleMouseDown}
                    src={SignLogo}
                    alt=""
                  />
                )}
              </div>
            );
          })}
        </div>
        <section name="button-right" className="ml-2">
          <button
            className={!signByPage[page] ? "w-12 block bg-green-500" : "w-12 block bg-green-200" }
            onClick={() => {
              HandleSetSignInPage(page, true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className={signByPage[page] ? "w-12 block bg-red-500" : "w-12 block bg-red-200" }
            onClick={() => {
              HandleSetSignInPage(page, false);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            className="w-12 block"
            onClick={() => {
              HandleSignPdf({ signByPage, coordinates });
            }}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </section>
      </section>
      <section className="flex justify-center">
        <button
          onClick={leftPage}
          className={currentMinPage ? "w-fit px-2 bg-slate-400" : "w-fit px-2"}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-6" />
        </button>

        <button
          className={currentMaxPage ? "w-fit px-2 bg-slate-400" : "w-fit px-2"}
          onClick={rightPage}
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-6" />
        </button>
      </section>
    </div>
  );
};

export default SetSign;
