import React from "react";
import { faCaretDown, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogout";
import Logo from '../../assets/logo_1.png'

const NavbarForm = ({ show, toggleMaintenance, toggleCompanyInfo }) => {
  const logout = useLogOut()
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <FontAwesomeIcon icon={faFileInvoice} className="text-2xl" /> */}
          <img src={Logo} alt="" className="w-10 h-10 mr-4" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Cotizador
          </span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
          <ul className="flex place-items-center">
            <li className="ml-10 hover:text-blue-700 duration-200" onClick={logout}>
              <FontAwesomeIcon 
                icon={faRightFromBracket}
                className="mr-3 text-lg relative top-0.5" 
              />
              Cerrar sesión
            </li>
          </ul>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 relative left-10"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:hover:bg-transparent md:hover:text-blue-700 rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            <li
              className="relative "
              onMouseEnter={() => toggleMaintenance(true)}
              onMouseLeave={() => toggleMaintenance(false)}
            >
              Mantenimientos
              <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
              {show?.maintenance && (
                <div className="absolute w-full h-fit bg-white grid rounded-lg shadow-xl text-sm animate-show_up_container">
                  <Link
                    to="/products"
                    className="p-2 rounded-t-lg hover:bg-slate-200 duration-200"
                  >
                    Productos
                  </Link>
                  <Link
                    to="/clients"
                    className="p-2 rounded-b-lg hover:bg-slate-200 duration-200"
                  >
                    Clientes
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/history"
                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Historial
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarForm;
