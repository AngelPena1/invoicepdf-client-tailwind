import React from "react";
import { faEyeSlash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductsForm = ({
  productsData,
  result,
  searchInput,
  HandleChangeTab,
  HandleEditProduct,
  HandleSearchImg,
}) => {
  const resultHasValues = result?.length > 0;
  const searchInputHasValue = searchInput?.length > 0;
  return (
    <section className="shadow-lg">
      {!searchInputHasValue || resultHasValues ? (
        <div className="relative overflow-x-auto overflow-y-auto max-h-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Código
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
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
                {/* <th scope="col" className="px-6 py-3">
                  Creado por
                </th> */}
                <th scope="col" className="px-6 py-3 text-center">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {!resultHasValues &&
                productsData?.map((product, index) => {
                  return (
                    <tr className="bg-white border-b" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product?.description.length < 90 ? product?.description : product?.description.substring(0,90) + '...'}
                      </th>
                      <td className="px-6 py-4">{product?.code}</td>
                      <td className="px-6 py-4">{product?.brand?.name}</td>
                      <td className="px-6 py-4">{product?.category?.name}</td>
                      <td className="px-6 py-4">{product?.subcategory?.name}</td>
                      <td className="px-6 py-4">{product?.price}</td>
                      {/* <td className="px-6 py-4">{product?.createdBy}</td> */}
                      <td className="px-6 py-4 text-center">
                        {/* {product?.isActive ? "Activo" : "Desactivado"} */}
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-xl cursor-pointer hover:text-primary"
                          onClick={() => {
                            HandleSearchImg(product?.id);
                            HandleEditProduct(product);
                            HandleChangeTab("create");
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              {resultHasValues &&
                result?.map((product, index) => {
                  return (
                    <tr className="bg-white border-b" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product?.description.length < 90 ? product?.description : product?.description.substring(0,90) + '...'}
                      </th>
                      <td className="px-6 py-4">{product?.code}</td>
                      <td className="px-6 py-4">{product?.brand?.name}</td>
                      <td className="px-6 py-4">{product?.category?.name}</td>
                      <td className="px-6 py-4">{product?.subcategory?.name}</td>
                      <td className="px-6 py-4">{product?.price}</td>
                      {/* <td className="px-6 py-4">{product?.createdBy}</td> */}
                      <td className="px-6 py-4 text-center">
                        {/* {product?.isActive ? "Activo" : "Desactivado"} */}
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-xl cursor-pointer hover:text-primary"
                          onClick={() => {
                            HandleSearchImg(product?.id);
                            HandleEditProduct(product);
                            HandleChangeTab("create");
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full relative top-20 grid place-content-center place-items-center">
          <FontAwesomeIcon className="text-3xl mb-8" icon={faEyeSlash} />
          <h4>Nada ha sido encontrado</h4>
        </div>
      )}
    </section>
  );
};

export default ProductsForm;
