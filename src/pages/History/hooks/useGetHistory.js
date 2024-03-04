import useAuth from "../../../hooks/useAuth";
import useGetData from "../../../hooks/useGetData";
import { useEffect, useState } from "react";

const useGetHistory = () => {
  const [search, setSearch] = useState(false);

  const { auth } = useAuth();
  const companyId = auth?.company?.id

  const endpoint = `/quote/company/${companyId}/getall`;

  const { data, loading, ResetValue } = useGetData({
    url: endpoint,
    search
  });

  function HandleSearch() {
    return setSearch(true);
  }
 
  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, ResetValue, HandleSearch };
};

export default useGetHistory;
