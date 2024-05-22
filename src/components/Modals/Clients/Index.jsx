import React, { useEffect, useRef } from "react";
import Catalog from "./components/Catalog";
import useGetClients from "../../../hooks/useGetClients";
import useToggles from "./hooks/useToggles";
import useInputData from "./hooks/useInputData";
import useResults from "./hooks/useResults";

const Index = ({ onClick }) => {

  const onClickEvent = onClick ? onClick : null

  const searchRef = useRef()
  const dropdownRef = useRef()

  const { data, HandleSearch } = useGetClients()
  const { inputData, HandleInputData } = useInputData()

  const { data: results } = useResults({inputData, clientData: data}) 

  const { toggles, HandleToggleCatalog } = useToggles()

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      HandleToggleCatalog(false)
    }
  };

  useEffect(() => {
    HandleSearch()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Catalog
      searchRef={searchRef}
      dropdownRef={dropdownRef}
      clientData={data}
      inputData={inputData}
      results={results}
      toggles={toggles}
      onClick={onClick}
      onClickEvent={onClickEvent}
      HandleToggleCatalog={HandleToggleCatalog}
      HandleInputData={HandleInputData}
    />
  );
};

export default Index;
