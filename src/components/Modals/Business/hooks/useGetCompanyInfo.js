import { useEffect, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import useAuth from "../../../../hooks/useAuth";

const useGetCompanyInfo = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState(true);

  const companyId = auth?.company?.id;

  const endpoint = `/company/get/${companyId}`;

  const { data, loading } = useGetData({
    url: endpoint,
    search: search,
  })

  function HandleSearch() {
    return setSearch(true);
  }

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, HandleSearch };
};

export default useGetCompanyInfo 
