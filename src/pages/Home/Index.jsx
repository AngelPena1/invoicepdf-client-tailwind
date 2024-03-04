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

const Index = () => {
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
    clearSearchInput,
    HandleInputData,
    HandleDataClient,
  } = useInputData({ clientsData, companyData });

  const {
    selectedProducts,
    HandleSelectedProducts,
    HandleQuantityProducts,
    HandleDeleteProduct,
    clearSelectedProducts,
  } = useSelectedProducts();

  const {
    data: imagesData,
    loading: imagesLoading,
    alreadyFetch,
    ResetValue: ResetImgArrayValue,
    HandleSearch: HandleImagesSearch,
    HandleAlreadyFetch,
  } = useGetImgProduct({ selectedProducts });

  const { totals } = useGetTotal({
    selectedProducts,
    discount: inputData?.discount,
  });

  const { result } = useSearchProduct({
    dataArray: productsData,
    searchInput: inputData?.search,
  });

  const { toggles, togglePreview, HandleToggleChange } = useToggles();

  const { HandleCreateQuote } = usePostQuotes({
    companyData,
    selectedProducts,
    inputData,
    clientInputData,
    toggles,
    results: totals,
  });

  function HandlePrintQuote() {
    if (alreadyFetch) return null;

    return HandleImagesSearch(), togglePreview(false);
  }

  function HandlePrintPreview() {
    if (alreadyFetch) return null;

    return HandleImagesSearch(), togglePreview(true);
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
        discount: inputData?.discount,
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
      });
      if (!toggles?.preview) {
        HandleCreateQuote();
        clearSelectedProducts();
      }
      HandleAlreadyFetch(false);
      ResetImgArrayValue();
    }
  }, [imagesData]);

  useEffect(() => {
    HandleSearchClient();
    HandleCompanySearch();
    HandleProductSearch();
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
        totals={totals}
        toggles={toggles}
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
    </>
  );
};

export default Index;
