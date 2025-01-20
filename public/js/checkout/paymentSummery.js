import { cart } from "/js/cart-class.js";
import { getProduct } from "/js/products.js";
import { getDeliveryOption } from "/js/deliveryOptions.js";
import { formatCurrency } from "/js/money.js";
import { addOrder } from "../order.js";
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents * cartItem.quantity;
  });
  const shippingPrice = formatCurrency(shippingPriceCents);
  const totalPayment = formatCurrency(productPriceCents + shippingPriceCents);
  return { productPriceCents, shippingPrice, totalPayment };
}
document
  .querySelector(".js-place-order")
  .addEventListener("click", async () => {
    try {
      const response = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      const order = await response.json();
      addOrder(order);
    } catch (error) {
      console.log(`Unexpected error, Try again later`,error);
      alert(error);
    }
    // window.location.href = 'orders.html';
  });
