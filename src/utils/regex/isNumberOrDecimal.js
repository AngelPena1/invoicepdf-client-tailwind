export function isNumberOrDecimal(inputValue) {
  const regex = /^\d{0,9}(\.\d{0,2})?$/
  return regex.test(inputValue);
}

export function isDecimalOrPorcentage(inputValue) {
  const regex = /^\d{0,9}(\.\d{0,2})?%?$/
  return regex.test(inputValue);
}


