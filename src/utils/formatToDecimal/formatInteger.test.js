const { formatInteger } = require("./formatInteger");

test("properly add , to the integer", () => {
  const result = formatInteger(1000);
  expect(result).toBe("1,000");
});

test("properly add , to the integer", () => {
  const result = formatInteger(1000000);
  expect(result).toBe("1,000,000");
});