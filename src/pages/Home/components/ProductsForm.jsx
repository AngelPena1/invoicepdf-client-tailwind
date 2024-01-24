import React from "react";
import Search from "../../../components/Search";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductsForm = ({
  result,
  inputData,
  HandleSearchInput,
  HandleChangeTab,
  HandleSelectedProducts,
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
          onClick={HandleSelectedProducts}
        />
      </section>
      <section>
        <div className="relative overflow-x-auto overflow-y-auto max-h-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Código
                </th>
                <th scope="col" className="px-6 py-3">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3">
                  Subcategoría
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Creado por
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Eliminar Seleccion
                </th>
              </tr>
            </thead>
            <tbody>
              {inputData?.selectedProducts?.map((product, index) => {
                return (
                  <tr className="bg-white border-b" key="0">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product?.name}
                    </th>
                    <td className="px-6 py-4">000</td>
                    <td className="px-6 py-4">Prueba</td>
                    <td className="px-6 py-4">Prueba</td>
                    <td className="px-6 py-4">000</td>
                    <td className="px-6 py-4">Admin</td>
                    <td className="px-6 py-4 text-center">
                      {/* {product?.isActive ? "Activo" : "Desactivado"} */}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-xl cursor-pointer hover:text-primary"
                        onClick={() => {}}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex justify-between mt-20">
        <button
          className="px-4 "
          onClick={() => {
            HandleChangeTab("default");
          }}
        >
          Volver
        </button>
        <button
          className="px-4 "
          onClick={() => {
            HandleChangeTab("products");
          }}
        >
          Imprimir
        </button>
      </section>
    </section>
  );
};

export default ProductsForm;
