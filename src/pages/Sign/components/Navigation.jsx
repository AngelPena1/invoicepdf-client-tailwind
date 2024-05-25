import React from "react";

const Navigation = (props) => {
  return (
    <section className="">
      <ul className="text-lg ">
        <li
          className={
            props.tabs?.create_sign
              ? "font-bold mb-10 cursor-default"
              : " cursor-default mb-10"
          }
          // onClick={() => {
          //   props.HandleChangeTabs("create_sign");
          // }}
        >
          Gestionar Firma
        </li>
        <li
          className={
            props.tabs?.document
              ? "font-bold mb-10 cursor-default"
              : "mb-10 cursor-default"
          }
          // onClick={() => {
          //   props.HandleChangeTabs("document");
          // }}
        >
          Cargar Documento
        </li>
        <li
          className={
            props.tabs?.set_sign
              ? "font-bold mb-10 cursor-default"
              : "mb-10 cursor-default"
          }
          // onClick={() => {
          //   props.HandleChangeTabs("set_sign");
          // }}
        >
          Colocar Firma
        </li>
      </ul>
    </section>
  );
};

export default Navigation;
