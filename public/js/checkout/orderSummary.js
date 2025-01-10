import { cart } from "/js/cart-class.js";
import { getProduct } from "/js/products.js";
import { formatCurrency } from "/js/money.js";
import { deliveryOptions, calculateDeliveryDate } from "/js/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummery.js";

export function renderOrderSummary() {
  let cartSummaryHtml = "";
  cart.cartItems.forEach((cartItem) => {
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
      cart.removeFromCart(productId);
      renderOrderSummary();
    });
  });
  updateCartQuantity();
  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
    const updateText = (selector, text) => {
      document.querySelector(selector).innerHTML = text;
    };
    const updateTotals = (totals) => {
      updateText(".js-cart-summary-total", totals.total);
      updateText(".js-total-before-tax", totals.totalBeforeTax);
      updateText(".js-extimated-tax", totals.estimatedTax);
      updateText(".js-order-total", totals.orderTotal);
    };
    if (cartQuantity === 0) {
      updateText(".js-return-to-home-link", "Add Items");
      updateText(".page-title", "Your Amazon Cart is empty.");
      updateText(".js-cart-quantity", "");
      updateText(".js-cart-summary-quantity", "Items (0) :");
      updateTotals({
        total: "$0.00",
        totalBeforeTax: "$0.00",
        estimatedTax: "$0.00",
        orderTotal: "$0.00",
      });
    } else {
      const productPriceCents = renderPaymentSummary().productPriceCents;
      const formattedPrice = (price) => `$${formatCurrency(price)}`;
      updateText(".js-return-to-home-link", `${cartQuantity} Items`);
      updateText(".page-title", "Review your order");
      updateText(".js-cart-quantity", cartQuantity);
      updateText(".js-cart-summary-quantity", `Items (${cartQuantity}) :`);
      updateTotals({
        total: formattedPrice(productPriceCents),
        totalBeforeTax: formattedPrice(productPriceCents),
        estimatedTax: formattedPrice(productPriceCents / 10),
        orderTotal: formattedPrice(productPriceCents + productPriceCents / 10),
      });
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
      cart.updateQuantity(productId, newQuantity);
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      renderOrderSummary();
    });
  });
}
