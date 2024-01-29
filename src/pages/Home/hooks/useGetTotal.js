import { useState, useEffect } from "react";
import calculate from "../utils/calculate";

const useGetTotal = ({ selectedProducts }) => {
  const [totals, setTotals] = useState({
    price: 0,
    cost: 0,
  });

  function HandleTotals() {
    const result = calculate({ selectedProducts });
    return setTotals({
      cost: result?.cost,
      price: result?.subtotal,
    });
  }

  useEffect(() => {
    HandleTotals();
  }, [selectedProducts]);

  return { totals };
};

export default useGetTotal;
