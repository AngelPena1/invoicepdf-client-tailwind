import React from "react";
import Date from "./Date";
import Client from "./Client";
import SelectedFilters from "./SelectedFilters";

const Index = () => {
  return (
    <section className="w-80 mr-10">
      <div className="mb-5">
        <SelectedFilters />
      </div>
      <div className="mb-5">
        <Date />
      </div>
      <div className="mb-5">
        <Client />
      </div>
      <div className="">
        <button className="w-full">Aplicar</button>
      </div>
    </section>
  );
};

export default Index;
