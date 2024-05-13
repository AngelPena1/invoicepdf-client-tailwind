import usePostData from "../../../../hooks/usePostData";
import { useEffect, useState } from "react";

const useGetImgProduct = ({ productsData, setProductsData }) => {
  const [productsArrayId, setProductsArrayId] = useState([]);
  const [alreadyFetch, setAlreadyFetch] = useState(false);
  const [search, setSearch] = useState(false);

  const endpoint = `/product/images-array`;

  const { data, loading, ResetValue } = usePostData({
    url: endpoint,
    search: search,
    bodyData: productsArrayId,
  });

  function HandleSearch() {
    const productsId = productsData.map((product) => product?.id);
    setProductsArrayId(productsId);
    HandleAlreadyFetch(true);
    return setSearch(true);
  }

  function HandleAddImgProductToArray() {
    if (!data) return;
    let localProducts = productsData;
    localProducts = localProducts.map((product) => {
      const image = data.filter((p) => {
        return p?.id === product?.id;
      })[0]?.image;
      return { ...product, image };
    });
    return setProductsData(localProducts);
  }

  function HandleAlreadyFetch(bool) {
    setAlreadyFetch(bool);
  }

  useEffect(() => {
    HandleAddImgProductToArray();
    return setSearch(false);
  }, [data]);

  return {
    data,
    loading,
    alreadyFetch,
    ResetValue,
    HandleSearch,
    HandleAlreadyFetch,
  };
};

export default useGetImgProduct;
