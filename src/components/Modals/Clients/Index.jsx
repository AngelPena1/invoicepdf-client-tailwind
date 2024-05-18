import React, { useEffect, useRef } from "react";
import Catalog from "./components/Catalog";
import useGetClients from "../../../hooks/useGetClients";
import useToggles from "./hooks/useToggles";

const Index = ({ onHide, onClick }) => {

  const searchRef = useRef()
  const dropdownRef = useRef()
  const { data, HandleSearch } = useGetClients()

  const { toggles, HandleToggleCatalog } = useToggles()
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      HandleToggleCatalog(false)
    }
  };

  useEffect(() => {
    HandleSearch()
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
      toggles={toggles}
      HandleToggleCatalog={HandleToggleCatalog}
    />
  );
};

export default Index;
