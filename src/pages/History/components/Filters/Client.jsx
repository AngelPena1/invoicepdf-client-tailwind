import React from "react";
import Select from "../../../../components/Select/Index";

const Client = (props) => {
  return (
    <section className="w-full p-4  bg-white rounded-lg">
      <h4 className="mb-3 font-bold">Filtrar por cliente: </h4>
      <div className="mb-3">
        <label className="mr-4 mb-3 relative top-1 w-13 font-normal" htmlFor="">
          Nombre del cliente
        </label>
        <Select
          className="w-48"
          elements={props.ClientData}
          onClick={props.HandleSelectClient}
          value={props.filters?.client?.id}
          value_id={true}
        />
      </div>
    </section>
  );
};

export default Client;
