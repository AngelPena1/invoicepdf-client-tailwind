import useGetData from "../../../hooks/useGetData";
import { useEffect, useState } from "react";

const useGetImgProduct = () => {
  const [productId, setProductId] = useState();
  const [search, setSearch] = useState(false);

  const endpoint = `/product/${productId}/img`;

  const { data, loading } = useGetData({
    url: endpoint,
    search: search,
  })

  function HandleSearch(data) {
    setProductId(data?.productId);
    return setSearch(true);
  }

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, HandleSearch };
};

export default useGetImgProduct;
