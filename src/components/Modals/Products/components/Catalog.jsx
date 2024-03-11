import React from "react";
import Filters from "../../../Filters/Index";
import Pagination from "../../../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Catalog = (props) => {
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
            placeholder="Escriba aquí para buscar un producto"
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
              props.HandleSearch()
            }}
          />
          <Filters
            show={props.toggles.filters}
            toggleShow={props.toggleFilters}
            onClick={props.HandleClickFilters}
          />
        </div>
        <section className="grid grid-cols-3 gap-4 overflow-auto h-xl px-2 pb-4 -z-10">
          {props.productsData.map((product, index) => {
            return (
              <div
                key={index}
                className="shadow-xl rounded-lg p-2 h-64 select-none cursor-pointer overflow-hidden duration-200 hover:bg-slate-200"
                onClick={() => {
                  props.onClick(product)
                  props.onHide()
                }
                }
              >
                {product?.image ? (
                  <img
                    src={product?.image}
                    alt=""
                    className="h-44 w-full  rounded-lg "
                  />
                ) : (
                  <div className="skeleton h-44 rounded-lg"></div>
                )}
                <h3 className="text-sm mt-1">{product?.name.length < 72 ? product?.name : (product?.name.substring(0, 72) + '...')}</h3>
                <h3 className="text-sm">{product?.price}</h3>
              </div>
            );
          })}
        </section>
        <section className="flex justify-center mt-3">
          <Pagination
            itemsCount={props.data?.count}
            itemsPerPage={props.limit}
            loading={props.loading}
            hasData={true}
            resetPage={() => {}}
            disable={false}
            HandlePage={props.HandlePage}
          />
        </section>
      </section>
    </>
  );
};

export default Catalog;
