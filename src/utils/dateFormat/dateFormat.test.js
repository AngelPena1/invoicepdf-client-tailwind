const { dayAndMonthFormat, fullDateFormat, getDateFromSelect } = require("./dateFormat");

test("Properly add day/month", () => {
  const result = dayAndMonthFormat(new Date("2023-04-25"));
  expect(result).toBe("25/04");
});

test("Properly get year/month/day", () => {
  const result = fullDateFormat(new Date("2023-04-25"));
  expect(result).toBe("2023-04-25");
});

test("Properly get year/month/day 2", () => {
  const result = fullDateFormat(new Date("2023-03-01"));
  expect(result).toBe("2023-03-01");
});

test("Properly get yesterday date", () => {
  const result = getDateFromSelect("Ayer");
  expect(result).toBe("2023-09-29");
});