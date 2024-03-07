import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetData from "../../../hooks/useGetData";

const useSelectedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [localId, setLocalId] = useState(1);

  const { quote_id } = useParams();
  const endpoint = `/quote/get/${quote_id}`

  const { data: quoteEdit, loading } = useGetData({
    url: endpoint
  })
 

  function HandleLocalId() {
    return setLocalId(localId + 1);
  }

  function HandleSelectedProducts(value) {
    const localArray = [...selectedProducts];
    localArray.push({ ...value, quantity: 1, local_id: localId });
    return setSelectedProducts(localArray), HandleLocalId();
  }

  function HandleQuantityProducts({ local_id, bool }) {
    const newArray = selectedProducts.map((product) => {
      if (!(product?.local_id === local_id)) return product;
      const whenIsTrue = product?.quantity + 1;
      const whenIsFalse =
        product?.quantity > 1 ? product?.quantity - 1 : product?.quantity;
      return { ...product, quantity: bool ? whenIsTrue : whenIsFalse };
    });
    return setSelectedProducts(newArray);
  }

  function HandleDeleteProduct({ local_id }) {
    const newArray = selectedProducts.filter((product) => {
      if (!(product?.local_id === local_id)) return product;
    });
    return setSelectedProducts(newArray);
  }

  function clearSelectedProducts() {
    return setSelectedProducts([]);
  }

  useEffect(() => {
    // console.log(quoteEdit);
    // if(!quoteEdit?.length > 0) return
    // const json_products = JSON.parse(quoteEdit[0]?.selected_products_json)
    // console.log(json_products);
    // setSelectedProducts()
  }, [quoteEdit])

  return {
    selectedProducts,
    clearSelectedProducts,
    HandleSelectedProducts,
    HandleQuantityProducts,
    HandleDeleteProduct,
  };
};

export default useSelectedProducts;
