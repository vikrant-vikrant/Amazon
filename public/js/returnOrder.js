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
        <img class="orderProduct-image"
          src="${matchingProduct.image}">
        <div class="orderCart-item-details">
          <div class="orderProduct-name">
            ${matchingProduct.name}
          </div>
          <div class="delivery-date">
            Arriving on : ${dateString}
          </div>
          <div class="orderProduct-quantity">
            <span>
              Quantity : <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
          </div>
          <button class="buy-again">
            <img src="/images/icons/buy-again.png" alt="" />
            <span>Buy it again</span>
          </button> 
        </div>
        <div>
          <button class="orderTrack">
            <i class="fa-solid fa-map-location-dot"></i><span><a href="/tracking">Track package</a></span>
          </button>
        </div>
      </div>`;
  });
  const orderDetailsGrid = document.querySelector(".js-order-summary");
  if (orderDetailsGrid) {
    document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;
  }
}
document.querySelectorAll(".buy-again").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("add ot cart");
  });
});
document.querySelectorAll(".orderTrack").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("track order");
  });
});
if (cart.calculateCartQuantity() === 0) {
  document.querySelector(".js-cart-quantity").innerHTML = "";
} else {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.calculateCartQuantity();
}
