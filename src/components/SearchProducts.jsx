import React, { useState } from "react";
import {
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Catalog from "./Modals/Products/Index";

const Search = ({
  result,
  value,
  conditionToShowResults,
  onChange,
  onClick,
}) => {
  const inputIsNotEmpty = value;
  const resultHasValue = result?.length > 0;
  const onChangeHasFunction = onChange ? onChange : null;
  const onClickHasFunction = onClick ? onClick : null;
  
  const [show, setShow] = useState(false);

  function toggleCatalog() {
    return setShow(!show);
  }

  function hideCatalog() {
    return setShow(false);
  }

  return (
    <>
      {show && (
        <Catalog onHide={hideCatalog} onClick={onClick} />
      )}
      <section className="h-10 w-full bg-primary-2 flex items-center p-6 relative mb-8 rounded-md">
        <div id="search" className="relative flex items-center">
          <FontAwesomeIcon
            className="absolute left-3 top-2"
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            className="bg-gray-50 border h-8 w-52 lg:w-xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-10 outline-none"
            placeholder="Busca un producto por su descripción o código"
            value={value}
            name="search"
            onChange={onChangeHasFunction}
            autoComplete="off"
          />
        </div>
        <section className="relative flex items-center">
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleCatalog}
            className="py-2 px-3 rounded-lg bg-slate-300  hover:bg-slate-400 duration-200 ml-5 cursor-pointer"
          />
        </section>
        {resultHasValue && inputIsNotEmpty && conditionToShowResults && (
          <div
            id="results"
            className="absolute lg:w-xl max-h-28 bg-white animate-show_up_results rounded-lg overflow-auto shadow-lg"
          >
            {result?.map((data, index) => {
              return (
                <ul
                  key={index}
                  className="flex text-center rounded-lg text-sm hover:bg-slate-100 p-2 transition duration-200"
                  onClick={() => {
                    onClickHasFunction(data);
                  }}
                >
                  <li className="mx-5">{data?.code}</li>
                  <li>{data?.description}</li>
                </ul>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Search;
