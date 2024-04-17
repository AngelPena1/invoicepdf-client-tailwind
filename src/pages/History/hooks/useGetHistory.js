import useAuth from "../../../hooks/useAuth";
import useGetData from "../../../hooks/useGetData";
import { useEffect, useState } from "react";

const useGetHistory = () => {
  const { auth } = useAuth();
  const companyId = auth?.company?.id
  const endpoint_base = `/quote/company/${companyId}/getall`
  
  const [search, setSearch] = useState(false);
  const [filters, setFilters] = useState({})
  const [endpoint, setEndpoint] = useState(endpoint_base)
  
  function getTheCorrectSignToEndpoint(endpoint_local) {
    if (!endpoint_local.includes('?')) {
      return `?`
    } else {
      return `&`
    }
  }

  function conditionsInEnpoint() {
    let endpoint_local = endpoint_base
    
    if (filters?.from) {
      endpoint_local += `${getTheCorrectSignToEndpoint(endpoint_local)}date_from=${filters?.from}`
    }

    if (filters?.to) {
      endpoint_local += `${getTheCorrectSignToEndpoint(endpoint_local)}date_to=${filters?.to}`
    }

    if (filters?.from_to ) {
      endpoint_local += `${getTheCorrectSignToEndpoint(endpoint_local)}date_from_to=${filters?.from_to}`
    }

    if (filters?.client) {
      endpoint_local += `${getTheCorrectSignToEndpoint(endpoint_local)}client_id=${filters?.client?.id}`
    }

    setEndpoint(endpoint_local)
  }

  const { data, loading, ResetValue } = useGetData({
    url: endpoint,
    search
  });

  function HandleSearch() {
    return setSearch(true);
  }

  function getFiltersFromComponent(filters) {
    return setFilters(filters);
  }

  useEffect(() => {
    conditionsInEnpoint()
    //eslint-disable-next-line
  }, [filters])

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, getFiltersFromComponent, ResetValue, HandleSearch };
};

export default useGetHistory;
