import { formatCurrency } from "../public/js/money.js";
describe("Test suite : formatCurrency", () => {
  it("Converts cents into dollars", () => {
    expect(formatCurrency(2000)).toEqual("20.00");
  });
  it("Works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("round up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});

