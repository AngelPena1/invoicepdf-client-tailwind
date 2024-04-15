import React from "react";

const Date = () => {
  return (
    <section className="w-full p-4 bg-white shadow-style-2 rounded-lg">
        <h4 className="mb-3 font-bold">Filtrar por fecha: </h4>
        <div className="mb-3">
          <h4
            className="mr-4 w-12 inline-block font-normal"
            htmlFor=""
          >
            Desde
          </h4>
          <input className="h-8 w-36 inline-block" type="date" />
        </div>
        <div className="mb-3">
          <h4
            className="mr-4 w-12 inline-block font-normal"
            htmlFor=""
          >
            Hasta
          </h4>
          <input className="h-8 w-36 inline-block" type="date" />
        </div>
      </section>
  );
};

export default Date;
