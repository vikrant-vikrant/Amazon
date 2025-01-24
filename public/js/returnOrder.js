import { cart } from "/js/cart-class.js";
import { getProduct } from "./products.js";
import { calculateDeliveryDate } from "./deliveryOptions.js";
renderCartSummary();
function renderCartSummary() {
  let cartSummaryHtml = "";
  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const dateString = calculateDeliveryDate(7);
    cartSummaryHtml += `
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
          <button>Track package</button>
        </div>`;
  });
  document.querySelector(".order-details-grid").innerHTML = cartSummaryHtml;
}
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
