import useAuth from "../../../hooks/useAuth";
import useGetData from "../../../hooks/useGetData";
import { useEffect, useState } from "react";

const useGetHistory = () => {
  const [search, setSearch] = useState(false);
  const [filters, setFilters] = useState({})
  // const [endpoint, setEndpoint] = useState("")

  const { auth } = useAuth();
  const companyId = auth?.company?.id

  let endpoint = `/quote/company/${companyId}/getall`

  function getTheCorrectSignToEndpoint() {
    if (!endpoint.includes('?')) {
      endpoint += `?`
    } else {
      endpoint += `&`
    }
  }

  function conditionsInEnpoint() {
    if (filters?.from !== '') {
      getTheCorrectSignToEndpoint()
      endpoint += `date_from`
      console.log(endpoint);
    }

    if (filters?.to !== '') {
      getTheCorrectSignToEndpoint()
      endpoint += `date_to`
    }
    return endpoint
  }

  console.log(endpoint);
  

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
    return setSearch(true)
  }, [filters])

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, getFiltersFromComponent, ResetValue, HandleSearch };
};

export default useGetHistory;
