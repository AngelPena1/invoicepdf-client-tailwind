import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import Select from "../Select/Index";

const Form = (props) => {
  return (
    <section className="relative z-50">
      <FontAwesomeIcon
        className="py-3 px-4 rounded-lg bg-slate-200  hover:bg-slate-300 duration-200 ml-2 cursor-pointer"
        icon={faFilter}
        onClick={props.toggleWindow}
      />
      {props.window && (
        <section className="absolute w-fit h-fit z-50 bg-white right-0 shadow-style-2 select-none rounded-lg py-2 px-4">
          <div className="absolute right-2 top-0 cursor-pointer">
            <FontAwesomeIcon
              icon={faX}
              className="text-xs"
              onClick={props.HideWindow}
            />
          </div>
          <h3 className="text-base text-center mb-6">Centro de Filtros</h3>
          <div className="flex items-center mb-4">
            <label htmlFor="" className="w-20">
              Marca:{" "}
            </label>
            <Select
              className="ml-4 w-56 relative"
              elements={props.selectData?.groups}
              value_id={true}
              onClick={props.HandleGroupSelect}
              value={props.selectData.group_selected}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="" className="w-20">
              Categoría:{" "}
            </label>
            <Select
              className="ml-4 w-56 relative"
              elements={props.selectData?.categories}
              value_id={true}
              onClick={props.HandleCategorySelect}
              value={props.selectData.category_selected}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="" className="w-20">
              Subcategoría:{" "}
            </label>
            <Select
              className="ml-4 w-56 relative"
              elements={props.selectData?.subcategories}
              value_id={true}
              onClick={props.HandleSubcategorySelect}
              value={props.selectData.subcategory_selected}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="" className="w-20">
              Acabado:{" "}
            </label>
            <Select
              className="ml-4 w-56 relative"
              elements={props.selectData?.finishes}
              value_id={true}
              onClick={props.HandleFinishesSelected}
              value={props.selectData.finishes_selected}
            />
          </div>
          <div className="flex">
            <button
              className="w-1/3 button-2"
              onClick={() => {
                props.onClick(props.cleanData())
                props.HideWindow()
              }}
            >
              Limpiar
            </button>
            <button
              className="w-full"
              onClick={() => {
                props.onClick(props.ReturnDataFormat())
                props.HideWindow()
              }}
            >
              Filtrar
            </button>
          </div>
        </section>
      )}
    </section>
  );
};

export default Form;
