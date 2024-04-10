import { useState, useEffect } from "react";
import calculate from "../utils/calculate";

const useGetTotal = ({ selectedProducts, discount, refreshPrice }) => {
  const [totals, setTotals] = useState({
    price: 0,
    cost: 0,
    itbis: 0,
    withITBIS: 0,
  });

  function HandleTotals() {
    const result = calculate({ selectedProducts, discount });

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
  }, [selectedProducts, discount, refreshPrice]);

  return { totals };
};

export default useGetTotal;
