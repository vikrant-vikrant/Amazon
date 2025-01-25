import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "./products.js";
import { renderCartSummary } from "./returnOrder.js";
initializeCheckout();
async function initializeCheckout() {
  try {
    await loadProductsFetch();
    renderOrderSummary();
  } catch (error) {
    alert(error);
  }
}
document.querySelector(".js-place-order").addEventListener("click", () => {
  renderCartSummary();
});