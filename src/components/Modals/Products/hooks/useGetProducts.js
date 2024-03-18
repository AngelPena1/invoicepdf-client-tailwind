import useGetData from "../../../../hooks/useGetData";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";

const useGetProducts = ({ limit, searchProduct, inputData }) => {
  const { auth } = useAuth();
  const companyId = auth?.company?.id;
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(false);

  const endpoint = `product/company/${companyId}/getall-no_img/page/${page}/limit/${limit}/${inputData?.brand_selected}/${inputData?.category_selected}/${inputData?.subcategory_selected}/${inputData?.finishes_selected}`;

  const endpoint_search = `product/company/${companyId}/get/search/${searchProduct}/page/${page}/limit/${limit}/${inputData?.brand_selected}`;

  const switchIfSearchHasValue = searchProduct ? endpoint_search : endpoint;

  const { data, loading } = useGetData({
    url: switchIfSearchHasValue,
    search: search,
  });

  function HandlePage(page) {
    setPage(page) 
    return setSearch(true);
  }

  function HandleSearch() {
    return setSearch(true);
  }

  useEffect(() => {
    setSearch(false);
    if (!data?.rows?.length > 0) return;
    setProductsData(data?.rows);
    // eslint-disable-next-line
  }, [data]);

  return {
    data,
    page,
    setProductsData,
    productsData,
    loading: loading,
    HandleSearch,
    HandlePage,
  };
};

export default useGetProducts;
