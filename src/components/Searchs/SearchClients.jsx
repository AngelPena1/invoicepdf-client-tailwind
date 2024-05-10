import React from "react";
import {
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SearchClients = ({
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

  return (
    <>
      <section className="h-10 w-full bg-primary-2 flex items-center p-6 relative mb-8 rounded-md">
        <div id="search" className="relative flex items-center">
          <FontAwesomeIcon
            className="absolute left-3 top-2"
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            className="bg-gray-50 border h-8 w-52 lg:w-xl border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-10 outline-none"
            placeholder="Busca un cliente por nombre o rnc"
            value={value}
            name="search"
            onChange={onChangeHasFunction}
            autoComplete="off"
          />
        </div>
        {resultHasValue && inputIsNotEmpty && conditionToShowResults && (
          <div
            id="results"
            className="absolute lg:w-xl max-h-28 bg-white animate-show_up_results rounded-lg overflow-auto shadow-lg"
          >
            {result?.map((data, index) => {
              return (
                <ul
                  key={index}
                  className="flex text-left rounded-lg text-sm hover:bg-slate-100 p-2 transition duration-200"
                  onClick={() => {
                    onClickHasFunction(data);
                  }}
                >
                  <li className="w-28">{data?.name}</li>
                  <li  className="w-full">{data?.rnc}</li>
                </ul>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchClients;
