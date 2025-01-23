import { cart } from "/js/cart-class.js";
if (cart.calculateCartQuantity() === 0) {
    document.querySelector(".js-cart-quantity").innerHTML = "";
  } else {
    document.querySelector(".js-cart-quantity").innerHTML =
      cart.calculateCartQuantity();
  }