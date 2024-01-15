import useGetData from "../../../hooks/useGetData";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const useGetCategories = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState(true);

  const companyId = auth?.company?.id;

  const endpoint = `/category/company/${companyId}/getall`;

  const { data, loading } = useGetData({
    url: endpoint,
    search: search,
  });

  function HandleSearch() {
    return setSearch(true);
  }

  function getOnlyNames() {
    if (!data) return [];
    const onlyNames = data?.map((d) => {
      return { id: d?.id, name: d?.name };
    });
    return onlyNames;
  }

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, getOnlyNames, HandleSearch };
};

export default useGetCategories;
