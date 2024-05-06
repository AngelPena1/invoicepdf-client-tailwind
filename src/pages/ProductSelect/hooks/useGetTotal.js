import { useState, useEffect } from "react";
import calculate from "../utils/calculate";

const useGetTotal = ({ selectedProducts, isDollar, discount, refreshPrice }) => {
  const [totals, setTotals] = useState({
    price: 0,
    cost: 0,
    itbis: 0,
    withITBIS: 0,
  });

  function HandleTotals() {
    const result = calculate({ selectedProducts, isDollar, discount });

    return setTotals({
      discount: result?.discount,
      cost: result?.cost,
      price: result?.subtotal,
      itbis: result?.subtotal * 0.18,
      withITBIS: result?.total,
    });
  }

  useEffect(() => {
    HandleTotals();
    // eslint-disable-next-line
  }, [selectedProducts, isDollar, discount, refreshPrice]);

  return { totals };
};

export default useGetTotal;
