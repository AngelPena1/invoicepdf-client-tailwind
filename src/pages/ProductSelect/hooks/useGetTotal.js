import { useState, useEffect } from "react";
import calculate from "../utils/calculate";

const useGetTotal = ({ selectedProducts, discount }) => {
  const [totals, setTotals] = useState({
    price: 0,
    cost: 0,
    itbis: 0,
    withITBIS: 0
  });

  function HandleTotals() {
    const result = calculate({ selectedProducts, discount });

    return setTotals({
      cost: result?.cost,
      price: result?.subtotal,
      itbis: result?.subtotal * 0.18,
      withITBIS: result?.total
    });
  }

  useEffect(() => {
    HandleTotals();
  }, [selectedProducts, discount]);

  return { totals };
};

export default useGetTotal;
