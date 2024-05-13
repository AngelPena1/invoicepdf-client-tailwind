import React from "react";
import Form from "./components/Form";
import useGetCountbook from "./hooks/useGetCountbook";
import useInputData from "./hooks/useInputData";
import QuoteVisualizer from "./components/QuoteVisualizer";
import { PrintInvoice } from "../../../utils/PDF/Index";
import useGetCompanyInfo from "../Business/hooks/useGetCompanyInfo";
import { useEffect } from "react";

const Index = ({ selectedQuote, toggleCreateInvoice }) => {

  const { data: companyData, HandleSearch: HandleCompanySearch } =
    useGetCompanyInfo();

  const { data: countbookData } = useGetCountbook();

  const { inputData, HandleInputData, onClickSelect } = useInputData({ selectedQuote, countbookData });

  const quoteName = selectedQuote?.name
  const selectedItems = JSON.parse(selectedQuote?.selected_products_json)

  function callPrintInvoice() {
    const HeadingData = {
      business: {
        title: companyData[0]?.name,
        address: companyData[0]?.address,
        rnc: companyData[0]?.rnc,
        email: companyData[0]?.email,
        phone: companyData[0]?.phone_1,
      },
      client: {
        name: selectedQuote?.client?.name,
        rnc: selectedQuote?.client?.rnc,
        address: selectedQuote?.client?.address,
        phone: selectedQuote?.client?.phone,
      },
      invoice_detail: {
        date: '01/05/2024',
        number: '00001',
        comprobant_type: "Crédito Fiscal",
        comprobant_number: "130334455",
        expire_date: "01/05/2024"
      }
    }

    const PricesData = {
      subtotal: "1200.00",
      subtotal_with_discount: "1200.00",
      itbis: "216.00",
      deposit: "0.00",
      discount: "0.00",
      total: "1416.00"
    }

    return PrintInvoice({ HeadingData, PricesData })
  }

  useEffect(() => {
    HandleCompanySearch()
     // eslint-disable-next-line
  }, [])

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div onClick={() => toggleCreateInvoice(false)} className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog"></div>
      <Form
        quoteName={quoteName}
        countbookData={countbookData}
        inputData={inputData}
        HandleInputData={HandleInputData}
        onClickSelect={onClickSelect}
        onCreate={callPrintInvoice}
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
