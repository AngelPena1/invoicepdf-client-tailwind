import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useGetData from "./useGetData";

const useGetProductsLimit = ({ limit, searchProduct }) => {
  const { auth } = useAuth();
  const companyId = auth?.company?.id;
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(false);

  const endpoint = `product/company/${companyId}/getall-no_img/page/${page}/limit/${limit}`;

  const endpoint_search = `product/company/${companyId}/get/search/${searchProduct}/page/${page}/limit/${limit}`;

  const switchIfSearchHasValue = searchProduct ? endpoint_search : endpoint;

  const { data, loading } = useGetData({
    url: switchIfSearchHasValue,
    search: search,
  });

  function HandlePage(page) {
    return setPage(page), setSearch(true);
  }

  function HandleSearch() {
    return setSearch(true);
  }

  useEffect(() => {
    HandleSearch()
  }, [searchProduct])

  useEffect(() => {
    setSearch(false);
    if (!data?.rows?.length > 0) return;
    setProductsData(data?.rows);
  }, [data]);

  return {
    data,
    page,
    setProductsData,
    productsData,
    loading,
    HandleSearch,
    HandlePage,
  };
};

export default useGetProductsLimit;
