import React from "react";
import Search from "../../../components/Searchs/SearchProducts";
import {
  faEdit,
  faMinus,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToDecimal } from "../../../utils/formatToDecimal/formatToDecimal";
import ClientCatalog from "../../../components/Modals/Clients/Index";

const ProductsForm = ({
  noteRef,
  result,
  inputData,
  clientsData,
  clientInputData,
  selectedProducts,
  clearSearchInput,
  clearClientInput,
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
    <section
      id="main-container"
      className="bg-white rounded-lg h-fit fade-in-bottom"
    >
      {/* Heading */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div
          name="heading"
          className="text-2xl font-bold mb-8 justify-start"
        >
          {quoteHasData ? (
            <h2>Edición de {quoteName}</h2>
          ) : (
            <h2>Crear Cotización</h2>
          )}
        </div>
        <div className="mb-8 relative top-2 mr-10 h-10 flex md:justify-end">
          {clientInputData?.selected_client_id !== "" ? (
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faX}
                className="mr-10 hover:text-red-300 text-red-400 cursor-pointer"
                onClick={clearClientInput}
              />
              <div className="inline-block">
                <ul className="text-sm grid grid-cols-2">
                  <li>
                    <p className="inline font-bold">Nombre: </p>
                    <p className="inline">{clientInputData?.name}</p>
                  </li>
                  <li>
                    <p className="inline font-bold">Razón Social: </p>
                    <p className="inline">{clientInputData?.razon_social}</p>
                  </li>
                  <li>
                    <p className="inline font-bold">RNC: </p>
                    <p className="inline">{clientInputData?.rnc}</p>
                  </li>
                  <li>
                    <p className="inline font-bold">Teléfono: </p>
                    <p className="inline">{clientInputData?.phone_1}</p>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="relative top-2 mr-10 ">
              <ClientCatalog onClick={HandleDataClient} />
            </div>
          )}
        </div>
      </section>
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
      {/* Config */}
      <section className="">
        {/* Table */}
        <div className="relative overflow-x-auto overflow-y-auto h-72 max-h-72 border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300 sticky top-0 z-10">
              <tr className="">
                <th scope="col" className="px-2 py-2 w-1/5 text-center">
                  Descripción
                </th>
                <th scope="col" className="px-2 py-2 w-1/5 min-w-[100px] text-center">
                  Notas
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
                        {product?.description?.length > 50
                          ? `${product?.description.substring(0, 50)}...`
                          : `${product?.description}`}
                      </th>
                      <td className="px-2 py-2 border-r-2 text-center">
                        {product?.notes &&
                          product?.notes.map((note, indexNote) => {
                            return (
                              <tr className="" key={indexNote}>
                                <td className="relative  flex cursor-pointer">
                                  <FontAwesomeIcon
                                    icon={faX}
                                    className="relative top-1 text-xs hover:text-red-300 text-red-400"
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
                        {product?.show_note ? <div className="flex">
                          <button className="h-7 py-0 px-2 mr-0 bg-red-400 hover:bg-red-300 duration-200" onClick={() => {
                            showInputNote(index, false);
                          }}>Cancelar</button>
                          <input
                            ref={noteRef}
                            className="h-7 mx-6"
                            type="text"
                            name="note"
                            value={inputData?.note}
                            onChange={HandleInputData}
                          />
                          <button
                            className="h-7 py-0 px-2"
                            onClick={() => {
                              addNotesToProduct(index, inputData?.note);
                            }}
                          >Aceptar</button>
                        </div> : <FontAwesomeIcon
                          className="bg-slate-200 hover:bg-slate-100 p-1 rounded-full relative top-1 cursor-pointer"
                          icon={faEdit}
                          onClick={() => {
                            showInputNote(index, true);
                          }}
                        />}
                      </td>
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
                        <td className="px-2 py-2 border-r-2 text-center">
                          {product?.code}
                        </td>
                      )}
                      {toggles?.cost && (
                        <td className="px-2 py-2 text-right border-r-2">
                          {product?.cost}
                        </td>
                      )}
                      <td className="px-2 py-2 text-center border-r-2">
                        <p className="mr-4 inline">
                          {!toggles?.dollar ? "RD$" : "US$"}
                        </p>
                        <input
                          name={
                            !toggles?.dollar ? "input-price" : "input-price-us"
                          }
                          className="w-20 text-right p-0 border-0 px-1 inline"
                          type="text"
                          value={
                            toggles?.dollar ? product?.price_us : product?.price
                          }
                          onChange={(e) => {
                            HandlePriceChange(e, index);
                          }}
                          onClick={(e) => {
                            e.target.select();
                          }}
                          onBlur={(e) => {
                            DefaultValueOnPriceChange(e, index);
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
                    <tr className="border-b" />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}

      <section className="mt-10 grid md:grid-cols-2">
        <section className="mb-10">
          <div className="mr-10 inline">
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
          <div className="mr-10 inline">
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
          <div className="mr-10 inline">
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
          <div className="mr-10 inline">
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
          <div className="mr-10 inline">
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
        <section className="mb-10  md:flex md:justify-end">
          <ul className="w-full md:w-96 text-right border-t-2 border-blue-300">
            <li className="grid grid-cols-2">
              <p>Descuento</p>
              <p className="text-right">
                {inputData?.discount.includes("%")
                  ? `(${inputData?.discount}) ${formatToDecimal(
                    parseFloat(totals?.discount)
                  )}`
                  : formatToDecimal(parseFloat(inputData?.discount))}
              </p>
            </li>
            {toggles?.itbis && (
              <li className="grid grid-cols-2">
                <p>Subtotal</p>
                <p className="text-right">{formatToDecimal(totals?.price)}</p>
              </li>
            )}

            {toggles?.itbis && (
              <li className="grid grid-cols-2">
                <p>Itbis</p>
                <p className="text-right">{formatToDecimal(totals?.itbis)}</p>
              </li>
            )}

            {toggles?.tips && (
              <li className="grid grid-cols-2">
                <p>Tips</p>
                <p className="text-right">{formatToDecimal(totals?.tips)}</p>
              </li>
            )}

            <li className="grid grid-cols-2">
              <p>Total</p>
              <p className="text-right">{formatToDecimal(totals?.withITBIS)}</p>
            </li>
          </ul>
        </section>
      </section>

      <section className="grid md:grid-cols-2 md:gap-10">
        <div className="w-full grid grid-cols-2 gap-2 mb-10 lg:w-80">
          <input
            type="text"
            className="w-full h-8 outline-none inline"
            name="discount"
            placeholder="Descuento"
            value={inputData?.discount}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <input
            type="text"
            className="w-full h-8 outline-none inline"
            name="deposit"
            placeholder="Anticipo"
            value={inputData?.deposit}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <input
            type="text"
            className="w-full h-8 outline-none inline"
            name="with_delivery"
            placeholder="Con entrega"
            value={inputData?.with_delivery}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <button className="w-full h-8 p-0 inline" onClick={showNotes}>
            Añadir notas
          </button>
        </div>
        {/* Buttons */}
        <section className="grid grid-cols-2 gap-4  md:grid-cols-1 md:justify-items-end  md:gap-0 ">
          <button className="button-2 w-full h-10 py-0 md:w-80 lg:w-96 lg:mb-0 md:mr-0" onClick={HandlePrintPreview}>
            Preview
          </button>
          <button className="w-full h-10 py-0 md:w-80 md:mr-0 lg:w-96" onClick={HandlePrintQuote}>
            {quoteHasData ? "Guardar cambios" : "Registrar"}
          </button>
        </section>
      </section>
    </section>
  );
};

export default ProductsForm;
