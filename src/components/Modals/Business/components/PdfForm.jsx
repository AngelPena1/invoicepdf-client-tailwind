import React from "react";

const PdfForm = () => {
  return (
    <section className="p-4">
      <section className="mb-10">
        <h2 className="text-xl">Configuración de la Cotización</h2>
      </section>
      <section className="h-96">
        <ul>
          <li className="mb-4">
            <label className="relative inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                // checked={toggles?.itbis}
                // value={toggles?.itbis}
                name="has-image"
                // onClick={HandleToggleChange}
                onChange={() => {}}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Contiene imagenes
              </span>
            </label>
          </li>
          <li className="mb-4">
            <label className="relative inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                // checked={toggles?.itbis}
                // value={toggles?.itbis}
                name="has-image"
                // onClick={HandleToggleChange}
                onChange={() => {}}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Contiene imagenes
              </span>
            </label>
          </li>
        </ul>
      </section>
      <section className="grid w-f place-content-center bg-black mt-14">
        <div>
          <button
            type="button"
            className="px-2 button-2"
            onClick={() => {
              // toggleCompanyInfo(false);
            }}
          >
            Descartar Cambios
          </button>
          <button
            type="submit"
            className="px-2 ml-4 bg-primary"
            //   onClick={HandleUpdateClient}
          >
            Guardar Cambios
          </button>
        </div>
      </section>
    </section>
  );
};

export default PdfForm;
