import { useEffect } from "react";
import ProductsForm from "./components/ProductsForm";
import useInputData from "./hooks/useInputData";
import { GenerarPDF } from "./quotePDF/Index";
import useGetClients from "../../hooks/useGetClients";
import useGetCompanyInfo from "../../components/Modals/Business/hooks/useGetCompanyInfo";
import useGetProducts from "../../hooks/useGetProducts";
import useSearchProduct from "../../hooks/useSearchProduct";
import useGetImgProduct from "./hooks/useGetImgProductsArray";
import useGetCompanyImage from "../../hooks/useGetCompanyImage";
import useSelectedProducts from "./hooks/useSelectedProducts";
import useToggles from "./hooks/useToggles";
import useGetTotal from "./hooks/useGetTotal";
import usePostQuotes from "./hooks/usePostQuotes";
import useGetQuoteById from "./hooks/useGetQuoteById";
import toast from "react-hot-toast";
import useConfig from "../../hooks/useConfig";
import Config from "../../components/Config";
import { useParams } from "react-router-dom";

const Index = () => {
  const { config } = useConfig();
  const { quote_id } = useParams();

  const { data: quoteData, quoteHasData } = useGetQuoteById(quote_id);

  const { data: clientsData, HandleSearch: HandleSearchClient } =
    useGetClients();

  const { data: companyData, HandleSearch: HandleCompanySearch } =
    useGetCompanyInfo();

  const { data: companyImgData, loading: companyImgLoading } =
    useGetCompanyImage();

  const { data: productsData, HandleSearch: HandleProductSearch } =
    useGetProducts();

  const {
    inputData,
    clientInputData,
    resetInputNote,
    clearAllInputs,
    clearSearchInput,
    HandleInputData,
    HandleDataClient,
  } = useInputData({ clientsData, quoteData, quoteHasData });

  const {
    selectedProducts,
    refreshPrice,
    addNotesToProduct,
    removeNoteToProduct,
    showInputNote,
    HandlePriceChange,
    HandleSelectedProducts,
    HandleQuantityProducts,
    HandleDeleteProduct,
    clearSelectedProducts,
  } = useSelectedProducts({ quoteData, quoteHasData, resetInputNote });

  const {
    data: imagesData,
    alreadyFetch,
    ResetValue: ResetImgArrayValue,
    HandleSearch: HandleImagesSearch,
    HandleAlreadyFetch,
  } = useGetImgProduct({ selectedProducts });

  const { totals } = useGetTotal({
    selectedProducts,
    refreshPrice,
    discount: inputData?.discount,
  });

  const { result } = useSearchProduct({
    dataArray: productsData,
    searchInput: inputData?.search,
  });

  const { toggles, togglePreview, HandleToggleChange } = useToggles({
    quoteData,
    quoteHasData,
  });

  const { HandleCreateQuote } = usePostQuotes({
    companyData,
    selectedProducts,
    inputData,
    clientInputData,
    toggles,
    results: totals,
    quoteHasData,
    quote_count: quoteData[0]?.quote_count,
  });

  function HandlePrintQuote() {
    if (alreadyFetch) return null;

    if (!clientInputData?.selected_client_id) {
      return toast.error("Debes seleccionar un cliente.");
    }

    HandleImagesSearch();
    return togglePreview(false);
  }

  function HandlePrintPreview() {
    if (alreadyFetch) return null;

    HandleImagesSearch();
    return togglePreview(true);
  }

  useEffect(() => {
    if (
      imagesData &&
      alreadyFetch &&
      selectedProducts?.length > 0 &&
      !companyImgLoading
    ) {
      GenerarPDF({
        selectedProducts,
        companyData,
        imagesData,
        clientData: clientInputData,
        companyImgData,
        discount: totals?.discount,
        with_delivery: inputData?.with_delivery,
        deposit: inputData?.deposit,
        cost: totals?.cost,
        itbis: totals?.itbis,
        price: totals?.price,
        withITBIS: totals?.withITBIS,
        isPreview: toggles?.preview,
        alreadyCreated: false,
        hasItbis: toggles?.itbis,
        hasCode: toggles?.code,
        hasCost: toggles?.cost,
        quoteId: quoteData[0]?.quote_count,
        quoteHasData,
        quoteConfig: config?.quote[0]
      });
      if (!toggles?.preview) {
        HandleCreateQuote();

        if (!quoteHasData) {
          clearSelectedProducts();
        }
      }
      HandleAlreadyFetch(false);
      ResetImgArrayValue();
    }
    // eslint-disable-next-line
  }, [imagesData]);

  useEffect(() => {
    if(!quote_id) return clearAllInputs()
    // eslint-disable-next-line
  }, [quote_id])

  useEffect(() => {
    HandleSearchClient();
    HandleCompanySearch();
    HandleProductSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ProductsForm
        result={result}
        clientsData={clientsData}
        clientInputData={clientInputData}
        inputData={inputData}
        selectedProducts={selectedProducts}
        imagesData={imagesData}
        clearSearchInput={clearSearchInput}
        quoteName={quoteData[0]?.name}
        quoteHasData={quoteHasData}
        totals={totals}
        toggles={toggles}
        showInputNote={showInputNote}
        addNotesToProduct={addNotesToProduct}
        removeNoteToProduct={removeNoteToProduct}
        HandlePriceChange={HandlePriceChange}
        HandleToggleChange={HandleToggleChange}
        HandleInputData={HandleInputData}
        HandleDataClient={HandleDataClient}
        HandleSelectedProducts={HandleSelectedProducts}
        HandleImagesSearch={HandleImagesSearch}
        HandlePrintQuote={HandlePrintQuote}
        HandleQuantityProducts={HandleQuantityProducts}
        HandleDeleteProduct={HandleDeleteProduct}
        HandlePrintPreview={HandlePrintPreview}
      />
      <Config />
    </>
  );
};

export default Index;
