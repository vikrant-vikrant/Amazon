import { formatCurrency } from "../public/js/money.js";
import { Cart } from "../public/js/cart-class.js";

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

describe("Cart Class", function () {
  let cart;
  const testProductId = "19c6a64a-5463-4d45-9af8-e41140a4100c";

  // Mock localStorage
  beforeEach(function () {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, "setItem");

    const quantitySelector = document.createElement("input");
    quantitySelector.classList.add(`js-quantity-selector-${testProductId}`);
    quantitySelector.value = 1; // Default quantity for testing
    document.body.appendChild(quantitySelector);

    cart = new Cart("test-cart");
  });

  it("should add a new item to the cart", function () {
    cart.addToCart(testProductId);

    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe(testProductId);
    expect(cart.cartItems[0].quantity).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("should increase quantity if item already exists", function () {
    cart.addToCart(testProductId);
    cart.addToCart(testProductId);

    expect(cart.cartItems.length).toBe(1); // Still one item
    expect(cart.cartItems[0].quantity).toBe(2); // Quantity increased
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  // it("should handle multiple different products", function () {
  //   cart.addToCart("a45cfa0a-66d6-4dc7-9475-e2b01595f7d7");
  //   cart.addToCart("10ed8504-57db-433c-b0a3-fc71a35c88a1");

  //   expect(cart.cartItems.length).toBe(2);
  //   console.log(cart.cartItems)
    // expect(cart.cartItems[0].productId).toBe("a45cfa0a-66d6-4dc7-9475-e2b01595f7d7");
    // expect(cart.cartItems[1].productId).toBe("10ed8504-57db-433c-b0a3-fc71a35c88a1");
    // expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  // });
});

