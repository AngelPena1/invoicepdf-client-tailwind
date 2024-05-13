import React, { useEffect } from "react";
import useTabNavigation from "./hooks/useTabNavigation";
import NavigationBar from "./components/NavigationBar";
import useInputData from "./hooks/useInputData";
import useGetClients from "../../hooks/useGetClients";
import useSearchClient from "./hooks/useSearchClient";
import ClientsForm from "./components/ClientsForm";
import MaintenanceForm from "./components/MaintenanceForm";
import usePostClient from "./hooks/usePostClient";
import Search from '../../components/Searchs/SearchClients'

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

  const { data: clientsData, loading: clientLoading, HandleSearch: HandleSearchClients } =
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
    // eslint-disable-next-line
  }, [resfresh]);

  return (
    <section className="bg-white rounded-lg fade-in-bottom">
      <section className="grid grid-cols-2">
        <div
          name="heading"
          className="text-2xl font-bold mb-6 justify-start"
        >
          Mantenimiento de Clientes
        </div>
      </section>
      <NavigationBar
        currentTab={currentTab}
        ResetInputValues={ResetInputValues}
        HandleChangeTab={HandleChangeTab}
      />

      <Search
        result={result}
        value={inputData?.search}
        onChange={HandleSearchInput}
        onClick={(e) => {
          HandleEditClient(e)
          HandleChangeTab('maintenance')
        }}
        conditionToShowResults={true}
      />

      {currentTab === "default" && (
        <ClientsForm
          clientsData={clientsData}
          clientLoading={clientLoading}
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
