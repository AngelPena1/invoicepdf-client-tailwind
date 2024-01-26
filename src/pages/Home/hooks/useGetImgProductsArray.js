import usePostData from "../../../hooks/usePostData";
import { useEffect, useState } from "react";

const useGetImgProduct = ({ selectedProducts }) => {
  const [productsArrayId, setProductsArrayId] = useState([]);
  const [alreadyFetch, setAlreadyFetch] = useState(false);
  const [search, setSearch] = useState(false);

  const endpoint = `/product/images-array`;

  console.log(productsArrayId);

  const { data, loading } = usePostData({
    url: endpoint,
    search: search,
    bodyData: productsArrayId,
  });

  function HandleSearch() {
    const productsId = selectedProducts.map((product) => product?.id);
    setProductsArrayId(productsId);
    HandleAlreadyFetch()
    return setSearch(true);
  }

  function HandleAlreadyFetch() {
    setAlreadyFetch(true)
  }

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, alreadyFetch, HandleAlreadyFetch, HandleSearch };
};

export default useGetImgProduct;
