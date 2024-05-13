function calculate({ selectedProducts, isDollar, discount, hasItbis, hasTips }) {
  let results = {
    subtotal: 0,
    itbis: 0,
    discount: 0,
    tips: 0,
    total: 0,
    cost: 0,
  };

  let localDiscount = discount;

  selectedProducts.forEach((product) => {
    results.subtotal += parseFloat(
      (isDollar ? parseFloat(product?.price_us) : parseFloat(product?.price)) *
        product?.quantity
    );
    results.cost += parseFloat(parseFloat(product?.cost) * product?.quantity);
  });

  if (localDiscount?.includes("%")) {
    localDiscount = localDiscount?.split("%")[0];
    localDiscount = localDiscount / 100;
    localDiscount = results?.subtotal * localDiscount;
  }

  results.discount = localDiscount;
  results.subtotal = results.subtotal - localDiscount;
  results.tips = hasTips ? results?.subtotal * 0.10 : 0
  results.itbis = hasItbis ? results?.subtotal * 0.18 : 0;
  results.total = results?.subtotal + results?.itbis + results?.tips;

  return results;
}
export default calculate;
