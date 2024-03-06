import React from "react";
import { faEdit, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToDecimal } from "../../../utils/formatToDecimal/formatToDecimal";
import { fullDateFormat } from "../../../utils/dateFormat/dateFormat";

const HistoryTable = ({
  goToEdit,
  historyData,
  HandlePrintQuote,
  HandleSelectedQuote,
  showDeleteConfirmation,
}) => {
  return (
    <section>
      <section
        name="content"
        className="mt-16 shadow-xl h-xl max-h-xl overflow-y-auto"
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 sticky top-0">
            <tr>
              <th scope="col" className="px-2 py-3">
                Descripción
              </th>
              <th scope="col" className="px-2 py-3">
                Cliente
              </th>
              <th scope="col" className="px-2 py-3">
                Fecha
              </th>
              <th scope="col" className="px-2 py-3">
                Total
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
                  <td className="px-2 py-4 text-left">{data?.client?.name}</td>
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
                        HandlePrintQuote(data?.id)}}
                    />
                  </td>
                  <td className="px-2 py-4 text-center">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-xl cursor-pointer hover:text-primary"
                      onClick={() => {
                        goToEdit(data?.id)
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
      </section>
    </section>
  );
};

export default HistoryTable;
