import { formatCurrency } from "../public/js/money.js";

// describe("test suite: formateCurrency", () => {
//   it("converts cents into dollars", () => {
//     expect(formatCurrency(2095)).toEqual("20.95");
//   });
//   it("works with zero", () => {
//     expect(formatCurrency(0)).toEqual("0.00");
//   });
//   it("round up to the nearest cent", () => {
//     expect(formatCurrency(2000.5)).toEqual("20.01");
//   });
// });

describe("A suite is just a function", function () {
  let a = 1;

  it("and so is a spec", function () {
    a = true;

    expect(a).toBe(true);
  });
});
describe("A suite is just a function", function () {
  let a = 1;

  it("and so is a spec", function () {
    a = true;

    expect(a).toBe(true);
  });
});
if(formatCurrency(2090)==='20.90'){
  console.log('passed');
}else{
  console.log('failed');
};

if(formatCurrency(0)==='0.00'){
  console.log("passed");
}else{
  console.log('failed');
};
if(formatCurrency(2000.23)==='20.00'){
  console.log("passed");
}else{
  console.log('failed');
};