import { useEffect } from "react";
import HomeForm from "./components/HomeForm";
import ProductsForm from "./components/ProductsForm";
import useInputData from "./hooks/useInputData";
import useGetClients from "../../hooks/useGetClients";
import useGetCompanyInfo from "../../components/Modals/Business/hooks/useGetCompanyInfo";
import useTabNavigation from "./hooks/useTabNavigation";
import useGetProducts from "../../hooks/useGetProducts";
import useSearchProduct from "../../hooks/useSearchProduct";

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
    HandleSelectedProducts
  } = useInputData({ clientsData, companyData });

  const { result } = useSearchProduct({
    dataArray: productsData,

    searchInput: inputData?.search,
  });

  const { tab: currentTab, HandleChangeTab } = useTabNavigation();

  console.log(selectedProducts);

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
          HandleSearchInput={HandleSearchInput}
          HandleDataClient={HandleDataClient}
          HandleChangeTab={HandleChangeTab}
          HandleSelectedProducts={HandleSelectedProducts}
        />
      )}
    </>
  );
};

export default Index;
