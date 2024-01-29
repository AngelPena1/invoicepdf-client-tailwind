import toast from "react-hot-toast";
import usePostData from "../../../hooks/usePostData";
import { useEffect, useState } from "react";

const useGetImgProduct = ({ selectedProducts }) => {
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
    if (!(selectedProducts?.length > 0))
      return toast.error("Necesitas seleccionar al menos un producto.");
    const productsId = selectedProducts.map((product) => product?.id);
    setProductsArrayId(productsId);
    HandleAlreadyFetch(true);
    return setSearch(true);
  }

  function HandleAlreadyFetch(bool) {
    setAlreadyFetch(bool);
  }

  useEffect(() => {
    return setSearch(false);
  }, [data]);

  return { data, loading, alreadyFetch, ResetValue, HandleAlreadyFetch, HandleSearch };
};

export default useGetImgProduct;
