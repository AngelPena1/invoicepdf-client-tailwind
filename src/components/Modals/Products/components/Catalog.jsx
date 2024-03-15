import React from "react";
import Filters from "../../../Filters/Index";
import Pagination from "../../../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Catalog = (props) => {
  const hasData = props.data?.rows?.length > 0;

  return (
    <>
      <div
        id="background"
        className="w-screen h-screen bg-slate-500 opacity-40 fixed z-40 inset-0 flex litems-center justify-center"
        onClick={props.onHide}
      ></div>
      <section className="px-5 bg-white w-4xl h-2xl z-40 fixed top-0 select-none left-0 right-0 bottom-0 m-auto shadow-style-2 rounded-lg">
        <div className="my-4 py-2 sticky top-0 bg-white flex ">
          <input
            type="text"
            className="h-10 text-base"
            placeholder="Inserte un código o nombre de producto..."
            name="search"
            value={props.inputData.search}
            onKeyDown={props.HandleKeyPress}
            onChange={props.HandleInputData}
            autoComplete="off"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="py-3 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 duration-200 ml-2 cursor-pointer"
            onClick={() => {
              props.HandleSearch();
            }}
          />
          <Filters
            show={props.toggles.filters}
            toggleShow={props.toggleFilters}
            onClick={props.HandleClickFilters}
          />
        </div>
        <section
          ref={props.scrollbarRef}
          className=" px-2 pb-4 -z-10 overflow-auto h-xl relative"
        >
          {hasData && !props.loading && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-slate-200 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Código
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.productsData?.map((product, index) => {
                  return (
                    <tr
                      className="bg-white border-b hover:bg-slate-100 cursor-pointer"
                      key={index}
                      onClick={() => {
                        props.onClick(product);
                        props.onHide();
                      }}
                    >
                      <td className="px-6 py-4">
                        {product?.name.length < 72
                          ? product?.name
                          : product?.name.substring(0, 72) + "..."}
                      </td>
                      <td className="px-6 py-4">{product?.code}</td>
                      <td className="px-6 py-4">{product?.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!hasData && !props.loading && (
            <div className="flex place-content-center place-items-center text-center h-80 relative top-10">
              <div>
                <FontAwesomeIcon className="text-3xl mb-8" icon={faEyeSlash} />
                <h4>Nada ha sido encontrado...</h4>
              </div>
            </div>
          )}
          {props.loading && (
            <div className="skeleton h-full rounded-lg" />
          )}
        </section>
        {hasData && (
          <section className="flex justify-center mt-3">
            <Pagination
              itemsCount={props.data?.count}
              itemsPerPage={props.limit}
              loading={props.loading}
              hasData={true}
              resetPage={() => {}}
              disable={false}
              HandlePage={props.HandlePage}
              scrollbarRef={props.scrollbarRef}
            />
          </section>
        )}
      </section>
    </>
  );
};

export default Catalog;
