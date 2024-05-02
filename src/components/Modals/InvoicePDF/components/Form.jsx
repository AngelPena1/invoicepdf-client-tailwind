import React from "react";
import Select from '../../../Select/Index'

const Form = (props) => {
  return (
    <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
      <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
        <div className="md:flex items-center">
          <div className="mb-6">
            <p className="font-bold">Creación de Factura para {props.quoteName}</p>
            <p className="text-sm text-gray-700 mt-1">Por favor, complete los siguientes campos para continuar con la creación de la factura.</p>
          </div>
        </div>
        <section>
          <div className="mb-5">
            <label htmlFor="">Cliente</label>
            <input type="text" className="h-8 text-gray-400" value={props.inputData?.client} onChange={() => {}}  disabled />
          </div>
          <div className="mb-5">
            <label htmlFor="">RNC</label>
            <input type="text" className="h-8 text-gray-400" value={props.inputData?.rnc} onChange={() => {}} disabled />
          </div>
          <div className="mb-5">
            <label htmlFor="">Tipo de Comprobante</label>
            <Select
              elements={props.countbookData}
              onClick={props.onClickSelect}
              className=""
              value={props.inputData?.invoice_type}
              // value_id={true}
            />
          </div>
          <div className="mb-10">
            <label htmlFor="">Fecha</label>
            <input type="date" className="h-8" value={props.inputData?.date} onChange={() => {}}/>
          </div>
        </section>
        <section className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            id="confirm-delete-btn"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            onClick={() => {
              props.onCreate()
            }}
          >
            Crear
          </button>
          <button
            id="confirm-cancel-btn"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 button-2"
            onClick={props.onCancel}
          >
            Cancelar
          </button>
        </section>
      </div>
    </div>
  );
};

export default Form;
