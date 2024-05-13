import useGetData from "./useGetData";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

const useGetProducts = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState(true);

  const companyId = auth?.company?.id;

  const endpoint = `/product/company/${companyId}/getall-no_img`;

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

export default useGetProducts;
