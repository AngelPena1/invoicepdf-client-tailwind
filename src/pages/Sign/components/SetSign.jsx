import React, { useRef, useState } from "react";
import SignLogo from "../assets/Firma-Arianny.png";

const SetSign = ({ images, HandleSignPdf }) => {
  const contenedorRef = useRef(null);
  const elementoRef = useRef(null);

  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  })

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
      setCoordinates({
        x: finalX,
        y: finalY,
      })
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="grid place-content-center">
      <div className="max-h-96 grid gap-2 grid-cols-2 overflow-hidden w-xl  mb-5">
        {images?.map((image, index) => {
          return (
            <div
              ref={contenedorRef}
              className="relative w-96 overflow-x-hidden shadow-style-2"
              key={index}
            >
              <img  id="elemento" className="shadow-lg pointer-events-none" src={image} alt="" />
              <img
                ref={elementoRef}
                className="absolute inset-0 w-24"
                // style={{ position: "absolute", top: '0', bottom: '0', width: "100px", height: "75px", cursor: 'grabbing' }}
                onMouseDown={handleMouseDown}
                src={SignLogo}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <section>
        
      </section>
      <button
        onClick={() => {
          HandleSignPdf(coordinates?.x, coordinates?.y);
        }}
      >
        Test
      </button>
    </div>
  );
};

export default SetSign;
