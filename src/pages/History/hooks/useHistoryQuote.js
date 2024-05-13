import { GenerarPDF } from "../../ProductSelect/quotePDF/Index";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useConfig from "../../../hooks/useConfig";

const useHistoryQuote = ({
  historyData,
  HandleSearchHistory,
}) => {

  const { config } = useConfig()

  const [selectedQuote, setSelectedQuote] = useState(null)
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const companyId = auth?.company?.id;

  async function HandlePrintQuote(quoteId) {
    const quoteData = historyData.filter((data) => {
      return data?.id === quoteId
    })[0]
    const clientData = quoteData?.client;
    const selectedProducts = JSON.parse(quoteData?.selected_products_json);
    const notes = JSON.parse(quoteData?.notes);
    const productsId = selectedProducts.map((product) => product?.id);

    const imagesData = config?.quote[0]?.has_images ? await axiosPrivate.post("/product/images-array", {
      array_products_id: productsId,
    }) : []

    const companyData = await axiosPrivate.get(`/company/get/${companyId}`, {
      array_products_id: productsId,
    });

    const companyImgData = await axiosPrivate.get(
      `/company/get/${companyId}/image`,
      {
        array_products_id: productsId,
      }
    );
    
    GenerarPDF({
      name: quoteData?.name,
      selectedProducts,
      notesInPdf: notes,
      companyData: companyData.data,
      imagesData: imagesData.data,
      clientData,
      companyImgData: companyImgData?.data,
      discount: quoteData?.discount,
      with_delivery: quoteData?.with_delivery,
      deposit: quoteData?.deposit,
      cost: parseFloat(quoteData?.cost),
      itbis: parseFloat(quoteData?.itbis),
      price: parseFloat(quoteData?.subtotal),
      withITBIS: parseFloat(quoteData?.total),
      isAlreadyCreated: true,
      hasItbis: quoteData?.has_itbis,
      hasCode: quoteData?.has_code,
      hasCost: quoteData?.has_cost,
      isDollar: quoteData?.isDollar,
      quoteConfig: config?.quote[0]
    });
  }

  async function HandleDisableQuote() {
    await axiosPrivate.put("quote/disable", {
      quote_id: selectedQuote?.id,
    });
    return HandleSearchHistory();
  }

  function HandleSelectedQuote(quoteData) {
    return setSelectedQuote(quoteData)
  }

  return { selectedQuote, HandlePrintQuote, HandleDisableQuote, HandleSelectedQuote };
};

export default useHistoryQuote;
