import { cart } from "/js/cart-class.js";
import { getProduct } from "./products.js";
import { calculateDeliveryDate } from "./deliveryOptions.js";
// renderCartSummary();
export function renderCartSummary() {
  let orderSummaryHtml = "";
  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const dateString = calculateDeliveryDate(7);
    orderSummaryHtml += `
    <div class="product-img">
          <img src=/${matchingProduct.image} alt="img" />
        </div>
        <div class="product-info">
          <b>${matchingProduct.name}</b>
          <p>Arriving on : ${dateString}</p>
          <p>Quantity : ${matchingProduct.quantity}</p>
          <button>
            <img src="/images/icons/buy-again.png" alt="" />
            <span>Buy it again</span>
          </button>
        </div>
        <div class="track">
          <button><i class="fa-solid fa-map-location-dot"></i>&nbsp;&nbsp;&nbsp;Track package</button>
        </div>`;
  });
  const orderDetailsGrid = document.querySelector(".order-details-grid");
  if (orderDetailsGrid) {
    orderDetailsGrid.innerHTML = orderSummaryHtml;
  };
};
document.querySelectorAll(".product-info button").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("add ot cart");
  });
});
document.querySelectorAll(".track").forEach((button) => {
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
