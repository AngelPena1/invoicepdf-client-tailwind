import React from "react";
import Form from "./components/Form";
import useGetCountbook from "./hooks/useGetCountbook";
import useInputData from "./hooks/useInputData";
import QuoteVisualizer from "./components/QuoteVisualizer";

const Index = ({ selectedQuote, toggleCreateInvoice }) => {
  const { data: countbookData } = useGetCountbook();

  const { inputData, HandleInputData, onClickSelect } = useInputData({ selectedQuote, countbookData });

  const quoteName = selectedQuote?.name
  const selectedItems = JSON.parse(selectedQuote?.selected_products_json)

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div onClick={() => toggleCreateInvoice(false)} className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog"></div>
      <Form
        quoteName={quoteName}
        countbookData={countbookData}
        inputData={inputData}
        HandleInputData={HandleInputData}
        onClickSelect={onClickSelect}
        onCancel={() => toggleCreateInvoice(false)}
      />
      <QuoteVisualizer
        selectedQuote={selectedQuote}
        selectedItems={selectedItems}
      />
    </section>
  );
};

export default Index;
