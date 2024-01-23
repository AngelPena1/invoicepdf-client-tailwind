import React from "react";
import HomeForm from "./components/HomeForm";
import ProductsForm from "./components/ProductsForm";
import useInputData from "./hooks/useInputData";
import useGetClients from "../../hooks/useGetClients";
import { useEffect } from "react";
import useGetCompanyInfo from "../../components/Modals/Business/hooks/useGetCompanyInfo";
import useTabNavigation from "./hooks/useTabNavigation";
import useGetProducts from "../../hooks/useGetProducts";

const Index = () => {
  const { data: clientsData, HandleSearch: HandleSearchClient } =
    useGetClients();

  const { data: companyData, HandleSearch: HandleCompanySearch } =
    useGetCompanyInfo();

  const { data: productsData, HandleSearch: HandleProductSearch } = useGetProducts()

  const {
    companyInputData,
    clientInputData,
    ResetInputValues,
    HandleInputData,
    HandleDataClient,
  } = useInputData({ clientsData, companyData });

  const { tab: currentTab, HandleChangeTab } = useTabNavigation();

  useEffect(() => {
    HandleSearchClient();
    HandleCompanySearch();
    HandleProductSearch()
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
          HandleDataClient={HandleDataClient}
          HandleChangeTab={HandleChangeTab}
        />
      )}
    </>
  );
};

export default Index;
