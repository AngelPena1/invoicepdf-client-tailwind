import React from "react";
import Select from '../../../Select/Index'

const Form = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
          <div className="md:flex items-center">
            {/* <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <i className="bx bx-error text-3xl">&#9888;</i>
            </div> */}
            <div className="mb-10">
              <p className="font-bold">Creación de Factura para Cotización RC-49</p>
              <p className="text-sm text-gray-700 mt-1">Por favor, complete los siguientes campos para continuar con la creación de la factura.</p>
            </div>
          </div>
          <div className="">
            <label htmlFor="">Tipo de Comprobante</label>
            {/* <input type="text" /> */}
            <Select 
              elements={props.countbookData}
              onClick={props.onClickSelect}
              // value_id={true}
            />
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              id="confirm-delete-btn"
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              onClick={() => {
                // onClick();
                // onHide();
              }}
            >
              {/* {baseBtnLabel} */}
            </button>
            <button
              id="confirm-cancel-btn"
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 button-2"
            //   onClick={onHide}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
