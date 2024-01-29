import React from "react";
import Search from "../../../components/SearchProducts";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToDecimal } from "../../../utils/formatToDecimal/formatToDecimal";

const ProductsForm = ({
  result,
  inputData,
  selectedProducts,
  clearSearchInput,
  totals,
  toggles,
  toggleCode,
  toggleCost,
  HandleSearchInput,
  HandleSelectedProducts,
  HandlePrintQuote,
  HandleQuantityProducts,
  HandleDeleteProduct,
}) => {
  return (
    <section className="bg-white p-8 rounded-lg">
      <section className="mt-8 mb-20">
        <h2 className="text-3xl text-center font-bold">
          Selección de Productos
        </h2>
      </section>
      <section>
        <Search
          result={result}
          value={inputData?.search}
          conditionToShowResults={true}
          onChange={HandleSearchInput}
          onClick={(e) => {
            clearSearchInput();
            HandleSelectedProducts(e);
          }}
        />
      </section>
      <section>
        <section className="flex justify-end relative bottom-5">
          <div className="mr-10">
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.code}
                onClick={toggleCode}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Mostrar código
              </span>
            </label>
          </div>
          <div>
            <label className="relative top-1  inline-flex items-center cursor-pointer outline-none">
              <input
                type="checkbox"
                checked={toggles?.cost}
                onClick={toggleCost}
                className="sr-only peer outline-none"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 outline-none">
                Mostrar costo
              </span>
            </label>
          </div>
        </section>
        <div className="relative overflow-x-auto overflow-y-auto max-h-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-3 w-64">
                  Descripción
                </th>
                <th scope="col" className="px-2 py-3 text-center max-w-24">
                  Cantidad
                </th>
                {toggles?.code && (
                  <th scope="col" className="px-2 py-3 text-center max-w-24">
                    Código
                  </th>
                )}
                <th scope="col" className="px-2 py-3 text-left max-w-28">
                  Marca
                </th>
                <th scope="col" className="px-2 py-3 text-left max-w-32">
                  Categoría
                </th>
                <th scope="col" className="px-2 py-3 text-left max-w-32">
                  Subcategoría
                </th>
                {toggles?.cost && (
                  <th scope="col" className="px-2 py-3 max-w-28 text-right">
                    Costo
                  </th>
                )}
                <th scope="col" className="px-2 py-3 text-right max-w-32">
                  Precio
                </th>
                <th scope="col" className="px-2 py-3 text-center max-w-32">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts?.map((product, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap max-w-64"
                    >
                      {product?.name.substring(0, 42)}
                    </th>
                    <td className="px-2 py-4 text-center max-w-24">
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
                            productId: product?.id,
                            bool: true,
                          });
                        }}
                      />
                    </td>
                    {toggles?.code && (
                      <td className="px-2 py-4 text-center max-w-24">
                        {product?.code}
                      </td>
                    )}

                    <td className="px-2 py-4 text-left max-w-28">
                      {product?.brand?.substring(0, 15)}
                    </td>
                    <td className="px-2 py-4 text-left max-w-32">
                      {product?.category?.name}
                    </td>
                    <td className="px-2 py-4 text-left max-w-32">
                      {product?.subcategory?.name}
                    </td>
                    {toggles?.cost && (
                      <td className="px-2 py-4 text-right max-w-28">
                        {product?.cost}
                      </td>
                    )}

                    <td className="px-2 py-4 text-right max-w-32">
                      {product?.price}
                    </td>
                    <td className="px-2 py-4 text-center max-w-32">
                      {/* {product?.isActive ? "Activo" : "Desactivado"} */}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-xl cursor-pointer hover:text-primary"
                        onClick={() => {
                          HandleDeleteProduct({ productId: product?.id });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="max-w-64 px-2 py-4"></td>
                <td className="max-w-24 px-2 py-4"></td>
                {toggles?.code && <td className="max-w-24 px-2 py-4"></td>}
                <td className="max-w-28 px-2 py-4"></td>
                <td className="max-w-32 px-2 py-4"></td>
                <th className="max-w-32 px-2 py-4">TOTAL</th>
                {toggles?.cost && (
                  <th className="max-w-32 px-2 py-4 text-right">
                    {formatToDecimal(totals?.cost)}
                  </th>
                )}
                <th className="max-w-32 px-2 py-4 text-right">
                  {formatToDecimal(totals?.price)}
                </th>
                <td className="max-w-32 px-2 py-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <section className="flex justify-end mt-20">
        <button className="px-4 mr-8 button-2" onClick={HandlePrintQuote}>
          Preview
        </button>
        <button className="px-4 " onClick={HandlePrintQuote}>
          Imprimir
        </button>
      </section>
    </section>
  );
};

export default ProductsForm;
