import React from "react";

const PanelForm = (props) => {
  return (
    <section className="w-56 bg-white border-r-2 rounded-l-lg">
      <ul className="select-none">
        <li
          className={
            props.toggles?.business
              ? "p-4 bg-slate-200 duration-200 border-b-2 rounded-tl-lg"
              : "p-4 hover:bg-slate-100 duration-200 border-b-2 rounded-tl-lg"
          }
          name="business"
          value={props.toggles?.business}
          onClick={props.HandleToggles}
        >
          Información del Negocio
        </li>
        <li
          className={
            props.toggles?.pdf
              ? "p-4 bg-slate-200 duration-200 border-b-2"
              : "p-4 hover:bg-slate-100 duration-200 border-b-2"
          }
          name="pdf"
          value={props.toggles?.pdf}
          onClick={props.HandleToggles}
        >
          Cotización
        </li>
      </ul>
    </section>
  );
};

export default PanelForm;
