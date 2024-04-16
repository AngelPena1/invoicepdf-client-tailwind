import React from "react";
import Date from "./Date";
import Client from "./Client";
import SelectedFilters from "./SelectedFilters";
import useDateFilter from "../../../../hooks/useDateFilter";
import useSelectedFilters from "./hooks/useSelectedFilters";
import useGetClients from "../../../../hooks/useGetClients";
import { useEffect } from "react";

const Index = ({getFiltersFromComponent}) => {
  const { data: ClientData, HandleSearch } = useGetClients();

  const { date, HandleDateChange, clearSpecificDate } = useDateFilter(
    "",
    "",
    true
  );

  const { filters, HandleSelectClient, RemoveFilter } = useSelectedFilters({
    date,
    ClientData,
    clearSpecificDate,
  });


  useEffect(() => {
    getFiltersFromComponent(filters)
    // eslint-disable-next-line
  }, [filters])

  useEffect(() => {
    HandleSearch()
    // eslint-disable-next-line
  }, [])

  return (
    <section className="w-80 mr-10 select-none">
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
      <div className="">
        <button className="w-full">Aplicar</button>
      </div>
    </section>
  );
};

export default Index;
