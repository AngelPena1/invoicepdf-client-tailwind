import React from "react";
import Search from "../../../components/SearchProducts";
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
  addNotesToProduct,
  removeNoteToProduct,
  showInputNote,
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
    <section className="bg-white p-8 rounded-lg shadow-style-2 h-fit">
      <div className="grid grid-cols-2">
        <section
          name="heading"
          className="text-2xl font-bold mb-8 justify-start"
        >
          <h2>Cotización de Productos</h2>
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
                onChange={() => {}}
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
                checked={toggles?.code}
                value={toggles?.code}
                name="code"
                onClick={HandleToggleChange}
                onChange={() => {}}
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
                onChange={() => {}}
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
              <tr>
                <th scope="col" className="px-2 py-2">
                  Descripción
                </th>
                <th scope="col" className="px-2 py-2 text-center ">
                  Cantidad
                </th>
                {toggles?.code && (
                  <th scope="col" className="px-2 py-2 text-left ">
                    Código
                  </th>
                )}
                <th scope="col" className="px-2 py-2 text-left ">
                  Marca
                </th>
                <th scope="col" className="px-2 py-2 text-left ">
                  Categoría
                </th>
                <th scope="col" className="px-2 py-2 text-left ">
                  Subcategoría
                </th>
                <th scope="col" className="px-2 py-2 text-left ">
                  Acabado
                </th>
                {toggles?.cost && (
                  <th scope="col" className="px-2 py-2 text-right">
                    Precio lista
                  </th>
                )}
                <th scope="col" className="px-2 py-2 text-right">
                  Precio
                </th>
                <th scope="col" className="px-2 py-2 text-center">
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
                        className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product?.description?.substring(0, 42)}
                      </th>
                      <td className="px-2 py-2 text-center">
                        <FontAwesomeIcon
                          className="bg-slate-200 hover:bg-slate-100 p-1 rounded-full relative top-1 right-2 cursor-pointer"
                          icon={faMinus}
                          onClick={() => {
                            HandleQuantityProducts({
                              productId: product?.id,
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
                        <td className="px-2 py-2 text-left">{product?.code}</td>
                      )}
                      <td className="px-2 py-2 text-left">
                        {product?.brand?.name?.substring(0, 15)}
                      </td>
                      <td className="px-2 py-2 text-left">
                        {product?.category?.name}
                      </td>
                      <td className="px-2 py-2 text-left ">
                        {product?.subcategory?.name}
                      </td>
                      <td className="px-2 py-2 text-left">
                        {product?.finish?.name}
                      </td>
                      {toggles?.cost && (
                        <td className="px-2 py-2 text-right">
                          {product?.cost}
                        </td>
                      )}
                      <td className="px-2 py-2 grid place-content-end">
                        <input
                          name="input-price"
                          className="w-20 text-right p-0 border-0"
                          type="text"
                          value={product?.price}
                          onChange={(e) => {
                            HandlePriceChange(e, index);
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
                                onChange={() => {}}
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
            {/* {toggles?.itbis ? (
              <tfoot className="text-right ">
                <tr className="">
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  {toggles?.code && <td className=" px-2"></td>}
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <th className="px-2 pt-4 text-red-400">DESCUENTO</th>
                  {toggles?.cost && <th className="px-2 text-right"></th>}
                  <th className="px-2 pt-4 text-right text-red-400">
                    {formatToDecimal(parseFloat(inputData?.discount))}
                  </th>
                  <td className="px-2"></td>
                </tr>
                <tr className="">
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  {toggles?.code && <td className=" px-2"></td>}
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <th className="px-2">SUBTOTAL</th>
                  {toggles?.cost && (
                    <th className="px-2 text-right">
                      {formatToDecimal(totals?.cost)}
                    </th>
                  )}
                  <th className="px-2 text-right">
                    {formatToDecimal(totals?.price)}
                  </th>
                  <td className=" px-2"></td>
                </tr>
                <tr>
                  <td className="px-2 "></td>
                  <td className="px-2 "></td>
                  {toggles?.code && <td className=" px-2 "></td>}
                  <td className="px-2 "></td>
                  <td className=" px-2 "></td>
                  <td className=" px-2 "></td>
                  <th className="px-2 ">ITBIS</th>
                  {toggles?.cost && <th className="px-2  text-right"></th>}
                  <th className=" px-2  text-right">
                    {formatToDecimal(totals?.itbis)}
                  </th>
                  <td className="px-2"></td>
                </tr>
                <tr>
                  <td className="px-2"></td>
                  <td className="px-2 "></td>
                  {toggles?.code && <td className=" px-2 "></td>}
                  <td className="px-2 "></td>
                  <td className=" px-2 "></td>
                  <td className=" px-2 "></td>
                  <th className="px-2 border-t-2 border-gray-500">TOTAL</th>
                  {toggles?.cost && (
                    <th className="px-2  text-right border-t-2 border-gray-500"></th>
                  )}
                  <th className=" px-2 text-right border-t-2 border-gray-500">
                    {formatToDecimal(totals?.withITBIS)}
                  </th>
                  <td className="px-2"></td>
                </tr>
              </tfoot>
            ) : (
              <tfoot className="text-right">
                <tr className="">
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  {toggles?.code && <td className=" px-2"></td>}
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <th className="px-2 text-red-400">DESCUENTO</th>
                  {toggles?.cost && <th className="px-2  text-right"></th>}
                  <th className="px-2  text-right text-red-400">
                    {formatToDecimal(parseFloat(inputData?.discount))}
                  </th>
                  <td className=" px-2 "></td>
                </tr>
                <tr className="">
                  <td className="px-2 "></td>
                  <td className="px-2"></td>
                  {toggles?.code && <td className=" px-2"></td>}
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <td className="px-2"></td>
                  <th className="px-2 border-t-2 border-gray-500 font-bold">
                    TOTAL
                  </th>
                  {toggles?.cost && (
                    <th className="px-2 text-right border-t-2 border-gray-500">
                      {formatToDecimal(totals?.cost)}
                    </th>
                  )}
                  <th className="px-2 text-right border-t-2 border-gray-500">
                    {formatToDecimal(totals?.price)}
                  </th>
                  <td className="px-2 "></td>
                </tr>
              </tfoot>
            )} */}
          </table>
        </div>
      </section>
      <section className="mt-5 grid grid-cols-2 ">
        <section className="grid grid-cols-2 w-80">
          <input
            type="text"
            className="w-36 mr-8 mb-2 h-8"
            name="discount"
            placeholder="Descuento"
            value={inputData?.discount}
            onChange={HandleInputData}
            autoComplete="off"
          />

          <input
            type="text"
            className="w-36 mr-8 h-8"
            name="deposit"
            placeholder="Anticipo"
            value={inputData?.deposit}
            onChange={HandleInputData}
            autoComplete="off"
          />
          <input
            type="text"
            className="w-36 mr-8 h-8"
            name="with_delivery"
            placeholder="Con entrega"
            value={inputData?.with_delivery}
            onChange={HandleInputData}
            autoComplete="off"
          />
        </section>
        <section className="flex justify-end">
          <ul className="w-96 text-right border-t-2 border-blue-300">
            <li className="grid grid-cols-2">
              <p>Descuento</p>
              <p className="text-right">1000.00</p>
            </li>
            <li className="grid grid-cols-2">
              <p>Subtotal</p>
              <p className="text-right">1000.00</p>
            </li>
            <li className="grid grid-cols-2">
              <p>Itbis</p>
              <p className="text-right">1000.00</p>
            </li>
            <li className="grid grid-cols-2">
              <p>Total</p>
              <p className="text-right">1000.00</p>
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
