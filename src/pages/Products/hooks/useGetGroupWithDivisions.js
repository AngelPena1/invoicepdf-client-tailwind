import useGetData from "../../../hooks/useGetData";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const useGetGroupWithDivisions = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState(true);

  const companyId = auth?.company?.id;

  const endpoint = `/group/company/${companyId}/getall/subdivision`;

  const { data, loading } = useGetData({
    url: endpoint,
    search: search,
  });

  function HandleSearch() {
    return setSearch(true);
  }

  function getOnlyNames(array) {
    if (!array) return [];
    const onlyNames = array?.map((d) => {
      return { id: d?.id, name: d?.name };
    });
    return onlyNames;
  }

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, getOnlyNames, HandleSearch };
};

export default useGetGroupWithDivisions;
