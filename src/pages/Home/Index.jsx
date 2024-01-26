import { useEffect } from "react";
import HomeForm from "./components/HomeForm";
import ProductsForm from "./components/ProductsForm";
import useInputData from "./hooks/useInputData";
import useGetClients from "../../hooks/useGetClients";
import useGetCompanyInfo from "../../components/Modals/Business/hooks/useGetCompanyInfo";
import useTabNavigation from "./hooks/useTabNavigation";
import useGetProducts from "../../hooks/useGetProducts";
import useSearchProduct from "../../hooks/useSearchProduct";
import useGetImgProduct from "./hooks/useGetImgProductsArray";
import { GenerarPDF } from "../../utils/CreateQuotePDF";

const Index = () => {
  const { data: clientsData, HandleSearch: HandleSearchClient } =
    useGetClients();

  const { data: companyData, HandleSearch: HandleCompanySearch } =
    useGetCompanyInfo();

  const { data: productsData, HandleSearch: HandleProductSearch } =
    useGetProducts();

  const {
    inputData,
    companyInputData,
    clientInputData,
    selectedProducts,
    HandleInputData,
    HandleSearchInput,
    HandleDataClient,
    HandleSelectedProducts,
  } = useInputData({ clientsData, companyData });

  const {
    data: imagesData,
    loading: imagesLoading,
    alreadyFetch,
    HandleSearch: HandleImagesSearch,
    HandleAlreadyFetch,
  } = useGetImgProduct({ selectedProducts: selectedProducts });

  const { result } = useSearchProduct({
    dataArray: productsData,
    searchInput: inputData?.search,
  });

  const { tab: currentTab, HandleChangeTab } = useTabNavigation();

  function HandlePrintQuote() {
    if (!alreadyFetch) {
      return HandleImagesSearch();
    }
  }

  useEffect(() => {
    if(!imagesData && !alreadyFetch) return
    GenerarPDF({ selectedProducts });
  }, [imagesData])

  // useEffect(() => {
  //   if (imagesLoading || !alreadyFetch) return;
  //   console.log("tamo aqui");
  //   HandlePrintQuote();
  // }, [imagesLoading]);

  useEffect(() => {
    HandleSearchClient();
    HandleCompanySearch();
    HandleProductSearch();
  }, []);

  return (
    <>
      {currentTab === "default" && (
        <HomeForm
          clientsData={clientsData}
          companyInputData={companyInputData}
          clientInputData={clientInputData}
          HandleInputData={HandleInputData}
          HandleDataClient={HandleDataClient}
          HandleChangeTab={HandleChangeTab}
        />
      )}
      {currentTab === "products" && (
        <ProductsForm
          result={result}
          inputData={inputData}
          selectedProducts={selectedProducts}
          imagesData={imagesData}
          HandleSearchInput={HandleSearchInput}
          HandleDataClient={HandleDataClient}
          HandleChangeTab={HandleChangeTab}
          HandleSelectedProducts={HandleSelectedProducts}
          HandleImagesSearch={HandleImagesSearch}
          HandlePrintQuote={HandlePrintQuote}
        />
      )}
    </>
  );
};

export default Index;
