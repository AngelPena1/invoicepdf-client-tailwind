import React from "react";
import HomeForm from "./components/HomeForm";
import useInputData from "./hooks/useInputData";
import useGetClients from "../../hooks/useGetClients";
import { useEffect } from "react";

const Index = () => {
  const {
    companyInputData,
    clientInputData,
    ResetInputValues,
    HandleInputData,
  } = useInputData();

  const { data: clientsData, HandleSearch: HandleSearchClient } =
    useGetClients();

    console.log(clientsData);

  useEffect(() => {
    HandleSearchClient();
  }, []);

  return (
    <HomeForm
      clientsData={clientsData}
      companyInputData={companyInputData}
      clientInputData={clientInputData}
      HandleInputData={HandleInputData}
    />
  );
};

export default Index;
