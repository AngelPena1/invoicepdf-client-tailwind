import React from "react";
import Search from "../../../components/Searchs/SearchProducts";
import {
  faMinus,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToDecimal } from "../../../utils/formatToDecimal/formatToDecimal";
import Select from "../../../components/Select/Index";

const ProductsForm = ({
  result,
  inputData,
  clientsData,
  clientInputData,
  selectedProducts,
  clearSearchInput,
  totals,
  toggles,
  quoteHasData,
  quoteName,
  addNotesToProduct,
  removeNoteToProduct,
  showInputNote,
  showNotes,
  DefaultValueOnPriceChange,
  HandlePriceChange,
  HandleToggleChange,
  HandleInputData,
  HandleDataClient,
  HandleSelectedProducts,
  HandlePrintQuote,
  HandleQuantityProducts,
  HandleDeleteProduct,
  HandlePrintPreview,
}) => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-style-2 h-fit fade-in-bottom">
      <div className="grid grid-cols-2">
        <section
          name="heading"
          className="text-2xl font-bold mb-8 justify-start"
        >
          {quoteHasData ? <h2>Edición de {quoteName}</h2> : <h2>Crear Cotización</h2>}

        </section>
        <section className="mb-8 h-10 flex justify-end">
          <div className="w-80">
            <Select
              className=""
              value={clientInputData?.name}
              elements={clientsData}
              onClick={HandleDataClient}
              placeHolder={"Seleccione el Cliente"}
            />
            {/* <label htmlFor="">Seleccione el cliente</label> */}
          </div>
        </section>
      </div>
      <section>
        <Search
          result={result}
          value={inputData?.search}
          conditionToShowResults={true}
          onChange={HandleInputData}
          onClick={(e) => {
            clearSearchInput();
            HandleSelectedProducts(e);
          }}
        />
      </section>
      <section className="">
        <section className="flex justify-end relative bottom-5">
          <div className="mr-10">
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.itbis}
                value={toggles?.itbis}
                name="itbis"
                onClick={HandleToggleChange}
                onChange={() => { }}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Aplicar ITBIS
              </span>
            </label>
          </div>
          <div className="mr-10">
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.tips}
                value={toggles?.tips}
                name="tips"
                onClick={HandleToggleChange}
                onChange={() => { }}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                10% Legal
              </span>
            </label>
          </div>
          <div className="mr-10">
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.dollar}
                value={toggles?.dollar}
                name="dollar"
                onClick={HandleToggleChange}
                onChange={() => { }}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Cambio a Dólar
              </span>
            </label>
          </div>
          <div className="mr-10">
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.code}
                value={toggles?.code}
                name="code"
                onClick={HandleToggleChange}
                onChange={() => { }}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Mostrar Código
              </span>
            </label>
          </div>
          <div>
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.cost}
                value={toggles?.cost}
                name="cost"
                onClick={HandleToggleChange}
                onChange={() => { }}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Mostrar Precio de Lista
              </span>
            </label>
          </div>
        </section>
        <div className="relative overflow-x-auto overflow-y-auto h-72 max-h-72">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300 sticky top-0 z-30">
              <tr className="">
                <th scope="col" className="px-2 py-2 w-1/5 text-center">
                  Descripción
                </th>
                <th scope="col" className="px-2 py-2 w-1/5 text-center">
                  Cantidad
                </th>
                {toggles?.code && (
                  <th scope="col" className="px-2 py-2 w-1/5 text-center">
                    Código
                  </th>
                )}
                {toggles?.cost && (
                  <th scope="col" className="px-2 py-2 w-1/5 text-center">
                    Precio lista
                  </th>
                )}
                <th scope="col" className="px-2 py-2 w-1/5 text-center">
                  Precio
                </th>
                <th scope="col" className="px-2 py-2 text-center w-1/5">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts?.map((product, index) => {
                return (
                  <>
                    <tr
                      className={false ? "bg-white border-b" : ""}
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap border-r-2"
                      >
                        {product?.description?.length > 50 ? `${product?.description.substring(0, 50)}...` : `${product?.description}`}
                      </th>
                      <td className="px-2 py-2 select-none text-center border-r-2">
                        <FontAwesomeIcon
                          className="bg-slate-200 hover:bg-slate-100 p-1 rounded-full relative top-1 right-2 cursor-pointer"
                          icon={faMinus}
                          onClick={() => {
                            HandleQuantityProducts({
                              local_id: product?.local_id,
                              bool: false,
                            });
                          }}
                        />
                        {product?.quantity}
                        <FontAwesomeIcon
                          className="bg-slate-200 hover:bg-slate-100 p-1 rounded-full relative top-1 -right-2 cursor-pointer"
                          icon={faPlus}
                          onClick={() => {
                            HandleQuantityProducts({
                              local_id: product?.local_id,
                              bool: true,
                            });
                          }}
                        />
                      </td>
                      {toggles?.code && (
                        <td className="px-2 py-2 border-r-2 text-center">{product?.code}</td>
                      )}
                      {toggles?.cost && (
                        <td className="px-2 py-2 text-right border-r-2">
                          {product?.cost}
                        </td>
                      )}
                      <td className="px-2 py-2 flex justify-end border-r-2">
                        <p className="mr-4">{!toggles?.dollar ? "RD$" : "US$"}</p>
                        <input
                          name={!toggles?.dollar ? "input-price" : "input-price-us"}
                          className="w-20 text-right p-0 border-0 px-1"
                          type="text"
                          value={toggles?.dollar ? product?.price_us : product?.price}
                          onChange={(e) => {
                            HandlePriceChange(e, index);
                          }}
                          onClick={(e) => {
                            e.target.select();
                          }}
                          onBlur={(e) => {
                            DefaultValueOnPriceChange(e, index)
                          }}
                        />
                      </td>
                      <td className="px-2 py-2 text-center">
                        {/* {product?.isActive ? "Activo" : "Desactivado"} */}
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-xl cursor-pointer hover:text-primary"
                          onClick={() => {
                            HandleDeleteProduct({
                              local_id: product?.local_id,
                            });
                          }}
                        />
                      </td>
                    </tr>
                    {product?.notes &&
                      product?.notes.map((note, indexNote) => {
                        return (
                          <tr className="" key={indexNote}>
                            <td className="relative left-10 flex cursor-pointer">
                              <FontAwesomeIcon
                                icon={faX}
                                className="relative top-1 text-xs hover:text-slate-400"
                                onClick={() => {
                                  removeNoteToProduct(index, indexNote);
                                }}
                              />
                              <input
                                type="text"
                                className="py-0 border-0 bg-transparent outline-none italic text-slate-600"
                                value={note}
                                onChange={() => { }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    {product?.show_note ? (
                      <div className="flex relative left-10 mt-2 w-80">
                        <button
                          className="h-8 py-0 px-3 bg-red-500 hover:bg-red-400"
                          onClick={() => {
                            showInputNote(index, false);
                          }}
                        >
                          Cancelar
                        </button>
                        <input
                          name="note"
                          type="text"
                          className="h-8 mr-4 outline-none"
                          value={inputData?.note}
                          onChange={HandleInputData}
                        />
                        <button
                          className="h-8 py-0 px-3"
                          onClick={() => {
                            addNotesToProduct(index, inputData?.note);
                          }}
                        >
                          Aceptar
                        </button>
                      </div>
                    ) : (
                      <div className="text-center mt-2">
                        <FontAwesomeIcon
                          className="bg-slate-100 hover:bg-slate-200 p-1 rounded-full relative -top-1 cursor-pointer"
                          icon={faPlus}
                          onClick={() => {
                            showInputNote(index, true);
                          }}
                        />
                      </div>
                    )}
                    <tr className="border-b" />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-5 grid grid-cols-2">
        <section className="grid grid-cols-2 w-80">
          <input
            type="text"
            className="w-36 mr-8 mb-2 h-8 outline-none"
            name="discount"
            placeholder="Descuento"
            value={inputData?.discount}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <input
            type="text"
            className="w-36 mr-8 h-8 outline-none"
            name="deposit"
            placeholder="Anticipo"
            value={inputData?.deposit}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <input
            type="text"
            className="w-36 mr-8 h-8 outline-none"
            name="with_delivery"
            placeholder="Con entrega"
            value={inputData?.with_delivery}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <button className="w-36 h-8 p-0" onClick={showNotes}>
            Añadir notas
          </button>
        </section>
        <section className="flex justify-end relative right-3">
          <ul className="w-96 text-right border-t-2 border-blue-300">
            <li className="grid grid-cols-2">
              <p>Descuento</p>
              <p className="text-right">
                {inputData?.discount.includes("%")
                  ? `(${inputData?.discount}) ${formatToDecimal(parseFloat(totals?.discount))}`
                  : formatToDecimal(parseFloat(inputData?.discount))}
              </p>
            </li>
            {toggles?.itbis && <li className="grid grid-cols-2">
              <p>Subtotal</p>
              <p className="text-right">{formatToDecimal(totals?.price)}</p>
            </li>}

            {toggles?.itbis && <li className="grid grid-cols-2">
              <p>Itbis</p>
              <p className="text-right">{formatToDecimal(totals?.itbis)}</p>
            </li>}

            {toggles?.tips && <li className="grid grid-cols-2">
              <p>Tips</p>
              <p className="text-right">{formatToDecimal(totals?.tips)}</p>
            </li>}

            <li className="grid grid-cols-2">
              <p>Total</p>
              <p className="text-right">{ formatToDecimal(totals?.withITBIS)}</p>
            </li>
          </ul>
        </section>
      </section>
      <section className="grid grid-cols-2 relative top-4">
        <button className="button-2" onClick={HandlePrintPreview}>
          Preview
        </button>
        <button className="" onClick={HandlePrintQuote}>
          {quoteHasData ? "Guardar cambios" : "Registrar"}
        </button>
      </section>
    </section>
  );
};

export default ProductsForm;
