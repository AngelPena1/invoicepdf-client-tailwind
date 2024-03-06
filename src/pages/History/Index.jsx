import React, { useEffect } from "react";
import HistoryTable from "./components/HistoryTable";
import useGetHistory from "./hooks/useGetHistory";
import useHistoryQuote from "./hooks/useHistoryQuote";
import LoadingTable from "./components/LoadingTable";
import Form from "../../components/Modals/Confirmation/Form";
import useToggles from "./hooks/useToggles";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const {
    data: historyData,
    loading: loadingHistory,
    ResetValue: ResetHistory,
    HandleSearch: HandleSearchHistory,
  } = useGetHistory();

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

  const { toggles, showDeleteConfirmation, hideDeleteConfirmation } =
    useToggles();

  function goToEdit(quote_id) {
    return navigate("/edit/" + quote_id);
  }

  useEffect(() => {
    HandleSearchHistory();
  }, []);

  return (
    <>
      <section name="heading" className="text-center text-2xl font-bold">
        <h2>Historial de Cotizaciones</h2>
      </section>
      {toggles?.deleteConfirmation && (
        <Form
          title={"Cuidado!"}
          show={toggles.deleteConfirmation}
          paragraph={`Estas a punto de borrar la ${selectedQuote?.name}. Esta acción no puede deshacerse.`}
          btnLabel={"Borrar"}
          onHide={hideDeleteConfirmation}
          onClick={HandleDisableQuote}
        />
      )}
      {!loadingHistory && (
        <HistoryTable
          goToEdit={goToEdit}
          historyData={historyData}
          HandlePrintQuote={HandlePrintQuote}
          HandleSelectedQuote={HandleSelectedQuote}
          showDeleteConfirmation={showDeleteConfirmation}
        />
      )}

      {loadingHistory && <LoadingTable />}
    </>
  );
};

export default Index;
