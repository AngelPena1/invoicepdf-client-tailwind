import React from "react";
import {
  faEdit,
  faPrint,
  faTrash,
  faSort,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToDecimal } from "../../../utils/formatToDecimal/formatToDecimal";
import { fullDateFormat } from "../../../utils/dateFormat/dateFormat";

const HistoryTable = ({
  goToEdit,
  historyData,
  loadingHistory,
  HandlePrintQuote,
  HandleSelectedQuote,
  showDeleteConfirmation,
  OrderByDescription,
  OrderByClient,
  OrderByDate,
  OrderByTotal,
}) => {
  const hasHistoryData = historyData?.length > 0;
  return (
    <section className="w-full border-l rounded-lg bg-white">
      <section
        name="content"
        className="h-xl max-h-xl overflow-y-auto"
      >
        {!loadingHistory && hasHistoryData && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300 sticky top-0">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Descripción
                  <FontAwesomeIcon
                    icon={faSort}
                    onClick={OrderByDescription}
                    className="ml-3 cursor-pointer hover:text-slate-400"
                  />
                </th>
                <th scope="col" className="px-2 py-3">
                  Cliente
                  <FontAwesomeIcon
                    icon={faSort}
                    onClick={OrderByClient}
                    className="ml-3 cursor-pointer hover:text-slate-400"
                  />
                </th>
                <th scope="col" className="px-2 py-3">
                  Fecha
                  <FontAwesomeIcon
                    icon={faSort}
                    onClick={OrderByDate}
                    className="ml-3 cursor-pointer hover:text-slate-400"
                  />
                </th>
                <th scope="col" className="px-2 py-3">
                  Total
                  <FontAwesomeIcon
                    icon={faSort}
                    onClick={OrderByTotal}
                    className="ml-3 cursor-pointer hover:text-slate-400"
                  />
                </th>
                <th scope="col" className="px-2 py-3 text-center">
                  Imprimir
                </th>
                <th scope="col" className="px-2 py-3 text-center">
                  Editar
                </th>
                <th scope="col" className="px-2 py-3 text-center">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="">
              {historyData?.map((data, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data?.name}
                    </th>
                    <td className="px-2 py-4 text-left">
                      {data?.client?.name}
                    </td>
                    <td className="px-2 py-4 text-left">
                      {fullDateFormat(data?.createdAt, "spanish")}
                    </td>
                    <td className="px-2 py-4 text-left">
                      {formatToDecimal(parseFloat(data?.total))}
                    </td>
                    <td className="px-2 py-4 text-center">
                      <FontAwesomeIcon
                        icon={faPrint}
                        className="text-xl cursor-pointer hover:text-primary z-0"
                        onClick={() => {
                          HandlePrintQuote(data?.id);
                        }}
                      />
                    </td>
                    <td className="px-2 py-4 text-center">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-xl cursor-pointer hover:text-primary"
                        onClick={() => {
                          goToEdit(data?.id);
                        }}
                      />
                    </td>
                    <td className="px-2 py-4 text-center">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-xl cursor-pointer hover:text-primary"
                        onClick={() => {
                          HandleSelectedQuote(data);
                          showDeleteConfirmation();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {loadingHistory && <section className="h-xl skeleton"></section>}
        {!hasHistoryData && !loadingHistory && (
          <div className="w-full h-xl grid place-content-center place-items-center">
            <FontAwesomeIcon className="text-3xl mb-8" icon={faEyeSlash} />
            <h4>Nada ha sido encontrado...</h4>
          </div>
        )}
      </section>
    </section>
  );
};

export default HistoryTable;
