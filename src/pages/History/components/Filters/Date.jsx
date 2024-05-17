import React from "react";
import { useState } from "react";

const Date = (props) => {
  const [toggle, setToggle] = useState(true)

  function HandleToggle() {
    return setToggle(!toggle)
  }

  return (
    <section className="w-full p-4 bg-white rounded-lg">
      {/* <h4 className="mb-3 font-bold">Filtrar por fecha: </h4> */}
      <span className="mb-3 font-bold text-base relative bottom-1 mr-2">
        Tipo de Fecha:
      </span>
      <label className="relative left-2 top-1  inline-flex items-center cursor-pointer outline-none">
        <input
          type="checkbox"
          checked={toggle}
          value={toggle}
          name="code"
          onClick={HandleToggle}
          onChange={() => { }}
          className="sr-only peer outline-none"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none outline-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
      {toggle ? <>
        <div className="mt-5 mb-3 duration-200">
          <h4
            className="mr-4 w-12 inline-block font-normal"
            htmlFor=""
          >
            Desde
          </h4>
          <input
            className="h-8 w-36 inline-block select-none"
            type="date"
            value={props.date?.from}
            onChange={(e) => props.HandleDateChange(e, {
              property: "from",
            })}
          />
        </div>
        <div className="mb-3">
          <h4
            className="mr-4 w-12 inline-block font-normal"
            htmlFor=""
          >
            Hasta
          </h4>
          <input className="h-8 w-36 inline-block" type="date"
            value={props.date?.to}
            onChange={(e) => props.HandleDateChange(e, {
              property: "to"
            })} />
        </div>
      </> : <><div className="mb-3 duration-200">
        <h4
          className="mt-5 mr-4 w-12 inline-block font-normal"
          htmlFor=""
        >
          Fecha
        </h4>
        <input
          className="h-8 w-36 inline-block"
          type="date" value={props.date?.from_to}
          onChange={(e) => props.HandleDateChange(e, {
            property: "from_to",
          })} />
      </div>
      </>}

    </section>
  );
};

export default Date;
