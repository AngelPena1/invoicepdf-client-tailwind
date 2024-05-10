import React from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBar = ({ currentTab, HandleChangeTab, ResetInputValues }) => {
  return (
    <nav className="border-b-2 mb-10">
      <ul className="font-semibold">
        <li
          className={
            currentTab === "default"
              ? "inline-block mr-12 "
              : "inline-block mr-12 text-gray-400"
          }
          onClick={() => {
            HandleChangeTab("default");
            ResetInputValues();
          }}
        >
          Todos
        </li>
        <li
          className={
            currentTab === "create"
              ? "inline-block mr-12"
              : "inline-block mr-12 text-gray-400"
          }
          onClick={() => {
            ResetInputValues();
            HandleChangeTab("create");
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
          Crear / Editar
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
