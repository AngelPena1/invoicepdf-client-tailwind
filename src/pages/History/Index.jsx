import React, { useEffect } from "react";
import HistoryTable from "./components/HistoryTable";
import useGetHistory from "./hooks/useGetHistory";
import useHistoryQuote from "./hooks/useHistoryQuote";
import ConfirmationDelete from "../../components/Modals/Confirmation/Index";
import useToggles from "./hooks/useToggles";
import { useNavigate } from "react-router-dom";
import useHistoryData from "./hooks/useHistoryData";
import Filters from "./components/Filters/Index";
import InvoicePDF from "../../components/Modals/InvoicePDF/Index";

const Index = () => {
  const navigate = useNavigate()

  const {
    data,
    loading: loadingHistory,
    getFiltersFromComponent,
    ResetValue: ResetHistory,
    HandleSearch: HandleSearchHistory,
  } = useGetHistory();

  const {
    historyData,
    OrderByDescription,
    OrderByClient,
    OrderByDate,
    OrderByTotal,
  } = useHistoryData({
    data,
  });

  const {
    selectedQuote,
    HandlePrintQuote,
    HandleDisableQuote,
    HandleSelectedQuote,
  } = useHistoryQuote({
    historyData,
    ResetHistory,
    HandleSearchHistory,
  });

  const { toggles, toggleCreateInvoice, showDeleteConfirmation, hideDeleteConfirmation } =
    useToggles();

  function goToEdit(quote_id) {
    return navigate("/edit/" + quote_id);
  }

  useEffect(() => {
    HandleSearchHistory();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="rounded-lg fade-in-bottom">
      {toggles?.invoiceForm && <InvoicePDF selectedQuote={selectedQuote} toggleCreateInvoice={toggleCreateInvoice} />}
      <section className="flex">
        <Filters
          getFiltersFromComponent={getFiltersFromComponent}
          HandleSearchHistory={HandleSearchHistory}
        />
        {toggles?.deleteConfirmation && (
          <ConfirmationDelete
            title={"Cuidado!"}
            show={toggles.deleteConfirmation}
            paragraph={`Estas a punto de borrar la ${selectedQuote?.name}. Esta acción no puede deshacerse.`}
            btnLabel={"Borrar"}
            onHide={hideDeleteConfirmation}
            onClick={HandleDisableQuote}
          />
        )}
        <section className="w-full shadow-lg">
          <div
            name="heading"
            className="text-2xl font-bold px-2 py-3 rounded-t-lg justify-start bg-white"
          >
            Historial de Cotizaciones
          </div>
          <HistoryTable
            toggleCreateInvoice={toggleCreateInvoice}
            goToEdit={goToEdit}
            loadingHistory={loadingHistory}
            historyData={historyData}
            HandlePrintQuote={HandlePrintQuote}
            HandleSelectedQuote={HandleSelectedQuote}
            showDeleteConfirmation={showDeleteConfirmation}
            OrderByDescription={OrderByDescription}
            OrderByClient={OrderByClient}
            OrderByDate={OrderByDate}
            OrderByTotal={OrderByTotal}
          />
        </section>
      </section>
    </section>
  );
};

export default Index;
