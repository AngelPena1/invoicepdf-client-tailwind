import React from "react";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({
  result,
  value,
  conditionToShowResults,
  onChange,
  onClick,
}) => {
  const inputIsNotEmpty = value;
  const resultHasValue = result?.length > 0;
  const onChangeHasFunction = onChange ? onChange : null
  const onClickHasFunction = onClick ? onClick : null

  return (
    <section className="h-10 w-full bg-slate-200 flex items-center p-6 relative mb-16">
      <div id="search" className="relative flex items-center">
        <FontAwesomeIcon
          className="absolute left-3 top-2"
          icon={faMagnifyingGlass}
        />
        <input
          type="text"
          className="bg-gray-50 border h-8 w-52 lg:w-xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-10 outline-none"
          placeholder="Busca un producto por su nombre o código"
          value={value}
          onChange={onChangeHasFunction}
        />
        <FontAwesomeIcon icon={faFilter} className="ml-5 cursor-pointer" />
      </div>
      {resultHasValue && inputIsNotEmpty && conditionToShowResults && (
        <div
          id="results"
          className="absolute lg:w-xl max-h-28 bg-white animate-show_up_results rounded-lg overflow-auto"
        >
          {result?.map((data, index) => {
            return (
              <ul
                key={index}
                className="grid grid-cols-4 text-center rounded-lg text-sm hover:bg-slate-100 p-2 transition duration-200"
                value={"este es el valor"}
                onClick={() => {
                  onClickHasFunction(data)
                }}
              >
                <li>{data?.code}</li>
                <li>{data?.name}</li>
                <li>{data?.category?.name}</li>
                <li>{data?.price}</li>
              </ul>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;
