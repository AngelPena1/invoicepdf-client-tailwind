import React, { useEffect } from "react";
import useTabNavigation from "./hooks/useTabNavigation";
import NavigationBar from "./components/NavigationBar";
import useInputData from "./hooks/useInputData";
import useGetClients from "../../hooks/useGetClients";
import useSearchClient from "./hooks/useSearchClient";
import ClientsForm from "./components/ClientsForm";
import MaintenanceForm from "./components/MaintenanceForm";
import usePostClient from "./hooks/usePostClient";
import Search from "../../components/SearchProducts";

const Index = () => {
  const {
    inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
    HandleInputData,
    HandleSearchInput,
    HandleEditClient,
  } = useInputData();

  const { tab: currentTab, HandleChangeTab } = useTabNavigation({
    ResetInputValues,
  });

  const { data: clientsData, HandleSearch: HandleSearchClients } =
    useGetClients();

  const { result } = useSearchClient({
    dataArray: clientsData,
    searchInput: inputData?.search,
  });

  const { resfresh, HandleCreateClient, HandleUpdateClient } = usePostClient({
    data: inputData,
    ResetInputValues,
    CheckForNotEmptyValues,
  });

  useEffect(() => {
    HandleSearchClients();
  }, [resfresh]);

  return (
    <section className="">
      <NavigationBar
        currentTab={currentTab}
        ResetInputValues={ResetInputValues}
        HandleChangeTab={HandleChangeTab}
      />

      <Search
        result={result}
        value={inputData?.search}
        onChange={HandleSearchInput}
        onClick={HandleEditClient}
        conditionToShowResults={currentTab !== "default"}
      />

      {currentTab === "default" && (
        <ClientsForm
          clientsData={clientsData}
          searchInput={inputData?.search}
          result={result}
          HandleChangeTab={HandleChangeTab}
          HandleEditClient={HandleEditClient}
        />
      )}

      {currentTab === "maintenance" && (
        <MaintenanceForm
          inputData={inputData}
          HandleInputData={HandleInputData}
          HandleCreateClient={HandleCreateClient}
          HandleUpdateClient={HandleUpdateClient}
        />
      )}
    </section>
  );
};

export default Index;
