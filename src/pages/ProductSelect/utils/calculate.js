function calculate({ selectedProducts, discount }) {
  let results = {
    subtotal: 0,
    itbis: 0,
    total: 0,
    cost: 0
  };

  selectedProducts.forEach((product) => {
    results.subtotal += parseFloat(
      parseFloat(product?.price) * product?.quantity
    );
    results.cost += parseFloat(
      parseFloat(product?.cost) * product?.quantity
    );
  });

  results.subtotal = results.subtotal - discount
  results.itbis = results?.subtotal * 0.18;
  results.total = results?.subtotal + results?.itbis;

  return results;
}
export default calculate;
