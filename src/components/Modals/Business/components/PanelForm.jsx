import React from "react";

const PanelForm = (props) => {
  return (
    <section className="w-52 bg-white border-r-2 rounded-l-lg">
      <ul className="select-none">
        <li
          className="p-4 hover:bg-slate-100 duration-200 rounded-l-lg"
          name="business"
          value={props.toggles?.business}
          onClick={props.HandleToggles}
        >
          Información del negocio
        </li>
        <li
          className="p-4 hover:bg-slate-100 duration-200 rounded-l-lg"
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
