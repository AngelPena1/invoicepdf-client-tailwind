import React from "react";
import { faEyeSlash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../../../components/Pagination";

const ProductsForm = (props) => {
  const switchBetweenValues =
    props.result?.length > 0 ? props.result : props.productsData;

  const dataHasValue = switchBetweenValues?.length > 0 
  const productDataHasValue = props.productsData?.length > 0 ? true : false;

  return (
    <section className="shadow-style-2 rounded-lg">
      {true && (
        <div className="relative overflow-x-auto overflow-y-auto max-h-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            {!props.loading && dataHasValue && (
              <thead className="text-xs text-gray-700 uppercase bg-slate-300 sticky top-0">
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
                  <th scope="col" className="px-6 py-3 text-center bg-slate-300">
                    Editar
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {!props.loading && dataHasValue && switchBetweenValues?.map((product, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product?.description.length < 90
                        ? product?.description
                        : product?.description.substring(0, 90) + "..."}
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
                          props.HandleSearchImg(product?.id);
                          props.HandleEditProduct(product);
                          props.HandleChangeTab("create");
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!dataHasValue && !props.loading && (
        <div className="w-full h-xl grid place-content-center place-items-center">
          <FontAwesomeIcon className="text-3xl mb-8" icon={faEyeSlash} />
          <h4>Nada ha sido encontrado...</h4>
        </div>
      )}
      {props.loading && <section className="h-xl skeleton"></section>}
      {productDataHasValue && switchBetweenValues && (
        <>
          <div className="grid place-content-center py-4 relative">
            <Pagination
              itemsCount={props.count}
              itemsPerPage={props.limit}
              loading={props.loading}
              hasData={true}
              resetPage={() => {}}
              disable={false}
              HandlePage={props.HandlePage}
              scrollbarRef={props.scrollbarRef}
            />
          </div>
          <h4 className="grid place-content-end relative bottom-2 right-2">
            Total de Registros: {props.count}
          </h4>
        </>
      )}
    </section>
  );
};

export default ProductsForm;
