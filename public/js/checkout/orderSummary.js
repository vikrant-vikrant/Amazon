import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "/js/cart.js";
import { getProduct } from "/js/products.js";
import { formatCurrency } from "/js/money.js";
import { deliveryOptions, calculateDeliveryDate } from "/js/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummery.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const dateString = calculateDeliveryDate(7);
    cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${
                  matchingProduct.id
                }">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link js-update-link link-primary" data-product-id="${
                matchingProduct.id
              }">
                Update
              </span>
              <input type = number ; class = "quantity-input js-quantity-input-${
                matchingProduct.id
              }"></input>
              <span class = "save-quantity-link link-primary js-save-link" data-product-id="${
                matchingProduct.id
              }">save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                matchingProduct.id
              }">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((option) => {
      const dateString = calculateDeliveryDate(option.deliveryDays);
      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)} `;
      const isChecked = option.id === cartItem.deliveryOptionsId;
      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id="${deliveryOptions.id}">
      
        <input type="radio"
        ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
          ${dateString}
          </div>
          <div class="delivery-option-price">
          ${priceString} Shipping
          </div>
        </div>
      </div>
      `;
    });
    return html;
  }
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      renderOrderSummary();
    });
  });
  updateCartQuantity();
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    if (cartQuantity === 0) {
      document.querySelector(".js-return-to-home-link").innerHTML = `Add Items`;
      document.querySelector(
        ".page-title"
      ).innerHTML = `Your Amazon Cart is empty.`;
      document.querySelector(".js-cart-quantity").innerHTML = "";
      document.querySelector(".js-cart-summary-quantity").innerHTML =
        "Items (0) :";
      document.querySelector(".js-cart-summary-total").innerHTML = "$0.00";
      document.querySelector(".js-total-before-tax").innerHTML = "$0.00";
      document.querySelector(".js-extimated-tax").innerHTML = "$0.00";
      document.querySelector(".js-order-total").innerHTML = "$0.00";
    } else {
      document.querySelector(
        ".js-return-to-home-link"
      ).innerHTML = `${cartQuantity} Items`;
      document.querySelector(".page-title").innerHTML = `Review your order`;
      document.querySelector(".js-cart-quantity").innerHTML =
        calculateCartQuantity();
      document.querySelector(
        ".js-cart-summary-quantity"
      ).innerHTML = `Items (${calculateCartQuantity()}) :`;
      document.querySelector(
        ".js-cart-summary-total"
      ).innerHTML = `$${formatCurrency(
        renderPaymentSummary().productPriceCents
      )}`;
      document.querySelector(
        ".js-total-before-tax"
      ).innerHTML = `$${formatCurrency(
        renderPaymentSummary().productPriceCents
      )}`;
      document.querySelector(
        ".js-extimated-tax"
      ).innerHTML = `$${formatCurrency(
        renderPaymentSummary().productPriceCents / 10
      )}`;
      document.querySelector(".js-order-total").innerHTML = `$${formatCurrency(
        renderPaymentSummary().productPriceCents +
          renderPaymentSummary().productPriceCents / 10
      )}`;
    }
  }
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert("Quantity must be at least 0 and less than 1000");
        return;
      }
      updateQuantity(productId, newQuantity);
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      renderOrderSummary();
    });
  });
}
