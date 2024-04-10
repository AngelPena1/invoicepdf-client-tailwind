function calculate({ selectedProducts, discount }) {
  let results = {
    subtotal: 0,
    itbis: 0,
    discount: 0,
    total: 0,
    cost: 0
  };
  let localDiscount = discount

  selectedProducts.forEach((product) => {
    results.subtotal += parseFloat(
      parseFloat(product?.price) * product?.quantity
    );
    results.cost += parseFloat(
      parseFloat(product?.cost) * product?.quantity
    );
  });


  if (localDiscount?.includes('%')) {
    localDiscount = localDiscount?.split('%')[0]
    localDiscount = localDiscount / 100
    localDiscount = results?.subtotal * localDiscount
  }
  
  results.discount = localDiscount
  results.subtotal = results.subtotal - localDiscount
  results.itbis = results?.subtotal * 0.18;
  results.total = results?.subtotal + results?.itbis;

  return results;
}
export default calculate;
