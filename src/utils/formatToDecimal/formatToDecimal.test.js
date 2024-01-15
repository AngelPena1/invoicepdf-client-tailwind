const { formatToDecimal } = require("./formatToDecimal");

test("properly add '.00' to an Integer", () => {
  const result = formatToDecimal(100);
  expect(result).toBe("100.00");
});

test("properly remove decimals", () => {
  const result = formatToDecimal(10110.01321);
  expect(result).toBe("10,110.01");
});

test("properly add '000,000' and '.00' to an Integer", () => {
  const result = formatToDecimal(1000);
  expect(result).toBe("1,000.00");
});

test("properly add two decimals '.00 when is only one '.0", () => {
  const result = formatToDecimal(1000.1);
  expect(result).toBe("1,000.10");
});

test("When the input is 0, must return 0", () => {
  const result = formatToDecimal(0);
  expect(result).toBe("0.00");
});

test("When the input is 0, must return 0", () => {
  const result = formatToDecimal(0);
  expect(result).toBe("0.00");
});
