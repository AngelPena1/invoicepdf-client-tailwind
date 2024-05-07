import { useState, useEffect } from "react";
import calculate from "../utils/calculate";

const useGetTotal = ({ hasTips, selectedProducts, isDollar, discount, refreshPrice }) => {
  const [totals, setTotals] = useState({
    price: 0,
    cost: 0,
    itbis: 0,
    tips: 0,
    withITBIS: 0,
  });

  function HandleTotals() {
    const result = calculate({ selectedProducts, isDollar, discount });

    return setTotals({
      discount: result?.discount,
      cost: result?.cost,
      price: result?.subtotal,
      itbis: result?.subtotal * 0.18,
      tips: result?.subtotal * 0.10,
      withITBIS: !hasTips ? result?.total : result?.total + result?.subtotal * 0.10,
    });
  }

  useEffect(() => {
    HandleTotals();
    // eslint-disable-next-line
  }, [selectedProducts, isDollar, discount, refreshPrice, hasTips]);

  return { totals };
};

export default useGetTotal;
