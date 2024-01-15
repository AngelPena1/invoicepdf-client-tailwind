function formatToDecimal(value) {
  if (!value) return "0.00";
  const roundedNumber = value?.toFixed(2);
  const formatedNumber = parseFloat(roundedNumber).toLocaleString("en-US");

  if (!formatedNumber.includes(".")) return `${formatedNumber}.00`;

  const checkForTwoDecimals = formatedNumber.split(".")[1];
  if (checkForTwoDecimals.length === 1) return `${formatedNumber}0`;

  return formatedNumber;
}

module.exports = { formatToDecimal };
