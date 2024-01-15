function formatInteger(value) {
  if (!value) return "0";

  const formatedNumber = parseFloat(value).toLocaleString("en-US");

  return formatedNumber;
}

module.exports = { formatInteger };
