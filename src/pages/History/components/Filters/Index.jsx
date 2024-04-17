import React from "react";
import Date from "./Date";
import Client from "./Client";
import SelectedFilters from "./SelectedFilters";
import useDateFilter from "../../../../hooks/useDateFilter";
import useSelectedFilters from "./hooks/useSelectedFilters";
import useGetClients from "../../../../hooks/useGetClients";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Index = ({ getFiltersFromComponent, HandleSearchHistory }) => {
  const { data: ClientData, HandleSearch } = useGetClients();

  const { date, HandleDateChange, clearSpecificDate, clearDateState } = useDateFilter(
    "",
    "",
    true
  );

  const { filters, HandleSelectClient, clearAllFilters, RemoveFilter } = useSelectedFilters({
    date,
    ClientData,
    clearSpecificDate,
    clearDateState,
    HandleSearchHistory
  });

  useEffect(() => {
    getFiltersFromComponent(filters);
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    HandleSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="w-80 mr-10 select-none duration-200">
      <div className="mb-5 duration-200">
        <SelectedFilters filters={filters} RemoveFilter={RemoveFilter} />
      </div>
      <div className="mb-5 duration-200">
        <Date date={date} HandleDateChange={HandleDateChange} />
      </div>
      <div className="mb-5">
        <Client
          filters={filters}
          ClientData={ClientData}
          HandleSelectClient={HandleSelectClient}
        />
      </div>
      <div className="flex">
        <button 
          className="w-1/3 bg-red-500 hover:bg-red-400 duration-200"
          onClick={clearAllFilters}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button 
          className="w-full"
          onClick={HandleSearchHistory}
        >Aplicar</button>
      </div>
    </section>
  );
};

export default Index;
