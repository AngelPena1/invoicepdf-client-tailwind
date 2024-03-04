import React from "react";
import { faEyeSlash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClientsForm = ({
  clientsData,
  result,
  searchInput,
  HandleChangeTab,
  HandleEditClient,
}) => {
  const resultHasValues = result?.length > 0;
  const searchInputHasValue = searchInput?.length > 0;
  return (
    <section>
      {!searchInputHasValue || resultHasValues ? (
        <div className="relative overflow-x-auto overflow-y-auto max-h-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  RNC
                </th>
                <th scope="col" className="px-6 py-3">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Creado por
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {!resultHasValues &&
                clientsData?.map((client, index) => {
                  return (
                    <tr className="bg-white border-b" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {client?.name}
                      </th>
                      <td className="px-6 py-4">{client?.rnc}</td>
                      <td className="px-6 py-4">{client?.phone}</td>
                      <td className="px-6 py-4">{client?.email}</td>
                      <td className="px-6 py-4">{client?.createdBy}</td>
                      <td className="px-6 py-4 grid grid-cols-2 min-w-52 relative">
                        {client?.isActive ? "Activo" : "Desactivado"}
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="absolute right-10 top-2 pt-2 text-xl cursor-pointer hover:text-primary"
                          onClick={() => {
                            HandleEditClient(client);
                            HandleChangeTab("maintenance");
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              {resultHasValues &&
                result?.map((client, index) => {
                  return (
                    <tr key={index} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {client?.name}
                      </th>
                      <td className="px-6 py-4">{client?.rnc}</td>
                      <td className="px-6 py-4">{client?.phone}</td>
                      <td className="px-6 py-4">{client?.email}</td>
                      <td className="px-6 py-4">{client?.createdBy}</td>
                      <td className="px-6 py-4 grid grid-cols-2 min-w-52 relative">
                        {client?.isActive ? "Activo" : "Desactivado"}
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="absolute right-10 top-2 pt-2 text-xl"
                          onClick={() => {
                            HandleEditClient(client);
                            HandleChangeTab("maintenance");
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full relative top-20 grid place-content-center place-items-center">
          <FontAwesomeIcon className="text-3xl mb-8" icon={faEyeSlash} />
          <h4>Nada ha sido encontrado</h4>
        </div>
      )}
    </section>
  );
};

export default ClientsForm;
