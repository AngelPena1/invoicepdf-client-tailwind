import useGetData from "../../../../hooks/useGetData";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";

const useGetProductSearch = ({ limit }) => {
  const { auth } = useAuth();
  const companyId = auth?.company?.id;
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(false);

  const endpoint = `product/company/${companyId}/get/search/:search/page/${page}/limit/${limit}`;

  const { data, loading } = useGetData({
    url: endpoint,
    search: search,
  });

  function HandlePage(page) {
    return setPage(page), setSearch(true);
  }

  function HandleSearch() {
    return setSearch(true);
  }

  useEffect(() => {
    if (!data?.rows?.length > 0) return;
    setProductsData(data?.rows);
  }, [data]);

  return { data, setProductsData, productsData, loading: loading, HandleSearch, HandlePage };
};

export default useGetProductSearch;
