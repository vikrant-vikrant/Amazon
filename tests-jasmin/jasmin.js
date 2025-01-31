import { formatCurrency } from "../public/js/money.js";

describe("A suite is just a function", function () {
  let a;

  it("test suite : formateCurrency", function () {
    expect(formatCurrency(2000.4)).toBe('20.00');
    expect(formatCurrency(-2000)).toBe('-20.00');
  });
});
