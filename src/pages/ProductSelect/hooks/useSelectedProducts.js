import { useState, useEffect } from "react";
import { isNumberOrDecimal } from "../../../utils/regex/isNumberOrDecimal";

const useSelectedProducts = ({ quoteData, quoteHasData }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [refreshPrice, setRefreshPrice] = useState(false)
  const [localId, setLocalId] = useState(1);

  function HandlePriceChange(event, index) {
    const {value} = event?.target
    if(!isNumberOrDecimal(value)) return null
    let localArray = selectedProducts
    localArray[index] = {...selectedProducts[index], price: value}
    setSelectedProducts(localArray)
    return setRefreshPrice(!refreshPrice)
  }
  
  function HandleLocalId() {
    return setLocalId(localId + 1);
  }

  function HandleSelectedProducts(value) {
    const localArray = [...selectedProducts];
    localArray.push({ ...value, quantity: 1, local_id: localId });
    setSelectedProducts(localArray)
    return HandleLocalId();
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
      if (!(product?.local_id === local_id)) {
        return product;
      }
      return null
    });
    return setSelectedProducts(newArray);
  }

  function clearSelectedProducts() {
    return setSelectedProducts([]);
  }

  useEffect(() => {
    const getQuote = quoteHasData ? JSON.parse(quoteData[0]?.selected_products_json) : []
    setSelectedProducts(getQuote)
    // eslint-disable-next-line
  }, [quoteHasData])

  return {
    selectedProducts,
    refreshPrice,
    clearSelectedProducts,
    HandlePriceChange,
    HandleSelectedProducts,
    HandleQuantityProducts,
    HandleDeleteProduct,
  };
};

export default useSelectedProducts;
