import React from "react";

const PdfForm = (props) => {
  return (
    <section className="p-8">
      <section className="mb-10">
        <h2 className="text-xl">Ajustes Generales del PDF</h2>
      </section>
      <section className="h-96">
        <ul>
          <li className="mb-4 ">
            <label className="relative inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={props.quoteInput?.has_images}
                value={props.quoteInput?.has_images}
                name="has_images"
                onClick={props.HandleQuoteInput}
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
      <section className="absolute right-4 bottom-4 place-content-end">
        <div>
          <button
            type="button"
            className="px-2 button-2"
            onClick={() => {
              props.resetQuoteValue()
              props.toggleCompanyInfo(false)
            }}
          >
            Descartar Cambios
          </button>
          <button
            type="submit"
            className="px-2 ml-4 bg-primary"
            onClick={props.HandleUpdateConfig}
          >
            Guardar Cambios
          </button>
        </div>
      </section>
    </section>
  );
};

export default PdfForm;
