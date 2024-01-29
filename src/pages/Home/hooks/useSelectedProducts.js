import { useState } from "react";

const useSelectedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  function HandleSelectedProducts(value) {
    const localArray = [...selectedProducts];
    localArray.push({ ...value, quantity: 1 });
    return setSelectedProducts(localArray);
  }

  function HandleQuantityProducts({ productId, bool }) {
    const newArray = selectedProducts.map((product) => {
      if (!(product?.id === productId)) return product;
      const whenIsTrue = product?.quantity + 1;
      const whenIsFalse =
        product?.quantity > 1 ? product?.quantity - 1 : product?.quantity;
      return { ...product, quantity: bool ? whenIsTrue : whenIsFalse };
    });
    return setSelectedProducts(newArray);
  }

  function HandleDeleteProduct({ productId }) {
    const newArray = selectedProducts.filter((product) => {
      if (!(product?.id === productId)) return product;
    });
    return setSelectedProducts(newArray);
  }

  function clearSelectedProducts() {
    return setSelectedProducts([]);
  }

  return {
    selectedProducts,
    clearSelectedProducts,
    HandleSelectedProducts,
    HandleQuantityProducts,
    HandleDeleteProduct,
  };
};

export default useSelectedProducts;
