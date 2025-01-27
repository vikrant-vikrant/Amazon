import { cart } from "/js/cart-class.js";
import { getProduct } from "./products.js";
import { calculateDeliveryDate } from "./deliveryOptions.js";
renderCartSummary();
export function renderCartSummary() {
  let orderSummaryHtml = "";
  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const dateString = calculateDeliveryDate(7);
    orderSummaryHtml += `
      <div class="cart-item-details-grid">
        <div class="orderCart-item-details">
          <div class="orderProduct-name">
            ${matchingProduct.name}
          </div>
          <div class="orderProduct-quantity">
            <span>
              Quantity : <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
          </div>
        </div>
        <img class="orderProduct-image"
          src="${matchingProduct.image}">
      </div>`;
  });
  const orderDetailsGrid = document.querySelector(".js-order-summary");
  if (orderDetailsGrid) {
    document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;
  }
}

document.querySelector(
  ".page-title"
).innerHTML = `Arriving on ${calculateDeliveryDate(3)}`;
if (cart.calculateCartQuantity() === 0) {
  document.querySelector(".js-cart-quantity").innerHTML = "";
} else {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.calculateCartQuantity();
}
