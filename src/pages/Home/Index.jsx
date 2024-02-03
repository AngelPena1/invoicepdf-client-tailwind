import { useEffect } from "react";
import ProductsForm from "./components/ProductsForm";
import useInputData from "./hooks/useInputData";
import { GenerarPDF } from "../../utils/CreateQuotePDF";
import useGetClients from "../../hooks/useGetClients";
import useGetCompanyInfo from "../../components/Modals/Business/hooks/useGetCompanyInfo";
import useGetProducts from "../../hooks/useGetProducts";
import useSearchProduct from "../../hooks/useSearchProduct";
import useGetImgProduct from "./hooks/useGetImgProductsArray";
import useGetCompanyImage from "../../hooks/useGetCompanyImage";
import useSelectedProducts from "./hooks/useSelectedProducts";
import useToggles from "./hooks/useToggles";
import useGetTotal from "./hooks/useGetTotal";

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
    HandleSearchInput,
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

  const { totals } = useGetTotal({ selectedProducts });

  const { result } = useSearchProduct({
    dataArray: productsData,
    searchInput: inputData?.search,
  });

  const { toggles, toggleCode, toggleCost, togglePreview } = useToggles();

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
        companyData,
        selectedProducts,
        imagesData,
        clientInputData,
        companyImgData,
        isPreview: toggles?.preview
      });
      clearSelectedProducts();
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
      {/* <HomeForm
          clientsData={clientsData}
          companyInputData={companyInputData}
          clientInputData={clientInputData}
          HandleInputData={HandleInputData}
          HandleDataClient={HandleDataClient}
          HandleChangeTab={HandleChangeTab}
        /> */}
      <ProductsForm
        result={result}
        inputData={inputData}
        selectedProducts={selectedProducts}
        imagesData={imagesData}
        clearSearchInput={clearSearchInput}
        totals={totals}
        toggles={toggles}
        toggleCode={toggleCode}
        toggleCost={toggleCost}
        HandleSearchInput={HandleSearchInput}
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
